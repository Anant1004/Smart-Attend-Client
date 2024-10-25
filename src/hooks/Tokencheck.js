import { useCallback } from 'react';

const useAuth = () => {
    const checkAuthToken = useCallback(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        return token ? true : false;
    }, []);

    return { checkAuthToken };
};

export default useAuth;
