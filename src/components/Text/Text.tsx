import { memo, useMemo } from 'react';
import cx from 'classnames';

import s from './Text.module.scss';

type TTag = 'p' | 'span';
type TType = 'body-1' | 'body-2' | 'subtitle-1' | 'subtitle-2' | 'caption';

interface IProps {
  tag: TTag;
  type: TType;
  children: string | string[];
  className?: string;
}

export const Text: React.FC<IProps> = ({ tag, type, children, className }) => {
  const TextTag = useMemo(() => `${tag}`, [tag]) as keyof JSX.IntrinsicElements;

  return <TextTag className={cx(`${s.Text} ${s[type]} ${s[tag]} ${className}`)}>{children}</TextTag>;
};

export default memo(Text);
