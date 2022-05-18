import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback } from 'react';

import { TodoModel } from '../db/Models/TodoModel';
import { trpc } from '../utils/trpc';

import TodoForm, { ITodoFormData } from '../components/Todo/TodoForm/TodoForm';
import TodoItem from '../components/Todo/TodoItem/TodoItem';

import s from '../styles/Home.module.scss';

const todoModel = new TodoModel();

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['getAllTodo']);

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

      {!isLoading && (
        <div className={s.TodoList}>
          {data &&
            data.map((t, i) => (
              <TodoItem
                key={t.id}
                className={`${i !== 0 && 'mt-6'} pa-2`}
                title={t.title}
                endDate={t.endDate}
                description={t.description}
                isDone={t.isDone}
              />
            ))}
        </div>
      )}
      <TodoForm className="mt-4" onSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
