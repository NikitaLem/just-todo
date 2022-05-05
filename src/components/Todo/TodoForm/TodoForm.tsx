import { memo } from 'react';

import { useForm } from '../../../hooks/useForm';

import Button from '../../Button/Button';

import s from './TodoForm.module.scss';

interface IProps {
  className?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, formData: ITodoFormData, callback: () => void) => void;
}

export interface ITodoFormData {
  title: string;
  description: string;
  daysForDone: number;
  [key: string]: number | string;
}

const TodoForm: React.FC<IProps> = ({ className, onSubmit }) => {
  const { values, handleChange, clearForm } = useForm<ITodoFormData>({ title: '', description: '', daysForDone: 1 });

  return (
    <form className={`${s.TodoForm} ${className}`} onSubmit={(e) => onSubmit(e, values, clearForm)}>
      <input type="text" name="title" value={values.title} onChange={handleChange} />
      <input type="text" name="description" value={values.description} onChange={handleChange} />
      <input type="number" name="daysForDone" value={values.daysForDone} onChange={handleChange} />
      <Button isSubmit>Добавить</Button>
    </form>
  );
};

export default memo(TodoForm);
