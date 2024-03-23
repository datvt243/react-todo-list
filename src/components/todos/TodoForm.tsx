import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { iTodoItem, typeFilter } from '../../types/types';

interface iProps {
    filter?: typeFilter;
    onAddToList: (item: iTodoItem) => void;
}

function TodoListForm({ filter, onAddToList }: iProps) {
    const [string, setString] = useState('');

    const handlerAddToList = () => {
        const newItem: iTodoItem = {
            id: uuidv4(),
            group: filter || '',
            title: string,
            description: '',
            isDone: false,
            created_at: +new Date(),
            updated_at: null,
        };
        onAddToList(newItem);
        setString('');
    };

    return (
        <div className="form-wrapper mb-4">
            <div className="input-group m-0">
                <input
                    value={string}
                    onChange={(e) => {
                        setString(e.target.value);
                    }}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Nhập vào việc cần làm ..."
                />
                <span className="input-group-text p-1">
                    <button className="btn btn-success" disabled={!string} onClick={handlerAddToList}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </span>
            </div>
        </div>
    );
}

export default TodoListForm;
