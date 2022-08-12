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
                {user ?
                    <SearchBar />
                    : null}
            </div>
            <div>
                {user ?
                    <WhoToFollow />
                    : null}
            </div>
            <div className='right-footer-container'>
                <div className='right-footer-tech'>
                    <div className="footer-text">
                        <p>
                            <span className="footer-indiv-text">
                                React
                            </span>
                            <span className="footer-indiv-text">
                                Redux
                            </span>
                            <span className="footer-indiv-text">
                                JavaScript
                            </span>
                            <span className="footer-indiv-text">
                                Flask
                            </span>
                            <span className="footer-indiv-text">
                                Python
                            </span>
                            <span className="footer-indiv-text">
                                HTML
                            </span>
                            <span className="footer-indiv-text">
                                CSS
                            </span></p>
                        <span className="footer-indiv-text">
                            PostgreSQL
                        </span>
                        <span className="footer-indiv-text">
                            SQLAlchemy
                        </span>
                        <span className="footer-indiv-text">
                            AWS
                        </span>
                        <span className="footer-indiv-text">
                            Docker
                        </span>
                        <span className="footer-indiv-text">
                            Heroku
                        </span>
                    </div>
                </div>
                <div className='copyright'>
                    <div className='github'>
                        <a href="https://github.com/Shin-Jae/tweeter-app" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'none', color: 'black' }}>
                            <i className="fa-brands fa-github fa-xl"></i>
                        </a>
                    </div>
                    {/* <div>
                        <a href="https://github.com/Shin-Jae" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'none', color: 'black' }}>
                            <i className="fa-brands fa-github fa-xl"></i>
                        </a>
                    </div> */}
                    <div className='linkedin'>
                        <a href="https://www.linkedin.com/in/jae-shin-5b3802128/" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'none' }}>
                            <i className="fa-brands fa-linkedin fa-xl linkedin"> </i>
                        </a>
                    </div>
                    <span className="right-copyright">
                        © 2022 Jae Shin
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RightColumn;
