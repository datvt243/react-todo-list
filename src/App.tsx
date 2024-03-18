import LayoutDefault from './layouts/LayouDefault';
import TodoListWrapper from './components/TodoListWrapper';
import SidebarWrapper from './components/sidebar/SidebarWrapper';

function App() {
    return (
        <>
            <LayoutDefault>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <SidebarWrapper />
                        </div>
                        <div className="col-12 col-md-8">
                            <TodoListWrapper />
                        </div>
                    </div>
                </div>
            </LayoutDefault>
        </>
    );
}

export default App;
