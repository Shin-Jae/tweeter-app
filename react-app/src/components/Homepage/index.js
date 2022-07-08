import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllTweets } from '../../store/tweet';
// import { getAllUsers } from '../../store/search';
import TweetForm from '../TweetForm';
import Tweets from '../Tweets';

function Homepage() {
    const [user, setUser] = useState({});
    const { userId } = useParams();
    const dispatch = useDispatch();
    const follow = useSelector((state) => state.session.user.following)

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();

        //getallTweets
        if (!follow.length) return;
        const following = follow.map(per => {
            return per.id;
        })
        // dispatch(getAllUsers());
        dispatch(getAllTweets(userId, following));

    }, [userId, follow, dispatch]);

    if (!user) {
        return null;
    }

    return (
        <div className='grid-container homepage'>
            <div>
                Homepage
            </div>
            <div>
                <TweetForm />
                <Tweets />
            </div>
        </div>
    );
}
export default Homepage;
