import { NavLink } from "react-router-dom";

function SplashNotFound() {

    return (
        <div className="page-not-found splash-not-found">
            <p className="first-not-found">Hmm...the page you are looking for doesn't exist.</p>
            <p className="second-not-found">Please type the correct url or click to be sent back home
            </p>
            <NavLink to={`/`} exact={true} className="not-found-home" style={{ textDecoration: 'none' }}>
                <span className="not-found-text">Home</span>
            </NavLink>
        </div>
    )
}

export default SplashNotFound;
