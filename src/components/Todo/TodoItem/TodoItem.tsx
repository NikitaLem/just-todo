import { FC, memo, useCallback, useMemo } from 'react';

import Container, { BACKGROUND, RADIUS } from '../../Container/Container';
import Title from '../../Title/Title';
import Text from '../../Text/Text';
import Button from '../../Button/Button';
import { formatMilicesToHMS } from '../../../helpers/time';

import s from './TodoItem.module.scss';

interface IProps {
  title: string;
  endDate: string;
  isDone: boolean;
  description?: string | null;
  className?: string;
}

const TodoItem: FC<IProps> = ({ title, endDate, description, isDone, className }) => {
  const timeLeftHMS = useMemo(() => formatMilicesToHMS(endDate), [endDate]);

  const handleDoneClick = useCallback(() => {
    console.log('Сделай isDaneHandler');
  }, []);

  return (
    <Container
      radius={RADIUS.MEDIUM}
      width="500px"
      background={isDone ? BACKGROUND.secondary : BACKGROUND.primary}
      className={className}>
      <div className={s.TodoItem}>
        <div className={s.TodoItemHeader}>
          <Title className={`${s.TodoItemTitle}`} level="h5">
            {title}
          </Title>
          {!isDone && <Button onClick={handleDoneClick}>Готово</Button>}
        </div>
        {description && (
          <div className={s.TodoItemBody}>
            <Text className={`${s.TodoItemDescription}`} tag="p" type="body-1">
              {description}
            </Text>
          </div>
        )}
        {!isDone && (
          <div className={s.TodoItemFooter}>
            <Text type="caption" tag="span">
              Осталось времени: {timeLeftHMS}
            </Text>
          </div>
        )}
      </div>
    </Container>
  );
};

export default memo(TodoItem);
