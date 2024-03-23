export enum enumType {
    BLANK = '',
    IMPORTANT = 'important',
    PLANNED = 'planned',
    TASKS = 'tasks',
}

export type ToDoType = enumType.BLANK | enumType.IMPORTANT | enumType.PLANNED | enumType.TASKS;

export type typeFilter = '' | 'important' | 'planned' | 'tasks';

export interface iTodoItem {
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    created_at: number;
    updated_at: null | number;
    group: typeFilter;
}
export interface iTodoList {
    list: iTodoItem[];
}

/* export type { iTodoItem, iTodoList }; */
