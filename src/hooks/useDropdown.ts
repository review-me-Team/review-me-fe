import { useState } from 'react';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isDropdownOpen: isOpen,
    openDropdown: open,
    closeDropdown: close,
  };
};

export default useDropdown;
