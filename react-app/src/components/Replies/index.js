import React from "react";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";


function Replies() {
    // const { tweetId } = useParams();

    const tweetReplies = useSelector((state) => state.replies);
    const allUsers = useSelector((state) => state.search);

    const replies = Object.values(tweetReplies);
    const users = Object.values(allUsers);

    return (
        <div>
            replies
            <ul>
                {replies.map(reply => {
                    return <div key={reply.id} className='one-tweet-container'>
                        <div className='tweet-borders'></div>
                        <div>
                            {users.map(user => {
                                return <span key={`${reply.id}-${user.id}`}>
                                    {reply.user_id === user.id
                                        ? <div className="user-profile">
                                            <img src={`${user.profile_img}`} alt='profile-img' className='user-profile-img' />
                                            <div className='user-info'>
                                                <div className='user-fullname'>
                                                    {user.first_name} {user.last_name}
                                                </div>
                                                <div className='user-username'>
                                                    @{user.username}
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                </span>
                            })}
                        </div>
                        <div className="container-tweet-contents">
                            <div>{reply.content}</div>
                        </div>
                    </div>
                })}
            </ul>
        </div>
    )
}

export default Replies;
