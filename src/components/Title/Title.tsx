import { memo, useMemo } from 'react';

import s from './Title.module.scss';

type TLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface IProps {
  level: TLevel;
  children: string;
  className?: string;
}

export const Title: React.FC<IProps> = ({ level, children, className }) => {
  const HeadingTag = useMemo(() => `${level}`, [level]) as keyof JSX.IntrinsicElements;

  return <HeadingTag className={`${s.Title} ${s[level]} ${className}`}>{children}</HeadingTag>;
};

export default memo(Title);
