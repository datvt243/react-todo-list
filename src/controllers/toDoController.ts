import type { iTodoItem } from '../types/types.tsx';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_TODO_LIST = 'STORAGE_TODO_LIST';

const handlerLocalStorage = (todoList: iTodoItem[]) => {
    localStorage.setItem(STORAGE_TODO_LIST, JSON.stringify(todoList));
};

const todoAddNew = function (record: iTodoItem, todoList: iTodoItem[]): iTodoItem[] {
    const _list: iTodoItem[] = [record, ...todoList];
    handlerLocalStorage(_list);
    return _list;
};

const todoDelete = function (id: string, todoList: iTodoItem[]): iTodoItem[] {
    if (!id) return todoList;
    const _list = todoList.filter((r) => r.id !== id);
    handlerLocalStorage(_list);
    return _list;
};

const todoUpdateRecordById = function (record: iTodoItem, todoList: iTodoItem[]): iTodoItem[] {
    const _list = todoList.map((r) => {
        if (r.id === record.id) {
            record.repeat && (record.group = 'planned');
            return record;
        }
        return r;
    });
    handlerLocalStorage(_list);
    return _list;
};

const todoMoveToTrash = function (id: string, todoList: iTodoItem[]): iTodoItem[] {
    const _list: iTodoItem[] = todoList.map((i) => {
        if (i.id === id) {
            i.deleted_at = +new Date();
        }
        return i;
    });
    handlerLocalStorage(_list);
    return _list;
};

const todoMaskAsImportant = function (recordId: string, _group: string, todoList: iTodoItem[]): iTodoItem[] {
    const _list: iTodoItem[] = todoList.map((record) => {
        return record.id === recordId ? { ...record, ...{ group: _group } } : record;
    });
    handlerLocalStorage(_list);
    return _list;
};

const todoRepeat = function (record: iTodoItem): iTodoItem {
    const newId = uuidv4();
    const temp: iTodoItem = JSON.parse(JSON.stringify(record));
    const date = new Date(temp.created_at);
    console.group();

    date.setDate(date.getDate() + 1);

    /* date.setHours(23, 59, 59, 999); */

    temp.id = newId;
    temp.deadline = +new Date(date);
    temp.created_at = +new Date();

    console.groupEnd();
    return { ...temp };
};

export { todoAddNew, todoDelete, todoUpdateRecordById, todoMoveToTrash, todoMaskAsImportant, todoRepeat };
