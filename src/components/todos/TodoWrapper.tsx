import TodoForm from './TodoForm';
import TodoView from './TodoView';
import type { iTodoItem, typeFilter } from '../../types/types';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_TODO_LIST = 'STORAGE_TODO_LIST';

interface iProps {
    filter: typeFilter;
}
function TodoListWrapper({ filter }: iProps) {
    const [listTodo, setListToDo] = useState<iTodoItem[]>([]);

    useEffect(() => {
        const storage: string | null = localStorage.getItem(STORAGE_TODO_LIST);
        if (storage) {
            setListToDo(JSON.parse(storage));
        }
    }, []);

    const handlerLocalStorage = (_list: iTodoItem[]) => {
        localStorage.setItem(STORAGE_TODO_LIST, JSON.stringify(_list));
    };

    const handlerAddToList = useCallback((item: iTodoItem): void => {
        setListToDo((prev): iTodoItem[] => {
            const _list: iTodoItem[] = [item, ...prev];
            handlerLocalStorage(_list);
            return _list;
        });
    }, []);

    const handlerRemoveTodo = useCallback((id: string): void => {
        if (confirm('Bạn chắc là muốn xoá')) {
            setListToDo((prev): iTodoItem[] => {
                const _list: iTodoItem[] = prev.filter((i) => i.id !== id);
                handlerLocalStorage(_list);
                return _list;
            });
        }
    }, []);

    const handlerMarkAsImportant = useCallback((recordId: string, group: typeFilter): void => {
        if (!recordId) return;

        const _group = group === 'important' ? '' : 'important';

        setListToDo((prev) => {
            const _list: iTodoItem[] = prev.map((record) => {
                return record.id === recordId ? { ...record, ...{ group: _group } } : record;
            });
            handlerLocalStorage(_list);
            return _list;
        });
    }, []);

    return (
        <div className="container py-3">
            <TodoForm filter={filter} onAddToList={handlerAddToList} />
            <TodoView
                list={!filter ? listTodo : listTodo.filter((i) => i.group === filter)}
                filter={filter}
                handlerRemoveTodo={handlerRemoveTodo}
                handlerMarkAsImportant={handlerMarkAsImportant}
            />
        </div>
    );
}

export default TodoListWrapper;
