import { memo, ReactNode } from 'react';

import s from './Button.module.scss';

type IProps = {
  children: string | ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  isSubmit?: boolean;
};

const Button: React.FC<IProps> = ({ children, onClick, className, isSubmit }) => {
  return (
    <button className={`${s.Button} ${className}`} type={isSubmit ? 'submit' : 'button'} onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(Button);
