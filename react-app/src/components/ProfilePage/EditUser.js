import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editUser } from "../../store/session";

const EditUser = ({ onClose }) => {
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    // const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);
    const [profile_img, setProfileImg] = useState('');
    const [banner_img, setBannerImg] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [choseProfileImg, setChoseProfileImg] = useState(false);
    const [choseBanner, setChoseBanner] = useState(false);
    const dispatch = useDispatch();

    const onEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("birthday", birthday);
        formData.append("profile_img", profile_img);
        formData.append("banner_img", banner_img);
        setImageLoading(true);

        const data = await dispatch(editUser(user.id, formData));

        if (data.id) {
            setImageLoading(false);
            setProfileImg(null);
            setBannerImg(null);
            setChoseProfileImg(false);
        } else if (data) {
            setImageLoading(false);
            setErrors(data)
        }

    };
    // const currDate = new Date().toLocaleDateString();

    const getDate = new Date();
    let year = getDate.getFullYear();
    let month = getDate.getMonth();

    if (parseInt(month) < 10) {
        month = `0${month}`
    }
    const date = getDate.getDate();
    const curDate = `${year}-${month}-${date}`
    useEffect(() => {
        const validationErrors = []
        if (birthday > curDate) validationErrors.push("Must be valid Date");
        setErrors(validationErrors)
    }, [birthday, curDate])

    const updateProfileImg = (e) => {
        const file = e.target.files[0];
        setChoseProfileImg(true)
        setProfileImg(file);
    }

    const updateBannerImg = (e) => {
        const file = e.target.files[0];
        setChoseBanner(true)
        setBannerImg(file);
    }

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateBirthday = (e) => {
        setBirthday(e.target.value);
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div className='signup-container'>
            <div className='signup-close-btn'>
                <button className='login-close-btn' onClick={() => onClose(false)} type='button'>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <h2 className='login-header-text'>
                Edit User
            </h2>
            <form onSubmit={onEdit}>
                <div>
                    <div className='login-labels signin-labels'>Name</div>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        className='login-field signup-field'
                        onChange={updateName}
                        value={name}
                        required={true}
                    ></input>
                </div>
                <div>
                    <div className='login-labels  signin-labels'>Username</div>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username/Handle'
                        className='login-field signup-field'
                        onChange={updateUsername}
                        required={true}
                        value={username}
                    ></input>
                </div>
                <div>
                    <div className='login-labels signin-labels'><span style={{ fontWeight: 'bold' }}>Date of birth</span> <span style={{ fontStyle: 'italic', color: 'gray' }}>(optional)</span></div>
                    <input
                        type='date'
                        name='birthday'
                        className='login-field signup-field'
                        onChange={updateBirthday}
                        value={birthday}
                    ></input>
                </div>
                <div className='tweet-submit'>
                    <label className='choose-image'>
                        <div className=''>
                            <input
                                type="file"
                                accept="image/*"

                                onChange={updateProfileImg}
                                hidden
                            /></div>
                        <i className="fa-solid fa-image fa-lg image-icon"></i>
                        {/* <img src={user.profile_img} alt="" /> */}
                        {choseProfileImg &&
                            <div className='check-image'>
                                <i className="fa-solid fa-circle-check fa-md"></i>
                            </div>
                        }
                    </label>
                </div>
                <div className='tweet-submit'>
                    <label className='choose-image'>
                        <div className=''>
                            <input
                                type="file"
                                accept="image/*"

                                onChange={updateBannerImg}
                                hidden
                            /></div>
                        <i className="fa-solid fa-image fa-lg image-icon"></i>
                        {choseBanner &&
                            <div className='check-image'>
                                <i className="fa-solid fa-circle-check fa-md"></i>
                            </div>
                        }
                    </label>
                </div>
                <div className='errors-container'>
                    {errors.map((error, ind) => (
                        <div className='errors' key={ind}>{error}</div>
                    ))}
                </div>
                {(imageLoading) && (profile_img || banner_img) && <p>Loading Image...</p>}
                <div className='submit-login-container'>
                    <button type='submit' className='signup-btn'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser
