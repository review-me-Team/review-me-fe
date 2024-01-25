import { useState } from 'react';

const useHover = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const changeHoverState = (isHoverState: boolean) => {
    setIsHover(isHoverState);
  };

  return { isHover, changeHoverState };
};

export default useHover;
