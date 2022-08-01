


function TimeDisplay({ tweet }) {

    let createdAt = new Date(tweet.created_at);
    let createdYear = createdAt.getFullYear();
    let createdMonth = createdAt.getMonth();
    let createdDate = createdAt.getDate();
    let createdHour = createdAt.getHours();
    let createdTime = createdAt.getMinutes();
    let createdSeconds = createdAt.getSeconds();
    let now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    let currentDate = now.getDate();
    let currentHour = now.getHours();
    let currentTime = now.getMinutes();
    let currentSeconds = now.getSeconds();

    let subYear = currentYear - createdYear;
    let subMonth = currentMonth - createdMonth;
    let subDate = currentDate - createdDate;
    let subHour = currentHour - createdHour;
    let subTime = currentTime - createdTime;
    let subSeconds = currentSeconds - createdSeconds;

    let timePassed;
    console.log('date', createdAt, 'dasds', now, 'years', subYear, subMonth, subDate, subHour, 'hour', currentHour, createdHour)
    console.log('tiem', timePassed, 'hjhgjkhkj', subTime)

    if (subYear === 0 && subMonth === 0 && subDate === 0 && subHour > 1) {
        timePassed = `${subTime} minutes ago`
    }
    // } else if (subYear === 0 && subDate !== 0) {
    //     return;
    // }

    // console.log('tweet', now)
    return (
        <>
            <div>
                {timePassed}
            </div>
        </>
    )
}

export default TimeDisplay;
