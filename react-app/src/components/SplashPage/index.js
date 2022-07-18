import LoginModal from './LoginModal';
import SignUpModal from './SignupModal';
import './SplashPage.css';
import '../auth/Auth.css'
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom';

function SplashPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const demoUser = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'))
        history.push(`/users/2`)
    }

    return (
        <div className='splash-page-container'>
            <div className='background-img'>

                <div className='homepage-large-icon-container'>
                    <i className="fa-brands fa-twitter fa-10x splash-page-large-icon"></i>
                </div>
            </div>
            <div className='right-side'>
                <i className="fa-brands fa-twitter fa-3x twitter-icon"></i>
                <div className='happening-now'>Happening now</div>
                <div className='join-twitter'>Join Tweeter today.</div>
                <div>
                    <button
                        className='demo-splash-btn'
                        type='submit'
                        onClick={demoUser}
                    >Continue with Demo User</button>
                </div>
                <div className='container-content-rule splash-content-rule'>
                    <hr className='horizontal-line line-left'></hr>
                    <div className='content-rule-center'> or </div>
                    <hr className='horizontal-line line-right'></hr>
                </div>
                <SignUpModal />
                <div>
                    <p className='already-have-account'>Already have an account?</p>
                    <LoginModal />
                </div>
            </div>
            <div className='footer-container'>
                <div>
                    <a href="https://github.com/Shin-Jae/tweeter-app" rel="nof" style={{ textDecoration: 'none', color: 'black' }}>
                        <i className="fa-brands fa-github fa-xl"></i>
                        <span className='footer-left footer'>
                            Tweeter
                        </span>
                    </a>
                </div>
                <div>
                    <a href="https://github.com/Shin-Jae" rel="nof" style={{ textDecoration: 'none', color: 'black' }}>
                        <i className="fa-brands fa-github fa-xl"></i>
                        <span className='footer-middle footer'>
                            Jae Shin
                        </span>
                    </a>
                </div>
                <div>
                    <a href="https://www.linkedin.com/in/jae-shin-5b3802128/" rel="nof" style={{ textDecoration: 'none' }}>
                        <i className="fa-brands fa-linkedin fa-xl linkedin"> </i>
                        <span className='footer-right footer'>
                            Jae Shin
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
