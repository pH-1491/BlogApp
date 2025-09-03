import { useNavigate } from "react-router-dom";
import {type ReactNode, useEffect, useState} from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
    children: ReactNode;
    authentication?: boolean;
}

const Protected = ({ children, authentication = true }: ProtectedProps) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authstatus = useSelector((state: any) => state.auth.status);

    useEffect(() => {
        if (authentication && !authstatus) {
            navigate('/login');
        } else if (!authentication && authstatus) {
            navigate('/');
        }
        setLoader(false);
    }, [authstatus, navigate, authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;