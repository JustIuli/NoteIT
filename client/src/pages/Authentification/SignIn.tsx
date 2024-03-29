import {
    TextInput,
    PasswordInput,
    Button,
} from '@mantine/core';
import {KeyRound, Mail} from "lucide-react";
import AuthLayout from "../../components/Layouts/AuthLayout.tsx";
import {toast, ToastOptions} from "react-toastify";
import {Controller, FieldValues, useForm} from "react-hook-form";
import {useState} from "react";
import {LOGIN_ENDPOINT} from "../../../Endpoints.ts";
import Cookies from "js-cookie";
import axios from "axios";
import signInStyles from '../../assets/auth/auth.form.module.css'
import {ErrorMessage} from "@hookform/error-message";
export default function SignIn() {
    const { control, handleSubmit,formState: { errors } } = useForm({
        defaultValues: {
            email:"",
            password: "",
        },
    })

    const [processing , setProcessing] = useState<boolean>(false)

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
    const onSubmit = async (formData:FieldValues) => {
        setProcessing(true)
        try{
            const { data } = await axios.post(LOGIN_ENDPOINT, {
                email: formData.email,
                password: formData.password
            })
            Cookies.set('token', data.access_token);
            window.location.href = '/app/notes'
        }
        catch (e){
            setProcessing(false)
            // @ts-expect-error:fix it later
            const errMsg = e.response.data.message;
            toast.error(errMsg , toastOptions)
        }
    };
    return (
        <AuthLayout title={'Welcome back to NoteIt'} variant={'login'}>
            <form style={{overflow: 'hidden'}} autoComplete="one-time-code" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
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
                        <TextInput c='white' classNames={{
                            input: signInStyles.formInput
                        }} leftSection={<Mail/>} label="Email address" placeholder="hello@gmail.com"
                                   size="md" {...field}/>)}
                />

                <div className={signInStyles.errorText}>
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({message}) => {
                            return <span>{message}</span>
                        }}
                    />
                </div>

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            value:/^(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,120}$/,
                            message:'Provided password is invalid!'
                        },
                        minLength: 8,
                        maxLength: 120,
                    }}
                    render={({field}) => (
                        <PasswordInput classNames={{
                            input: signInStyles.formInput
                        }} c='white' leftSection={<KeyRound/>} variant={'filled'} label="Password"
                                       placeholder="Your password"
                                       mt="md" size="md" {...field} />)}
                />

                <div className={signInStyles.errorText}>
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({message}) => {
                            return <span>{message}</span>
                        }}
                    />
                </div>

                <Button type='submit' loading={processing} fullWidth mt="xl" size="md" variant='gradient' gradient={{from: '#0284C7', to: '#1E3A8A'}}>
                    Login
                </Button>
            </form>
        </AuthLayout>
    );
}
