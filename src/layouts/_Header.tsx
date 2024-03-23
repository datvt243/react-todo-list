import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Header({ theme, onSetTheme }: { theme: string; onSetTheme: (theme: string) => void }) {
    return (
        <header className="header-wrapper border-bottom">
            <nav className="navbar py-3">
                <div className="container">
                    <p className="navbar-brand m-0">
                        {/* <img src="https://github.com/datvt243/datvt243.github.io/blob/main/public/favicon.png" alt="Todo List" /> */}
                        <strong className="h5 mb-0">[REACT-APP] Todo List</strong>
                    </p>
                    <div className="theme-mode">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className={['btn btn btn-outline-secondary', theme === 'light' && 'active'].join(' ')}
                                onClick={() => {
                                    onSetTheme('light');
                                }}
                            >
                                <FontAwesomeIcon icon={faSun} /> Light
                            </button>
                            <button
                                type="button"
                                className={['btn btn btn-outline-secondary', theme === 'dark' && 'active'].join(' ')}
                                onClick={() => {
                                    onSetTheme('dark');
                                }}
                            >
                                <FontAwesomeIcon icon={faMoon} /> Dark
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
