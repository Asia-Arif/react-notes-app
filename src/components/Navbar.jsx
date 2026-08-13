const Navbar = () => {
    return (
        <nav className="bg-[#F7F7F7] flex justify-center py-[16px] gap-[40px] flex-wrap px-2">

            <div>
                <input
                    type="text"
                    placeholder="Filter by"
                    className="bg-white p-2"
                />
            </div>

            <div>
                <select
                    title="filter"
                    className="bg-white p-2 cursor-pointer"
                >
                    <option value="default">Sort By</option>
                    <option value="alphabets">Alphabets</option>
                    <option value="edited">Last Edited</option>
                    <option value="created">Recently Created</option>
                </select>
            </div>

        </nav>
    );
};

export default Navbar;