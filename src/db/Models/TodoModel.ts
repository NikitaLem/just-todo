import { setValueToStorage, getValueFromStorage } from '../../helpers/localStorage';

interface ITodo {
  title: string;
  isDone: boolean;
  endDate: string;
  description?: string;
}

export interface ITodoLIst {
  [id: number]: ITodo;
}

export class TodoModel {
  private static NAME = 'TODO_LIST';
  private static ID_NAME = 'TODO_ID';

  private getLastId(): number {
    const id = getValueFromStorage<string>(TodoModel.ID_NAME);
    return id ? Number(id) : 1;
  }

  private setNewId(): number {
    const lastId = this.getLastId();
    setValueToStorage<number>(TodoModel.ID_NAME, lastId + 1);
    return lastId;
  }

  public getAll() {
    return getValueFromStorage<ITodoLIst>(TodoModel.NAME);
  }

  public setItem(item: ITodo) {
    const id = this.setNewId();
    const currentTodoList = this.getAll() || {};
    const newTodoList = { ...currentTodoList, [id]: item };
    setValueToStorage<ITodoLIst>(TodoModel.NAME, newTodoList);
  }

  public getItem(id: number) {
    const currentTodoList = this.getAll() || {};
    const item = currentTodoList[id];
    return item ?? undefined;
  }

  public putItem(id: number, item: ITodo) {
    const currentTodoList = this.getAll() || {};
    const newTodoList = { ...currentTodoList, [id]: item };
    setValueToStorage<ITodoLIst>(TodoModel.NAME, newTodoList);
  }
}
