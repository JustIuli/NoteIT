import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from '../assets/error/error.module.css';
import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router-dom";

export default function Error() {

    const navigate = useNavigate();
    const error = useRouteError();
    return (
        <div className={classes.root}>
            <Container>
                {isRouteErrorResponse(error) && (
                <div>
                     <Text variant={'gradient'} gradient={{from: '#0EA5E9', to: '#1E40AF'}} className={classes.label}>
                       {error.status}
                     </Text>
                </div>
                )}
                <Title className={classes.title}>Something bad just happened...</Title>
                <Text size="lg" ta="center" className={classes.description}>
                    {isRouteErrorResponse(error) && (
                        <>
                            {error.status === 404 && (
                                <>We couldn't find the page you're looking for. Please navigate back to the Home Page.</>
                            )}
                            {error.status === 401 && (
                                <>You are not authorized to access this page. Please navigate back to the Home Page.</>
                            )}
                            {error.status === 503 && (
                                <>Service temporarily unavailable. Please try again later or navigate back to the Home Page.</>
                            )}
                            {error.status === 418 && (
                                <>I'm a teapot. But seriously, there was an unexpected error. Please navigate back to the Home Page.</>
                            )}
                        </>
                    )}
                                        {/* @ts-expect-error:qwdio */}
                    err : {error.message}
                </Text>
                <Group justify="center" >
                    <Button variant={'gradient'} onClick={() => navigate('/')} gradient={{from: '#0EA5E9', to: '#1E40AF'}} size="lg">
                        Go to the home page
                    </Button>
                </Group>
            </Container>
        </div>
    );
}
// 418 is the best error for real
