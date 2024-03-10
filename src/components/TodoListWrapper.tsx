import TodoListForm from './TodoListForm';
import TodoListView from './TodoListView';
import type { iTodoItem } from '../types/types';
import { useState, useCallback, useEffect } from 'react';

const STORAGE_TODO_LIST = 'STORAGE_TODO_LIST';

function TodoListWrapper() {
    const [listTodo, setListToDo] = useState<iTodoItem[]>([]);

    useEffect(() => {
        const storage: string | null = localStorage.getItem(STORAGE_TODO_LIST);
        if (storage) {
            setListToDo(JSON.parse(storage));
        }
    }, []);

    const handlerAddToList = useCallback((item: iTodoItem): void => {
        setListToDo((prev): iTodoItem[] => {
            const _list: iTodoItem[] = [item, ...prev];
            localStorage.setItem(STORAGE_TODO_LIST, JSON.stringify(_list));
            return _list;
        });
    }, []);

    return (
        <div className="container py-3">
            <TodoListForm onAddToList={handlerAddToList} />
            <hr />
            <TodoListView list={listTodo} />
        </div>
    );
}

export default TodoListWrapper;
