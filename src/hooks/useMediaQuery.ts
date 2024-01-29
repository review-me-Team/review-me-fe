import { useEffect, useState } from 'react';

interface Props {
  mediaQueryString: string;
}

const useMediaQuery = ({ mediaQueryString }: Props) => {
  const [matches, setMatches] = useState<boolean>(window.matchMedia(mediaQueryString).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(mediaQueryString);
    const handleMediaQuery = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQuery);
    };
  }, [mediaQueryString]);

  return { matches };
};

export default useMediaQuery;
