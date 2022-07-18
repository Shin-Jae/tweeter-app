import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Follow from "../Follow";
import './RightColumn.css';


function SearchBar() {
    const [query, setQuery] = useState("")
    const [found, setFound] = useState("")
    const userId = useSelector((state) => state.session.user.id)
    const allUsers = useSelector((state) => state.search)
    const users = Object.values(allUsers)


    const handleNoUsers = (e) => {
        const found = users.find(user =>
            user.name.toLowerCase() === query.toLowerCase().trim()
        )
        setFound(found)
    }

    const filterUsers = (users, query) => {
        if (!query) {
            return users;
        }
        return users.filter((user) => {
            const fullName = `${user.name.toLowerCase().trim()}`;
            return fullName.includes(query.toLowerCase().trim());
        })
    }
    const filteredUsers = filterUsers(users, query);


    return (
        <div className="container-full-search">
            <div className="search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
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
                    <ul className="filtered-list" style={{ listStyleType: 'none' }}>
                        {query ? filteredUsers.map(user => {
                            if (user.id !== userId) {
                                return <li key={user.id}
                                    className='search__icon--name'
                                >
                                    <div key={user.id} className="user-search-container">
                                        <NavLink to={`/profile/${userId}/${user.id}`} key={`${user.id}-search-link`} activeStyle={{ textDecoration: 'none' }} style={{ textDecoration: 'none', color: 'black' }} onClick={() => setQuery("")}>
                                            <span>
                                                <img src={`${user.profile_img}`} alt='profile-img' className='user-profile-img' />
                                            </span>
                                            <div className="user-fullname-username">
                                                <div className="recommended-fullname">
                                                    {user.name}
                                                </div>
                                                <div className='recommended-username'>
                                                    @{user.username}
                                                </div>
                                            </div>
                                        </NavLink>
                                        <div className="recommened-follow-btn">
                                            <Follow followingId={user.id} />
                                        </div>
                                    </div>
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
