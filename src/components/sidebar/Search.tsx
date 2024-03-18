import { useState } from 'react';

function Search() {
    const [search, setSearch] = useState('');
    return (
        <div className="input-group input-group-sm m-0">
            <span className="input-group-text p-1">
                <button className="btn btn-primary btn-sm" disabled={!search}>
                    S
                </button>
            </span>
            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                type="text"
                className="form-control form-control-sm"
                placeholder="Search ..."
            />
        </div>
    );
}

export default Search;
