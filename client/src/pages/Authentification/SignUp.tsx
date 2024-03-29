import {
    Button,
} from '@mantine/core';
import Cookies from "js-cookie";
import AuthLayout from "../../components/Layouts/AuthLayout.tsx";
import {useState} from 'react';
import {FieldValues, useForm} from 'react-hook-form';
import {toast, ToastOptions} from "react-toastify";
import PasswordField from "../../components/Auth/PasswordInput.tsx";
import EmailInput from "../../components/Auth/EmailInput.tsx";
import NameInput from "../../components/Auth/NameInput.tsx";
import axios from "axios";
import {REGISTER_ENDPOINT} from "../../../Endpoints.ts";
export default function SignUp() {
    const { control, watch , handleSubmit,formState: { errors } } = useForm({
        defaultValues: {
            name:"",
            email:"",
            password: "",
        },
    })

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

    const [processing, setProcessing] = useState<boolean>(false);
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false);
    const onSubmit = async (formData:FieldValues) => {
        setProcessing(true)
        try{
            const { data } = await axios.post(REGISTER_ENDPOINT, {
                email: formData.email,
                password: formData.password,
                name:formData.name
            })
            Cookies.set('token', data.access_token);
            window.location.href = '/app/notes'
        }
        catch (e){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            setProcessing(false) // @ts-expect-error
            toast.error(e.response.data.message , toastOptions)
        }
    };
    const password = watch("password")

    return (
        <AuthLayout title={'Join the NoteIt Community'} variant={'signup'}>
            <form style={{overflow:'hidden'}} autoComplete="one-time-code" onSubmit={handleSubmit(onSubmit)}>
                        <EmailInput control={control} errors={errors}/>
                        <NameInput control={control} errors={errors} />
                        <PasswordField popoverOpened={popoverOpened}
                                             setPopoverOpened={setPopoverOpened}
                                             errors={errors}
                                             password={password} control={control} />

                <Button loading={processing} type='submit' fullWidth mt="md" size="md" variant='gradient' gradient={{from: '#0284C7', to: '#1E3A8A'}}>
                    Register
                </Button>
            </form>
        </AuthLayout>
);
}
