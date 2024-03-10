import LayoutDefault from './layouts/LayouDefault';
import TodoListWrapper from './components/TodoListWrapper';

function App() {
    return (
        <>
            <LayoutDefault>
                <TodoListWrapper />
            </LayoutDefault>
        </>
    );
}

export default App;
