import { iTodoItem } from '../../types/types';
interface iProps {
    record: iTodoItem;
    handlerUpdateToDoById: (record: iTodoItem) => void;
}
const initialRecordState: iTodoItem = {
    id: '',
    title: '',
    description: '',
    isDone: false,
    created_at: +new Date(),
    updated_at: null,
    group: '',
};

import { useState, useEffect } from 'react';
function ToDoUpdate({ record = initialRecordState, handlerUpdateToDoById }: iProps) {
    const [todo, setTodo] = useState<iTodoItem>(initialRecordState);
    useEffect(() => {
        setTodo(record);
    }, [record]);
    return (
        <div className="htmlForm-wrapper">
            <form action="">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={todo.title}
                        onChange={(e) => {
                            setTodo({ ...todo, title: e.target.value });
                        }}
                        placeholder="Tiêu đề"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Ghi chú
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        value={todo.description}
                        onChange={(e) => {
                            setTodo({ ...todo, description: e.target.value });
                        }}
                        placeholder="Thêm ghi chú"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Lặp lại
                    </label>
                    <select
                        className="form-select"
                        value={todo.repeat}
                        onChange={(e) => {
                            setTodo({ ...todo, repeat: e.target.value });
                        }}
                    >
                        <option value="">Không</option>
                        <option value="daily">Mỗi ngày</option>
                        {/* <option value="weekly">Mỗi tuần</option>
                        <option value="monthly">Mỗi tháng</option> */}
                    </select>
                </div>
                <div className="text-right mt-3">
                    <div className="btn-group" role="group" aria-label="">
                        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                            Đóng
                        </button>
                        <button
                            type="button"
                            className={['btn btn-success', !todo.title ? 'disabled' : ''].join(' ')}
                            onClick={() => {
                                handlerUpdateToDoById(todo);
                            }}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ToDoUpdate;
