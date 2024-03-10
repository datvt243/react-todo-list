import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { iTodoItem } from '../types/types';
interface iHandlerAddToList {
    onAddToList: (item: iTodoItem) => void;
}

function TodoListForm({ onAddToList }: iHandlerAddToList) {
    const [string, setString] = useState('');
    return (
        <div className="form-wrapper">
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
                    <button
                        className="btn btn-primary"
                        disabled={!string}
                        onClick={() => {
                            onAddToList({
                                id: uuidv4(),
                                title: string,
                                description: '',
                                isDone: false,
                            });
                            setString('');
                        }}
                    >
                        Thêm
                    </button>
                </span>
            </div>
        </div>
    );
}

export default TodoListForm;
