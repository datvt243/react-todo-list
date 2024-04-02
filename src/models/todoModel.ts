import type { iTodoItem } from '../types/types.tsx';

const recordTodo: iTodoItem = {
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

export { recordTodo };
