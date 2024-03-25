import TodoForm from './TodoForm';
import TodoView from './TodoView';
import ToDoUpdate from './ToDoUpdate';
import Modal from '../bases/Modal';

import type { iTodoItem, typeFilter } from '../../types/types';
import { initialRecordState } from '../../composables/Todo.ts';

import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_TODO_LIST = 'STORAGE_TODO_LIST';

interface iProps {
    filter: typeFilter;
}
function TodoListWrapper({ filter }: iProps) {
    const [listTodo, setListToDo] = useState<iTodoItem[]>([]);
    const [recordUpdate, setRecordUpdate] = useState<iTodoItem>(initialRecordState);

    useEffect(() => {
        const storage: string | null = localStorage.getItem(STORAGE_TODO_LIST);
        if (storage) {
            setListToDo(JSON.parse(storage));
        }
    }, []);

    const handlerLocalStorage = (_list: iTodoItem[]) => {
        localStorage.setItem(STORAGE_TODO_LIST, JSON.stringify(_list));
    };

    /* Add to List */
    const handlerAddToList = useCallback((item: iTodoItem): void => {
        setListToDo((prev): iTodoItem[] => {
            const _list: iTodoItem[] = [item, ...prev];
            handlerLocalStorage(_list);
            return _list;
        });
    }, []);

    /* Remove from list */
    const handlerRemoveTodo = useCallback((id: string): void => {
        if (confirm('Bạn chắc là muốn xoá')) {
            setListToDo((prev): iTodoItem[] => {
                /* const _list: iTodoItem[] = prev.filter((i) => i.id !== id); */
                const _list: iTodoItem[] = prev.map((i) => {
                    if (i.id === id) {
                        i.deleted_at = +new Date();
                    }
                    return i;
                });
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
    const handlerMarkAsDone = useCallback((recordId: string): void => {
        if (!recordId) return;

        setListToDo((prev) => {
            let flagRepeat: iTodoItem = {
                id: '',
                title: '',
                description: '',
                isDone: false,
                group: '',
                repeat: '',
                deadline: +new Date(),
                created_at: +new Date(),
                updated_at: null,
                deleted_at: null,
            };
            const _list: iTodoItem[] = prev.map((record) => {
                if (record.id === recordId) {
                    record.repeat && (flagRepeat = { ...record });
                    return { ...record, ...{ isDone: !record.isDone } };
                }
                return record;
            });

            /* repeat */
            if (flagRepeat.id) {
                const date = new Date(flagRepeat.created_at);
                date.setDate(date.getDate() + 1);
                date.setHours(23, 59, 59, 999);

                flagRepeat.id = uuidv4();
                flagRepeat.deadline = +date;
                flagRepeat.created_at = +new Date();

                _list.push(flagRepeat);
            }

            handlerLocalStorage(_list);
            return _list;
        });
    }, []);

    const handlerUpdateTodoRecord = useCallback((record: iTodoItem): void => {
        setRecordUpdate(record);
    }, []);

    const handlerUpdateToDoById = useCallback((record: iTodoItem): void => {
        if (!record.id) return;
        setListToDo((prev) => {
            const _list = prev.map((r) => {
                if (r.id === record.id) {
                    record.repeat && (record.group = 'planned');
                    return record;
                }
                return r;
            });
            handlerLocalStorage(_list);
            return _list;
        });
    }, []);

    const [listFilter, setListFilter] = useState<iTodoItem[]>([]);
    useEffect(() => {
        setListFilter(() => {
            if (filter === 'success') {
                return listTodo.filter((i) => i.isDone === true);
            } else if (filter === 'delete') {
                return listTodo.filter((i) => i.deleted_at !== undefined);
            } else {
                return !filter
                    ? listTodo.filter((i) => i.deleted_at === undefined && i.isDone === false)
                    : listTodo.filter((i) => i.group === filter && i.deleted_at === undefined && i.isDone === false);
            }
        });
    }, [listTodo, filter]);

    return (
        <div className="container py-3">
            <TodoForm filter={filter} onAddToList={handlerAddToList} />
            <TodoView
                list={listFilter}
                filter={filter}
                handlerRemoveTodo={handlerRemoveTodo}
                handlerMarkAsImportant={handlerMarkAsImportant}
                handlerMarkAsDone={handlerMarkAsDone}
                handlerUpdateTodoRecord={handlerUpdateTodoRecord}
            />
            {true && (
                <Modal id="refModalUpdate">
                    <ToDoUpdate record={recordUpdate} handlerUpdateToDoById={handlerUpdateToDoById} />
                </Modal>
            )}
        </div>
    );
}

export default TodoListWrapper;
