import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url) => {
        
        // setLoading(true);
        setProcess('loading');

        
        try {
            const response = await fetch(url);

            if(!response) {
                throw new Error (`Could not fetch ${url}, starus ${response.status}`)
            }
            
            const data = await response.json();

            return data
        } catch(error) {
            setProcess('error');
            throw error;
        }
    }, [])

    const clearError = useCallback(() => setProcess('waiting'))

    return {process, setProcess, request, clearError}
}