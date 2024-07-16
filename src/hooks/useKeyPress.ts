import { useEffect } from 'react';

interface Props {
  targetKey: string;
  onKeyPress: () => void;
}

const useKeyPress = ({ targetKey, onKeyPress }: Props) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        onKeyPress();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [targetKey, onKeyPress]);
};

export default useKeyPress;
