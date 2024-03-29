import {ReactNode} from "react";
import {Anchor, Container,Stack, Text, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import authLayout from "../../assets/auth/auth.layout.module.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const AuthLayout = ({children , title , variant}:{children:ReactNode , title:string , variant:string}) => {

    const navigate = useNavigate()

    return (
        <div className={authLayout.shell}>
            <Container className={authLayout.formWrapper}>
                <div>
                <Title c='white' order={1} className={authLayout.title} ta="center" mt="md" mb={50}>
                    {title}
                </Title>
                {children}
                {variant === 'login' ?
                    <Text ta="center" mt="md" c='white'>
                        Don&apos;t have an account?{' '}
                        <Anchor<'a'> fw={700} onClick={() => navigate('/auth/sign-up')}>
                            Register
                        </Anchor>
                    </Text>
                    :
                    <Text ta="center" mt="md" c='white'>
                        Don&apos;t have an account?{' '}
                        <Anchor<'a'> fw={700} onClick={() => navigate('/auth/sign-in')}>
                            Login
                        </Anchor>
                    </Text>
                }
                <Text ta="center" mt="md" c='white'>
                    <Anchor<'a'> onClick={() => navigate('/auth/forgot-password')}>
                        Forgot Password?
                    </Anchor>
                </Text>

                </div>
            </Container>
            <div className={authLayout.graphicContainer}>
                <div className={authLayout.graphic}>
                    <Stack>
                        <Text ta='center' c='white' className={authLayout.graphicText}>Note it</Text>
                        <Title ta='center' c='white' className={authLayout.graphicTitle}>A simple but effective note
                            sharing app</Title>
                    </Stack>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AuthLayout;

