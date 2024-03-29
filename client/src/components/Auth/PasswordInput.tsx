import {Box, PasswordInput, Popover, Progress, rem, Text} from "@mantine/core";
import {KeyRound} from "lucide-react";
import {Control, Controller, FieldErrors} from "react-hook-form";
import {IconCheck, IconX} from "@tabler/icons-react";
import {Dispatch} from "react";
import styles from '../../assets/auth/auth.form.module.css'


interface PasswordInputProps {
    popoverOpened:boolean,
    setPopoverOpened:Dispatch<boolean>
    control:Control<{name: string, email: string, password: string}, {name: string, email: string, password: string}>,
    password:string
    errors:FieldErrors
}
const PasswordField = ({ popoverOpened, setPopoverOpened, errors, password, control }:PasswordInputProps) => {
    const PasswordRequirement =({ meets, label }: { meets: boolean; label: string }) => {
        return (
            <Text
                c={meets ? 'teal' : 'red'}
                style={{ display: 'flex', alignItems: 'center' }}
                mt={7}
                size="sm">{meets ? (<IconCheck style={{ width: rem(14), height: rem(14) }} />) : (
                <IconX style={{ width: rem(14), height: rem(14) }} />
            )}{' '}
                <Box ml={10}>{label}</Box>
            </Text>
        );
    }

    const requirements = [
        { re: /[0-9]/, label: 'Includes number' },
        { re: /[a-z]/, label: 'Includes lowercase letter' },
        { re: /[A-Z]/, label: 'Includes uppercase letter' },
        { re: /[\$&+,:;=?@#|'<>\.\^\*()%!-]/, label: 'Includes special symbol' }
    ];

    const getStrength = (password: string) => {
        let multiplier = password.length > 5 ? 0 : 1;

        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });

        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
    }

    const strength = getStrength(password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    return (
        <Controller
            name="password"
            control={control}
            rules={{
                required: true,
                pattern: /^(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,120}$/,
                minLength: 8,
                maxLength: 120,
            }}
            render={({ field }) => (
        <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
            <Popover.Target>
                <div
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                >
                    <PasswordInput
                        c='white'
                        leftSection={<KeyRound />}
                        classNames={{
                            innerInput:styles.formInput,
                            input:styles.formInput
                        }}
                        error={errors.password !== undefined}
                        label="Password"
                        placeholder="Your password"
                        mt="md"
                        size="md"
                        {...field}
                    />
                </div>
            </Popover.Target>
            <Popover.Dropdown style={{backgroundColor:'#161616' , border:'none'}}>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement label="Includes at least 8 characters" meets={password.length > 5} />
                {
                    requirements.map((requirement, index) => (
                        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
                    ))
                }
            </Popover.Dropdown>
        </Popover>
            )}
        />
    );
};

export default PasswordField;
