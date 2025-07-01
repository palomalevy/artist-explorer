import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from '../contexts/UserContext';

const WithAuth = (WrappedComponent) => {
    const baseURL = import.meta.env.VITE_BASE_URL

    return function ProtectedComponent(props) {
        const { user, setUser } = useUser();
        const navigate = useNavigate();

        useEffect(() => {
            if (!user) {
                fetch(`${baseURL}/api/auth/me`, { credentials: "include" })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.id) { // check the response contains the user id
                            setUser(data);
                        } else {
                            navigate('/login');
                        }
                    })
                    .catch(() => {
                        navigate('/login');
                    });
            }
        }, [user, setUser, navigate]);

        if (!user) {
            return <p>Loading...</p>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default WithAuth;