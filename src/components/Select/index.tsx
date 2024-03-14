import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { SelectLayout } from './style';

interface Props extends ComponentPropsWithoutRef<'select'> {
  width?: string;
}

const Select = forwardRef<HTMLSelectElement, Props>(({ width = '100%', children, ...props }, ref) => {
  return (
    <SelectLayout ref={ref} $width={width} {...props}>
      {children}
    </SelectLayout>
  );
});

Select.displayName = 'Select';

export default Select;
