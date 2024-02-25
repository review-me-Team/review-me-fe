import { useEffect, useState } from 'react';

interface Props {
  onIntersect: (entry?: IntersectionObserverEntry) => void;
  options: IntersectionObserverInit;
}

const useIntersectionObserver = ({ onIntersect, options }: Props) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!target) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect();
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(target);

    return () => observer.disconnect();
  }, [target, onIntersect, options]);

  return { setTarget };
};

export default useIntersectionObserver;
