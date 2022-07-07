import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tweets from '../Tweets';

function Homepage() {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <div>
                Homepage
            </div>
            <div>
                <Tweets />
            </div>
        </div>
    );
}
export default Homepage;
