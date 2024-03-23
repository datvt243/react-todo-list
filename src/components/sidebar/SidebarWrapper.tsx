import Search from './Search';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCalendar, faList, faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons';
import type { typeFilter } from '../../types/types';
import { enumType } from '../../types/types';

interface iProps {
    filter: typeFilter;
    onFilter: (filter: typeFilter) => void;
}
function SidebarWrapper({ filter, onFilter }: iProps) {
    const listSidebar = [
        { text: 'Tất cả', icon: faList, iconClass: 'text-primary', group: enumType.BLANK },
        { text: 'Quan trọng', icon: faStar, iconClass: 'text-warning', group: enumType.IMPORTANT },
        { text: 'Kế hoạch', icon: faCalendar, iconClass: 'text-info', group: enumType.PLANNED },
        { text: 'Tasks', icon: faHouseCircleCheck, iconClass: 'text-success', group: enumType.TASKS },
    ];

    return (
        <div className="sidebar-wapper py-3">
            <div className="mb-3">
                <Search />
            </div>

            <div className="my-3">
                <p className="h4 text-uppercase">Danh sách</p>
                <ul className="list-group list-group-sm list-group-flush">
                    {listSidebar.map((el, idx) => {
                        return (
                            <li
                                className={[
                                    'list-group-item px-2 py-3',
                                    filter === el.group ? 'bg-primary bg-opacity-50' : '',
                                ].join(' ')}
                                key={idx}
                            >
                                <span
                                    className="d-block cursor-pointer hover text-capitalize"
                                    onClick={() => {
                                        onFilter(el.group);
                                    }}
                                >
                                    <span className="badge-icon">
                                        <FontAwesomeIcon icon={el.icon} className={el.iconClass || ''} />
                                    </span>
                                    {el.text}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default SidebarWrapper;
