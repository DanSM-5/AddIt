import { useEffect, useState } from 'react';

const useStored = <T>(getStored: () => Promise<T>, defaultValue: T) => {
    const [ storedConfig, setStoredConfig ] = useState<T>();
    const [ loading, setLoading ] = useState(true);


    useEffect(() => {
        const loadPrevConfig = async () => {
            let stored: T = await getStored();
            if (!stored) {
                stored = defaultValue;
            }
            setStoredConfig(stored);
            setLoading(false);
        };

        loadPrevConfig();
    }, []);

    return [storedConfig, loading]
}

export default useStored;
