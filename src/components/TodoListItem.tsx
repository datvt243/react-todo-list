import type { iTodoItem } from '../types/types';

function TodoListItem({ item }: { item: iTodoItem }) {
    return (
        <li className="list-group-item">
            <input className="form-check-input me-1" type="checkbox" value="" id="secondCheckbox" />
            <label className="form-check-label" htmlFor="secondCheckbox">
                {item.title}
            </label>
        </li>
    );
}

export default TodoListItem;
