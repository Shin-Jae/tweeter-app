import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './RightColumn.css';


function SearchBar() {
    const history = useHistory();
    const [query, setQuery] = useState("")
    const [found, setFound] = useState("")

    const userId = useSelector((state) => state.session.user.id)
    const allUsers = useSelector((state) => state.search)
    const users = Object.values(allUsers)

    const submitSearch = (profileId) => {
        history.push(`/profile/${userId}/${profileId}`);
    }

    const handleNoUsers = (e) => {
        const found = users.find(user =>
            user.first_name.toLowerCase() === query.toLowerCase().trim() ||
            user.last_name.toLowerCase() === query.toLowerCase().trim()
        )
        setFound(found)
    }

    const filterUsers = (users, query) => {
        if (!query) {
            return users;
        }
        return users.filter((user) => {
            const fullName = `${user.first_name.toLowerCase().trim()} ${user.last_name.toLowerCase().trim()}`;
            return fullName.includes(query.toLowerCase().trim());
        })
    }
    const filteredUsers = filterUsers(users, query);


    return (
        <div className="container-full-search">
            <input
                className="input-search-bar-field"
                type="text"
                placeholder="Search Twitter"
                value={query}
                onInput={e => setQuery(e.target.value)}
                onChange={handleNoUsers}
            />
            {query ?
                <div className="container-search-result">
                    <ul className="filtered-list" >
                        {query ? filteredUsers.map(user => {
                            if (user.id !== userId) {
                                return <li key={user.id}
                                    className='search__icon--name'
                                >
                                    <button
                                        className="nav-search-results"
                                        onClick={() => submitSearch(user.id)}
                                        type="button">{user.first_name} {user.last_name}
                                    </button>
                                </li>
                            }
                        }) : null}
                    </ul>
                    {!found && !filteredUsers.length &&
                        <h4 className='no__users--text'>No users by that name</h4>
                    }
                </div>
                : null}
        </div >
    )
}

export default SearchBar;
