import { useEffect, useState } from 'react';

const useStored = (getStored, defaultValue) => {
    const [ storedConfig, setStoredConfig ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const loadPrevConfig = async() => {
        let stored = await getStored();
        if (!stored) {
             stored = defaultValue;
        }
        setStoredConfig(stored);
        setLoading(false);
    }

    useEffect(() => {loadPrevConfig();}, []);
    return [storedConfig, loading]
}

export default useStored;
