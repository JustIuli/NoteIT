import {Control, Controller, FieldErrors} from "react-hook-form";
import {TextInput} from "@mantine/core";
import {User} from "lucide-react";
import {ErrorMessage} from "@hookform/error-message";
import styles from '../../assets/auth/auth.form.module.css'
interface EmailInputProps {
    control:Control<{name: string, email: string, password: string}, {name: string, email: string, password: string}>,
    errors:FieldErrors
}
const NameInput = ({control , errors }:EmailInputProps) => {
    return (
        <>
            <Controller
                name="name"
                control={control}

                rules={{
                    required: {value: true, message: 'This field is required!'},
                    minLength: {
                        value: 3,
                        message: 'Name length must be bigger than 3 characters'
                    },
                    pattern: {
                        value: /^[A-Za-z\s]*[A-Za-z]$/,
                        message: "Name should only contain letters"
                    }
                }}
                render={({ field }) => (
                    <TextInput c='white' classNames={{
                        input:styles.formInput
                    }} leftSection={<User/>} label="Name" placeholder="John Doe"
                               size="md" {...field}/> )}
            />

            <div className={styles.errorText}>
                <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({message}) => {
                        return <span>{message}</span>
                    }}
                />
            </div>
        </>
    );
};

export default NameInput;
