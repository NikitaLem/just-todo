import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

import TodoItem from '../components/Todo/TodoItem/TodoItem';
import TodoForm, { ITodoFormData } from '../components/Todo/TodoForm/TodoForm';

import { ITodoLIst, TodoModel } from '../db/Models/TodoModel';

import s from '../styles/Home.module.scss';

const todoModel = new TodoModel();

const Home: NextPage = () => {
  const [todos, setTodos] = useState<ITodoLIst | undefined>(undefined);

  useEffect(() => {
    const todos = todoModel.getAll();
    setTodos(todos);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>, formData: ITodoFormData, callback: () => void) => {
      e.preventDefault();
      const { title, description, daysForDone } = formData;
      const endDate = String(Date.now() + daysForDone * 24 * 60 * 60 * 1000);
      todoModel.setItem({ title, description, endDate, isDone: false });
      callback();
    },
    []
  );

  return (
    <div className={s.Home}>
      <Head>
        <title>Just ToDo</title>
        <meta name="description" content="Dayli reminder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={s.TodoList}>
        {todos &&
          Object.entries(todos).map(([key, value], i) => (
            <TodoItem
              key={key}
              className={`${i !== 0 && 'mt-6'} pa-2`}
              title={value.title}
              endDate={value.endDate}
              description={value.description}
              isDone={value.isDone}
            />
          ))}
      </div>
      <TodoForm className="mt-4" onSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
