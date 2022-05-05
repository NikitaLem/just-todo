import { FC, memo } from 'react';
import s from './Container.module.scss';

export enum RADIUS {
  NONE = 'radius-none',
  SMALL = 'radius-small',
  MEDIUM = 'radius-medium',
  LARGE = 'radius-large'
}

export enum BACKGROUND {
  primary = 'background-primary',
  secondary = 'background-secondary'
}

interface IProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  radius?: RADIUS;
  background?: BACKGROUND;
}

export const Container: FC<IProps> = ({
  children,
  className,
  width,
  minWidth,
  maxWidth,
  radius = RADIUS.NONE,
  background = BACKGROUND.primary
}) => (
  <div
    className={`${s.Container} ${s[radius]} ${s[background]} ${className}`}
    style={{ width: width, minWidth: minWidth, maxWidth: maxWidth }}>
    {children}
  </div>
);

export default memo(Container);
