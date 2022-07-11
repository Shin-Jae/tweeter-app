import { useSelector } from "react-redux";
import Follow from "../Follow";



function WhoToFollow() {
    const allUsers = useSelector((state) => state.search);
    const userId = useSelector((state) => state.session.user.id);
    const curUser = useSelector((state) => state.session.user.following);
    console.log('curuser', curUser);

    const following = []
    curUser.forEach(user => following.push(user.id))

    const users = Object.values(allUsers);


    return (
        <div>
            <div>
                Who to follow
            </div>
            {users.map(user => {
                if (!following.includes(user.id) && user.id !== userId)
                    return <div key={user.id}>
                        {user.first_name} {user.last_name}
                        <Follow followId={user.id} />
                    </div>
            })}
        </div>
    )
}

export default WhoToFollow;
