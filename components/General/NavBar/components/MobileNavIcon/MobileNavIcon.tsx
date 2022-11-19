import { Fragment } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export const MobileNavIcon: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <>
      <AiOutlineClose className={`origin-center transition ${open && 'scale-90 opacity-0'}`} />
      <AiOutlineMenu className={`origin-center transition ${!open && 'scale-90 opacity-0'}`} />
    </>
  );
};
