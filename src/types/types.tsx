interface iTodoItem {
    id: string;
    title: string;
    description: string;
    isDone: boolean;
}
interface iTodoList {
    list: iTodoItem[];
}

export type { iTodoItem, iTodoList };
