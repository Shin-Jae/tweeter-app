import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/search";
import SearchBar from "./SearchBar";
import WhoToFollow from "./WhoToFollow";

function RightColumn() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        if (user) {
            dispatch(getAllUsers());
        }
    }, [dispatch, user])

    return (
        <div className="grid-container search">
            <div>
                {user ?
                    <SearchBar />
                    : null}
            </div>
            <div>
                {user ?
                    <WhoToFollow />
                    : null}
            </div>
        </div>
    )
}

export default RightColumn;
