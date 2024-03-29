import {
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Anchor, Stack,
} from '@mantine/core';
import forgotPassword from '../../assets/auth/auth.layout.module.css';
import { useState} from "react";
import styles from "../../assets/auth/auth.form.module.css";
import {Controller, FieldValues, useForm} from "react-hook-form";
import {toast, ToastContainer, ToastOptions} from 'react-toastify';
import {CHANGEPASSWORD_ENDPOINT, FORGOTPASSWORD_ENDPOINT} from "../../../Endpoints.ts";
import PasswordField from "../../components/Auth/PasswordInput.tsx";
import axios from "axios";
import {Mail} from "lucide-react";
import {ErrorMessage} from "@hookform/error-message";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
export default function ForgotPassword() {

    const [formStep , setFormStep] = useState<number>(0)
    const [secretCode , setSecretCode] = useState<string>('')
    const [providedEmail , setProvidedEmail] = useState<string>('')

    const toastOptions:ToastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };
    const onSubmitEmail = async (formData: FieldValues) => {
        setValueReceivedCode('receivedCode' , '')
        try{
            const { data } = await axios.patch(`${FORGOTPASSWORD_ENDPOINT}?recipient_Email=${formData.email}`)
            if(data.success){
                setSecretCode(data.code)
                toast.success('Code sent!', toastOptions);
                setFormStep((prev) => prev+1)
                setProvidedEmail(formData.email)
            }else if(data.message === "User not found"){
                toast.error('No user found matching that email', toastOptions);
            }
        }catch(e){
            toast.error('Unknown Error happened!', toastOptions);
        }
    };
    const onSubmitReceivedCode = async (formData: FieldValues) => {
        if(formData.receivedCode === secretCode)
            setFormStep((prev) => prev+1)
        else toast.error('Code is invalid!' , toastOptions)
    };
    const onSubmitChangePassword = async (formData: FieldValues) => {
        try{
            await axios.patch(`${CHANGEPASSWORD_ENDPOINT}`,{
                newPassword: formData.password,
                userEmail: providedEmail,
                secretCode: secretCode,
            })
            toast.success('Password changed successfully', toastOptions);
            window.location.href = '/auth/sign-in'
        }catch(e){
            toast.error('Some unexpected error happened' , toastOptions)
        }
    };

    const {
        control:controlEmail,
        handleSubmit:handleSubmitEmail,
        formState: formStateEmail,
    } = useForm({
        defaultValues: {
            email:""
        }});

    const {
        control:controlReceivedCode,
        handleSubmit:handleSubmitReceivedCode,
        formState: formStateReceivedCode,
        setValue: setValueReceivedCode
    } = useForm({
        defaultValues: {
            receivedCode:""
        }});

    const {
        control:controlChangePassword,
        handleSubmit:handleSubmitChangePassword,
        formState:formStateChangePassword,
        watch
    } = useForm({
        defaultValues: {
            password:""
        }});

    const password = watch("password")
    const navigate = useNavigate()
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false);
    return (
        <div className={forgotPassword.shell}>
            <Container className={forgotPassword.formWrapper}>
                    <div>
                        <Title c='white' order={1} className={styles.title} ta="center" mt="md" mb={50}>
                            Forgot your password?
                        </Title>

                        {
                            formStep === 0 && (
                                <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                                    <Controller
                                        name="email"
                                        control={controlEmail}
                                        rules={{
                                            required: {value: true, message: 'This field is required!'},
                                            minLength: {
                                                value: 5,
                                                message: 'Email length must be bigger than 5 characters'
                                            },
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        }}
                                        render={({field}) => (
                                            <TextInput {...field} c='white' required
                                                       size='lg' classNames={{
                                                input: styles.formInput
                                            }} leftSection={<Mail/>} label="Email address" placeholder="hello@gmail.com"/>)}
                                    />

                                    <div className={styles.errorText}>
                                        <ErrorMessage
                                            errors={formStateEmail.errors}
                                            name="email"
                                            render={({message}) => {
                                                return <span>{message}</span>
                                            }}
                                        />
                                    </div>

                                    <Stack justify="space-between" mt="xl">
                                        <Button type="submit" radius="sm">
                                            Send Recovery Email
                                        </Button>
                                        <Text ta="center" mt="md" c='white'>
                                            Already got an account?{' '}
                                            <Anchor<'a'> fw={700} onClick={() => navigate('/auth/sign-in')}>
                                                Login
                                            </Anchor>
                                        </Text>
                                    </Stack>
                                </form>
                            )
                        }
                        {
                        formStep === 1 && (
                                <form autoComplete="off" onSubmit={handleSubmitReceivedCode(onSubmitReceivedCode)}>

                                    <Controller
                                        name="receivedCode"
                                        control={controlReceivedCode}
                                        rules={{
                                            required: {value: true, message: 'This field is required!'},
                                        }}
                                        render={({field}) => (
                                            <TextInput
                                                required
                                                size='lg'
                                                {...field}
                                                classNames={{
                                                    input: styles.formInput,
                                                }}
                                                label="Received code"
                                                placeholder="ex: 29DJSW9"
                                                radius="md"
                                            />)}
                                    />

                                    <div className={styles.errorText}>
                                        <ErrorMessage
                                            errors={formStateReceivedCode.errors}
                                            name="receivedCode"
                                            render={({message}) => {
                                                return <span>{message}</span>
                                            }}
                                        />
                                    </div>

                                    <Stack justify="space-between" mt="xl">
                                        <Button type="submit" radius="sm">
                                            Verify Code
                                        </Button>
                                        <Text ta="center" mt="md" c='white'>
                                            <Anchor<'a'> fw={700} onClick={() => navigate('/auth/sign-in')}>
                                                Go back
                                            </Anchor>
                                        </Text>
                                    </Stack>
                                </form>
                            )
                        }
                        {
                            formStep === 2 && (
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                <form onSubmit={handleSubmitChangePassword(onSubmitChangePassword)}> { /* @ts-expect-error */ }
                                    <PasswordField popoverOpened={popoverOpened} setPopoverOpened={setPopoverOpened} control={controlChangePassword} password={password} errors={formStateChangePassword.errors} />
                                    <Stack justify="space-between" mt="xl">
                                        <Button type="submit" radius="sm">
                                            Finish
                                        </Button>
                                        <Text ta="center" mt="md" c='white'>
                                            <Anchor<'a'> fw={700} onClick={() => navigate('/auth/sign-in')}>
                                                Go back
                                            </Anchor>
                                        </Text>
                                    </Stack>
                                </form>
                            )
                        }
                    </div>
            </Container>

            <div className={forgotPassword.graphicContainer}>
                <div className={forgotPassword.graphic}>
                    <Stack>
                        <Text ta='center' c='white' className={forgotPassword.graphicText}>Note it</Text>
                        <Title ta='center' c='white' className={forgotPassword.graphicTitle}>A simple but effective note sharing app</Title>
                    </Stack>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

/* <TextInput
                                        classNames={{
                                            input:styles.formInput
                                        }}
                                        label="Name"
                                        size='lg'
                                        placeholder="Your name"
                                        radius="sm"
                                    />

                                <TextInput
                                    required
                                    size='lg'
                                    classNames={{
                                        input:styles.formInput
                                    }}
                                    label="Email"
                                    placeholder="hello@mantine.dev"
                                    radius="md"
                                />

                                <PasswordInput
                                    required
                                    size='lg'
                                    classNames={{
                                        input:styles.formInput
                                    }}
                                    label="Password"
                                    placeholder="Your password"
                                    radius="md"
                                /> */