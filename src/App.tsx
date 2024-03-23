import LayoutDefault from './layouts/LayouDefault';
import TodoWrapper from './components/todos/TodoWrapper';
import SidebarWrapper from './components/sidebar/SidebarWrapper';

import type { typeFilter } from './types/types';

import { useState, useCallback } from 'react';
function App() {
    const [filter, setFilter] = useState<typeFilter>('');
    const [theme, setTheme] = useState('dark');

    const handlerFilter = useCallback((val: typeFilter) => {
        setFilter(val);
    }, []);

    return (
        <div data-bs-theme={theme}>
            <LayoutDefault theme={theme} onSetTheme={setTheme}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3">
                            <SidebarWrapper filter={filter} onFilter={handlerFilter} />
                        </div>
                        <div className="col-12 col-md-8 col-lg-9">
                            <TodoWrapper filter={filter} />
                        </div>
                    </div>
                </div>
            </LayoutDefault>
        </div>
    );
}

export default App;
