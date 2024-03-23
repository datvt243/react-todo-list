import type { iTodoItem, typeFilter } from '../../types/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Dropdowns from '../bases/Dropdowns';

interface iProps {
    item: iTodoItem;
    onRemove: (id: string) => void;
    onMaskAsImportant: (id: string, type: typeFilter) => void;
}
function TodoListItem({ item, onRemove, onMaskAsImportant }: iProps) {
    return (
        <li className="list-group-item">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                    <p className="mb-0">{item.title}</p>
                </div>
                <div>
                    <div className="d-flex">
                        <div className="col-auto">
                            <span
                                className="d-inline-block cursor-pointer"
                                onClick={() => {
                                    onMaskAsImportant(item.id, item.group);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={['important'].includes(item.group) ? 'opacity-100 text-warning' : 'opacity-25'}
                                />
                            </span>
                        </div>
                        <div className="col-auto ps-3">
                            <Dropdowns text="">
                                <li>
                                    <a className="dropdown-item disabled" href="#">
                                        <span className="badge-icon">
                                            <FontAwesomeIcon icon={faPenToSquare} className="text-warning" />
                                        </span>
                                        Chỉnh sửa
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => {
                                            onRemove(item.id);
                                        }}
                                    >
                                        <span className="badge-icon">
                                            <FontAwesomeIcon icon={faXmark} className="text-danger" />
                                        </span>
                                        Xoá
                                    </a>
                                </li>
                            </Dropdowns>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default TodoListItem;
