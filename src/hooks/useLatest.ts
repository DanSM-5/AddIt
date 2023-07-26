import { useRef } from 'react';

export const useLatest = <T>(latest: T) => {
  const latestRef = useRef(latest);
  latestRef.current = latest;

  return latestRef;
};
