import { iTodoItem } from '../types/types';
import TodoListItem from './TodoListItem';

import { useState, useEffect } from 'react';

function TodoListView({ list, handlerRemoveTodo }: { list: iTodoItem[]; handlerRemoveTodo: () => void }) {
    const [listLenght, setListLenght] = useState(0);

    useEffect(() => {
        setListLenght(list.length);
    }, [list]);

    return (
        <div className="view-wrapper mt-4">
            <p className="h5 mb-3 text-capitalize">Danh sách việc cần làm</p>
            {listLenght ? (
                <ul className="list-group">
                    {list.map((item) => (
                        <TodoListItem key={item.id} item={item} onRemove={handlerRemoveTodo} />
                    ))}
                </ul>
            ) : (
                <div className="alert alert-warning my-2">Chưa có việc cần làm</div>
            )}
        </div>
    );
}

export default TodoListView;
