import {Navigate} from "react-router-dom";
import {ReactNode, useEffect, useState} from "react";
import Cookies from "js-cookie";


const Guard = ({children}:{children:ReactNode}) => {
    const [loading, setLoading] = useState(true);
    const [validToken, setValidToken] = useState(false);
    const token = Cookies.get('token')
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                if(token)
                    setValidToken(true)
            }
            catch (e){
                console.log(e)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <h1>Loading....</h1>;
    }

    if (!validToken) {
        return <Navigate to="/auth/sign-in" />;
    }

    return children
};

export default Guard;
