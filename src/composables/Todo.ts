import { iTodoItem } from '../types/types.tsx';
export const initialRecordState: iTodoItem = {
    id: '',
    title: '',
    description: '',
    isDone: false,
    group: '',
    repeat: '',
    deadline: +new Date(),
    created_at: +new Date(),
};
