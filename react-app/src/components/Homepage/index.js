import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllFollows } from '../../store/follows';
import { getUserLikes } from '../../store/likes';
import { getAllTweets } from '../../store/tweet';
import { getUserFollows } from '../../store/userfollows';
import TweetForm from '../TweetForm';
import Tweets from '../Tweets';

function Homepage() {
    const [user, setUser] = useState({});
    const history = useHistory();
    const { userId } = useParams();
    const dispatch = useDispatch();
    const curUser = useSelector((state) => state.session.user.id)

    useEffect(() => {

        if (!user) {
            return;
        }
        if (`${curUser}` !== userId) {
            return history.push(`/error`);
        }

        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
            await dispatch(getAllTweets(userId));
            await dispatch(getUserLikes(userId));
            await dispatch(getAllFollows(userId));
            await dispatch(getUserFollows(userId));
        })();

        //getallTweets

    }, [userId, dispatch]);

    if (!user) {
        return null;
    }

    return (
        <div className='grid-container homepage'>
            <div className='home-text'>
                Home
            </div>
            <div>
                <TweetForm />
                <Tweets />
            </div>
        </div>
    );
}
export default Homepage;
