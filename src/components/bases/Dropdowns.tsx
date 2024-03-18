interface iDropdowns {
    text: string;
    className: string;
    children?: React.Node;
}

/* import { useEffect } from 'react'; */
function Dropdowns({ text, className = 'btn btn-secondary btn-sm', children }: iDropdowns) {
    /* const intDropdowns = () => {
        const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
        new bootstrap.Dropdown(dropdownElementList);
    }; */

    /*  useEffect(() => {
        const myDropdown = document.getElementById('myDropdown');
        console.log({ myDropdown });
        myDropdown?.addEventListener('show.bs.dropdown', () => {
            console.log('1111');
        });

        return () => {
            myDropdown?.removeEventListener('show.bs.dropdown', () => {});
        };
    }, []); */

    return (
        <>
            <div className="btn-group">
                {text && (
                    <button type="button" className={className}>
                        {text}
                    </button>
                )}
                <button
                    type="button"
                    className={`${className} dropdown-toggle dropdown-toggle-split`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <span className="visually-hidden">x</span>
                </button>
                <ul className="dropdown-menu">{children}</ul>
            </div>
        </>
    );
}

export default Dropdowns;
