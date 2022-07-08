import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/search";

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
                Lorem ipsum dolor sit amet, audiam feugiat pertinax per in. Dicunt iudicabit adversarium at est, sed an nusquam probatus dignissim, et quo quod rebum essent. Ex augue omnesque duo. Esse dicunt integre an vim. Quem erat ad vim, saperet accumsan definitiones per et. Brute nonumy partem eam an, phaedrum senserit torquatos eum cu, congue timeam albucius no vim. Id sanctus invidunt deseruisse mei, ne eos commune mediocrem, ut his eirmod molestie complectitur.
                Cum eu meliore iracundia, eu habeo commune efficiendi vel, mel ea convenire petentium. Ut vel eius lobortis. Vis no nibh adipiscing moderatius, id vim nibh zril epicurei. Nibh accumsan invidunt in
            </div>
        </div>
    )
}

export default RightColumn;
