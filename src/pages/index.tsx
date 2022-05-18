import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback } from 'react';
import { Todo } from '@prisma/client';

import { prisma } from '../db/client';
import { TodoModel } from '../db/Models/TodoModel';
import { trpc } from '../utils/trpc';

import TodoForm, { ITodoFormData } from '../components/Todo/TodoForm/TodoForm';
import TodoItem from '../components/Todo/TodoItem/TodoItem';

import s from '../styles/Home.module.scss';

const todoModel = new TodoModel();

interface IServerProps {
  todo: Todo[];
}

export const getServerSideProps = async () => {
  const todo = await prisma.todo.findMany();

  return {
    props: {
      todo
    }
  };
};

const Home: NextPage<IServerProps> = ({ todo }) => {
  // useEffect(() => {
  //   const todos = todoModel.getAll();
  //   setTodos(todos);
  // }, []);

  // const { data, isLoading } = trpc.useQuery(['hello', { text: '1' }]);

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
        {todo &&
          todo.map((t, i) => (
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
      <TodoForm className="mt-4" onSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
