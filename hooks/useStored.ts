import { useEffect, useState } from 'react';

const useStored = <T>(
  getStored: () => Promise<T | null | undefined>,
  defaultValue: T,
) => {
  const [storedConfig, setStoredConfig] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrevConfig = async () => {
      let stored: T | undefined | null = await getStored();
      if (!stored) {
        stored = defaultValue;
      }
      setStoredConfig(stored);
      setLoading(false);
    };

    loadPrevConfig();
  }, [defaultValue, getStored]);

  return [storedConfig, loading] as const;
};

export default useStored;
