import './SearchBar.css'

export default function SearchBar() {
    return (
        <div className="searchBar">
            <input
                className='inside-search-bar'
                type='text'
                placeholder="Search"
            />
        </div>
    )
}
