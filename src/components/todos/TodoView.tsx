import { iTodoItem, typeFilter } from '../../types/types';
import TodoItem from './TodoItem';

import { useState, useEffect } from 'react';

interface iProps {
    list: iTodoItem[];
    filter: typeFilter;
    handlerRemoveTodo: (id: string) => void;
    handlerMarkAsImportant: (id: string, type: typeFilter) => void;
}
function TodoListView({ list, filter, handlerRemoveTodo, handlerMarkAsImportant }: iProps) {
    const [listLenght, setListLenght] = useState(0);

    useEffect(() => {
        setListLenght(list.length);
    }, [list]);

    return (
        <div className="view-wrapper mb-4">
            <p className="h4 py-2 mb-3 text-uppercase">Danh sách việc cần làm {filter ? `(${filter})` : ''}</p>
            {listLenght ? (
                <ul className="list-group">
                    {list.map((item) => (
                        <TodoItem
                            key={item.id}
                            item={item}
                            onRemove={handlerRemoveTodo}
                            onMaskAsImportant={handlerMarkAsImportant}
                        />
                    ))}
                </ul>
            ) : (
                <div className="p-5 bg-warning bg-opacity-25 text-center rounded">Chưa có việc cần làm</div>
            )}
        </div>
    );
}

export default TodoListView;
