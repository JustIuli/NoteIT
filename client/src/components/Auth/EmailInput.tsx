import {Control, Controller, FieldErrors} from "react-hook-form";
import {TextInput} from "@mantine/core";
import {Mail} from "lucide-react";
import {ErrorMessage} from "@hookform/error-message";
import styles from '../../assets/auth/auth.form.module.css'
interface EmailInputProps {
    control:Control<{name: string, email: string, password: string}, {name: string, email: string, password: string}>,
    errors:FieldErrors
}
const EmailInput = ({control , errors }:EmailInputProps) => {
    return (
        <>
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
                render={({ field }) => (
                    <TextInput c='white' classNames={{
                        input:styles.formInput
                    }} leftSection={<Mail/>} label="Email address" placeholder="hello@gmail.com"
                               size="md" {...field}/> )}
            />

            <div className={styles.errorText}>
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({message}) => {
                        return <span>{message}</span>
                    }}
                />
            </div>
        </>
    );
};

export default EmailInput;
