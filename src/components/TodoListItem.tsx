import type { iTodoItem } from '../types/types';

import Dropdowns from './bases/Dropdowns';

function TodoListItem({ item, onRemove }: { item: iTodoItem; onRemove: () => void }) {
    return (
        <li className="list-group-item">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                    {/* <input className="form-check-input me-1" type="checkbox" value="" id="secondCheckbox" />
                    <label className="form-check-label" htmlFor="secondCheckbox">
                        {item.title}
                    </label> */}
                    <p className="mb-0">{item.title}</p>
                </div>
                <div>
                    <Dropdowns text="">
                        <li>
                            <a class="dropdown-item" href="#">
                                Action
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a
                                className="dropdown-item text-danger"
                                href="#"
                                onClick={() => {
                                    onRemove(item);
                                }}
                            >
                                Xoá
                            </a>
                        </li>
                    </Dropdowns>
                </div>
            </div>
        </li>
    );
}

export default TodoListItem;
