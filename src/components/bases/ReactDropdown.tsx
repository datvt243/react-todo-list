import { Dropdown } from 'bootstrap';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';

interface iProps {
    text: string;
    className?: string;
    directions?: string;
    children?: React.ReactNode;
}

function ReactDropdown({ text, className = '', directions, children }: iProps) {
    const [dropdownId] = useState(() => {
        return createRandomId();
    });

    const [elmBootstrap, setElmBootstrap] = useState(null);

    useEffect(() => {
        setElmBootstrap(() => {
            return new Dropdown(document.getElementById(dropdownId));
        });
    }, []);
    function createRandomId() {
        return 'Dropdown_' + uuidv4();
    }

    return (
        <div className={['btn-group', directions].join(' ')}>
            {text && (
                <button type="button" className={[className, 'btn btn-secondary btn-sm'].join(' ')}>
                    {text}
                </button>
            )}
            <button
                id={dropdownId}
                type="button"
                className={`${className} dropdown-toggle dropdown-toggle-split ${!text && 'rounded'}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => {
                    elmBootstrap.toggle();
                }}
            >
                <span className="visually-hidden">x</span>
            </button>
            <ul className="dropdown-menu">{children}</ul>
        </div>
    );
}

export default ReactDropdown;
