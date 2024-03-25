export enum enumType {
    BLANK = '',
    IMPORTANT = 'important',
    PLANNED = 'planned',
    TASKS = 'tasks',
    SUCCESS = 'success',
    DELETE = 'delete',
}

export type ToDoType =
    | enumType.BLANK
    | enumType.IMPORTANT
    | enumType.PLANNED
    | enumType.TASKS
    | enumType.SUCCESS
    | enumType.DELETE;

export type typeFilter = '' | 'important' | 'planned' | 'tasks' | 'success' | 'delete';
export type typeRepeat = '' | 'daily' | 'weekly' | 'monthly';

export interface iTodoItem {
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    group: typeFilter;
    repeat: string;
    deadline: number;
    created_at: number;
    updated_at?: null | number;
    deleted_at?: null | number;
}
export interface iTodoList {
    list: iTodoItem[];
}

/* export type { iTodoItem, iTodoList }; */
