import Search from './Search';
function SidebarWrapper() {
    return (
        <div className="sidebar-wapper py-3">
            <Search />
            <div className="my-3">
                <p className="h5">Danh sachs</p>
                <ul class="list-group list-group-sm list-group-flush">
                    <li class="list-group-item">An item</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                    <li class="list-group-item">A fourth item</li>
                    <li class="list-group-item">And a fifth one</li>
                </ul>
            </div>
        </div>
    );
}

export default SidebarWrapper;
