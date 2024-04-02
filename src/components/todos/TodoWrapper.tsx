import TodoForm from './TodoForm';
import TodoView from './TodoView';
import ToDoUpdate from './ToDoUpdate';
import ReactModal from '../bases/ReactModal';
import ReactToast from '../bases/ReactToast';

import type { iTodoItem, typeFilter } from '../../types/types';
import { initialRecordState } from '../../composables/Todo.ts';

import { useState, useCallback, useEffect, useRef } from 'react';

import { recordTodo } from '../../models/todoModel.ts';
import {
    todoAddNew,
    todoDelete,
    todoUpdateRecordById,
    todoMoveToTrash,
    todoMaskAsImportant,
    todoRepeat,
} from '../../controllers/toDoController.ts';

const STORAGE_TODO_LIST = 'STORAGE_TODO_LIST';

interface iProps {
    filter: typeFilter;
}
function TodoListWrapper({ filter }: iProps) {
    const [listTodo, setListToDo] = useState<iTodoItem[]>([]);
    const [recordUpdate, setRecordUpdate] = useState<iTodoItem>(initialRecordState);

    const refReactToast = useRef();

    useEffect(() => {
        const storage: string | null = localStorage.getItem(STORAGE_TODO_LIST);
        if (storage) {
            setListToDo(JSON.parse(storage));
        }
    }, []);

    const handlerLocalStorage = (_list: iTodoItem[]) => {
        localStorage.setItem(STORAGE_TODO_LIST, JSON.stringify(_list));
    };

    /**
     * Thêm mới record
     */
    const handlerAddToList = useCallback((record: iTodoItem): void => {
        setListToDo((prev): iTodoItem[] => todoAddNew(record, [...prev]));
    }, []);

    /**
     * Cho vào thùng rác
     */
    const handlerRemoveTodo = useCallback((id: string): void => {
        if (confirm('Bạn chắc là muốn xoá')) {
            setListToDo((prev): iTodoItem[] => todoMoveToTrash(id, [...prev]));
        }
    }, []);

    const handlerMarkAsImportant = useCallback((recordId: string, group: typeFilter): void => {
        if (!recordId) return;
        const _group = group === 'important' ? '' : 'important';
        setListToDo((prev) => todoMaskAsImportant(recordId, _group, [...prev]));
    }, []);
    const handlerMarkAsDone = useCallback(
        (recordId: string): void => {
            if (!recordId) return;

            let flagRepeat: iTodoItem = { ...recordTodo };

            setListToDo((prev) => {
                const _list: iTodoItem[] = prev.map((record) => {
                    if (record.id === recordId) {
                        record.repeat && (flagRepeat = { ...record });
                        return { ...record, ...{ isDone: !record.isDone } };
                    }
                    return record;
                });

                handlerLocalStorage(_list);
                return _list;
            });

            /** repeat todo record */
            if (flagRepeat.id) {
                setTimeout(() => {
                    const newRecord: iTodoItem = todoRepeat({ ...flagRepeat });
                    setListToDo((prev) => todoAddNew({ ...newRecord }, [...prev]));
                    refReactToast.current.show();
                }, 1000);
            }
        },
        [listTodo],
    );

    const handlerUpdateTodoRecord = useCallback((record: iTodoItem): void => {
        setRecordUpdate(record);
    }, []);

    /**
     * Cập nhật record [edit]
     */
    const handlerUpdateToDoById = useCallback((record: iTodoItem): void => {
        if (!record.id) return;
        setListToDo((prev) => todoUpdateRecordById(record, [...prev]));
    }, []);

    /**
     * Xoá vĩnh viễn
     */
    const handlerDelete = useCallback((id: string) => {
        setListToDo((prev) => todoDelete(id, [...prev]));
    }, []);

    const [listFilter, setListFilter] = useState<iTodoItem[]>([]);
    useEffect(() => {
        setListFilter(() => {
            if (filter === 'success') {
                return listTodo.filter((i) => (i.isDone === true && !i.deleted_at) || i.deleted_at === null);
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
                handlerDelete={handlerDelete}
            />
            {true && (
                <ReactModal id="refModalUpdate">
                    <ToDoUpdate record={recordUpdate} handlerUpdateToDoById={handlerUpdateToDoById} />
                </ReactModal>
            )}
            <ReactToast ref={refReactToast} text={'Task (Daily) đã được tự động tạo lại thành công'} />
        </div>
    );
}

export default TodoListWrapper;
