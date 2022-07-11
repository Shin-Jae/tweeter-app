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
                <SearchBar />
            </div>
            <div>
                <WhoToFollow />
            </div>
        </div>
    )
}

export default RightColumn;
