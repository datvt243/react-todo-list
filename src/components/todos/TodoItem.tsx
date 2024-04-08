import type { iTodoItem, typeFilter } from '../../types/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark, faTrash, faPenToSquare, faRepeat } from '@fortawesome/free-solid-svg-icons';
import ReactDropdown from '../bases/ReactDropdown';

interface iProps {
    item: iTodoItem;
    onRemove: (id: string) => void;
    onMarkAsImportant: (id: string, type: typeFilter) => void;
    onMarkAsDone: (id: string) => void;
    onUpdateTodoRecord: (record: iTodoItem) => void;
    onDelete: (id: string) => void;
}
function TodoListItem({ item, onRemove, onMarkAsImportant, onUpdateTodoRecord, onMarkAsDone, onDelete }: iProps) {
    return (
        <li className="list-group-item">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                    <div className="d-flex">
                        <div className="col-auto pe-2" style={{ marginTop: '2px' }}>
                            <input
                                className={['form-check-input'].join(' ')}
                                type="checkbox"
                                value=""
                                id={item.id}
                                checked={item.isDone}
                                onChange={() => {
                                    onMarkAsDone(item.id);
                                }}
                                disabled={!!item.deleted_at}
                            />
                        </div>
                        <div className="col-auto flex-grow-1">
                            <p className="mb-0">
                                <span className={item.isDone === true ? 'text-decoration-line-through' : ''}>{item.title}</span>
                                {item.deleted_at && <span className="small opacity-75 text-danger px-2">deleted</span>}
                            </p>
                            {item.description && <p className="small mb-0 opacity-50">{item.description}</p>}
                            {item.repeat && (
                                <p className={`small mb-0 opacity-50 ${item.deadline > +new Date() ? 'text-danger' : ''}`}>
                                    {new Date(item.deadline).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* <p>{JSON.stringify(item)}</p> */}
                </div>
                <div>
                    <div className="d-flex" style={{ marginTop: '4px' }}>
                        <div className="col-auto">
                            <div className="row align-items-end">
                                {item.repeat && (
                                    <div className="col-auto opacity-75">
                                        <FontAwesomeIcon icon={faRepeat} />
                                        <span className="ps-2">{item.repeat}</span>
                                    </div>
                                )}

                                <div className="col-auto">
                                    <span
                                        className="d-inline-block cursor-pointer"
                                        onClick={() => {
                                            onMarkAsImportant(item.id, item.group);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={
                                                ['important'].includes(item.group) ? 'opacity-100 text-warning' : 'opacity-25'
                                            }
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto ps-3">
                            <ReactDropdown text="">
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#refModalUpdate"
                                        onClick={() => {
                                            onUpdateTodoRecord(item);
                                        }}
                                    >
                                        <span className="badge-icon">
                                            <FontAwesomeIcon icon={faPenToSquare} className="text-warning" />
                                        </span>
                                        Chỉnh sửa
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                {(!item.deleted_at || item.deleted_at === null) && (
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                onRemove(item.id);
                                            }}
                                        >
                                            <span className="badge-icon">
                                                <FontAwesomeIcon icon={faTrash} className="text-danger" />
                                            </span>
                                            Cho vào thùng rác
                                        </a>
                                    </li>
                                )}

                                {item.deleted_at && item.deleted_at !== null && (
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                onDelete(item.id);
                                            }}
                                        >
                                            <span className="badge-icon">
                                                <FontAwesomeIcon icon={faXmark} className="text-danger" />
                                            </span>
                                            Xoá
                                        </a>
                                    </li>
                                )}
                            </ReactDropdown>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default TodoListItem;
