import React from 'react';

interface iProps {
    text: string;
    className?: string;
    directions?: string;
    children?: React.ReactNode;
}

function Dropdowns({ text, className, directions, children }: iProps) {
    return (
        <>
            <div className={['btn-group', directions].join(' ')}>
                {text && (
                    <button type="button" className={[className, 'btn btn-secondary btn-sm'].join(' ')}>
                        {text}
                    </button>
                )}
                <button
                    type="button"
                    className={`${className} dropdown-toggle dropdown-toggle-split ${!text && 'rounded'}`}
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
