import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllTweets } from '../../store/tweet';
import TweetForm from '../TweetForm';
import Tweets from '../Tweets';

function Homepage() {
    const [user, setUser] = useState({});
    const history = useHistory();
    const { userId } = useParams();
    const dispatch = useDispatch();
    const curUser = useSelector((state) => state.session.user.id)
    const follow = useSelector((state) => state.session.user.following)

    useEffect(() => {

        if (!user) {
            return;
        } else if (`${curUser}` !== userId) {
            return history.push(`/error`);
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

        dispatch(getAllTweets(userId, following));

    }, [userId, follow, dispatch]);

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
