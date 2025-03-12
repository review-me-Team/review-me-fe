import React, { useEffect } from 'react';
import GuideBook from '@components/Modal/GuideBook';
import useModals from './useModals';

const useGuideBook = () => {
  const SKIP_GUIDE_BOOK_KEY = 'skipGuideBook';
  const { open } = useModals();

  const openGuideBook = () => {
    open(
      ({ isOpen, onClose }) => (
        <GuideBook
          isOpen={isOpen}
          onClose={() => {
            localStorage.setItem(SKIP_GUIDE_BOOK_KEY, 'true');
            onClose();
          }}
        />
      ),
      {
        modalId: 'guideBook',
      },
    );
  };

  useEffect(() => {
    if (!localStorage.getItem(SKIP_GUIDE_BOOK_KEY)) {
      openGuideBook();
    }
  }, []);

  return {
    openGuideBook,
  };
};

export default useGuideBook;
