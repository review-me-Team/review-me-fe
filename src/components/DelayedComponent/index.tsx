import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const DelayedComponent = ({ children }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!show) {
    return null;
  }

  return <>{children}</>;
};

export default DelayedComponent;
