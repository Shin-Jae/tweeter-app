import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../store/session";

const EditUser = ({ onClose }) => {
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    // const [email, setEmail] = useState(user.email);
    const [profile_img, setProfileImg] = useState(user.profile_img);
    const [banner_img, setBannerImg] = useState(user.banner_img);
    const [bio, setBio] = useState(user.bio);
    const [imageLoading, setImageLoading] = useState(false);
    const [choseProfileImg, setChoseProfileImg] = useState(false);
    const [choseBanner, setChoseBanner] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const validationErrors = []
        if (bio.length > 160) validationErrors.push("Bio should be within 160 characters")
        setErrors(validationErrors)
    }, [bio])

    const onEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("name", name);
        formData.append("username", username);
        formData.append("profile_img", profile_img);
        formData.append("banner_img", banner_img);
        formData.append("bio", bio);
        setImageLoading(true);

        const data = await dispatch(editUser(user.id, formData));

        if (data.id) {
            setImageLoading(false);
            setProfileImg(null);
            setBannerImg(null);
            setChoseProfileImg(false);
            onClose(false);
        } else if (data) {
            setImageLoading(false);
            setErrors(data)
        }

    };

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

    const updateBio = (e) => {
        setBio(e.target.value);
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };
    return (
        <div className='signup-container'>
            <form onSubmit={onEdit}>
                <div className="edit-user-header">
                    <div className="left-edit-header">
                        <div className='signup-clse-btn'>
                            <button className='login-close-btn' onClick={() => onClose(false)} type='button'>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <h2 className='edit-user-header-text'>
                            Edit profile
                        </h2>
                    </div>
                    <div className='submit-login-container'>
                        <button type='submit' className='submit-edit-user submit-tweet-btn' disabled={errors.length}>Save</button>
                    </div>
                </div>
                <div className="edit-user-img-label">
                    <div>Upload profile image</div>
                    <div>Upload banner</div>
                </div>
                <div className='edit-user-imgs'>
                    <label className='user-edit-icon-container'>
                        <div >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={updateProfileImg}
                                hidden
                            /></div>
                        <i class="fa-solid fa-image-portrait fa-xl edit-user-icons"></i>
                        {choseProfileImg &&
                            <div className='check-image edit-check-image'>
                                <i className="fa-solid fa-circle-check fa-md"></i>
                            </div>
                        }
                    </label>
                    <label className='user-edit-icon-container'>
                        <div >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={updateBannerImg}
                                hidden
                            /></div>
                        <i className="fa-solid fa-image fa-lg edit-user-icons"></i>
                        {choseBanner &&
                            <div className='check-image edit-check-image'>
                                <i className="fa-solid fa-circle-check fa-md"></i>
                            </div>
                        }
                    </label>
                </div>
                {(imageLoading) && (profile_img || banner_img) && <p>Loading Image...</p>}
                <div className='errors-container'>
                    {errors.map((error, ind) => (
                        <div className='errors' key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <div className='signin-labels edit-user-labels' style={{ fontWeight: 'bold' }}>Name</div>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        className='login-field signup-field edit-user-field'
                        onChange={updateName}
                        value={name}
                        required={true}
                    ></input>
                </div>
                <div>
                    <div className='  signin-labels edit-user-labels' style={{ fontWeight: 'bold' }}>Username</div>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username/Handle'
                        className='login-field signup-field edit-user-field'
                        onChange={updateUsername}
                        required={true}
                        value={username}
                    ></input>
                </div>
                <div>
                    <div className='signin-labels edit-user-labels'><span style={{ fontWeight: 'bold' }}>Bio</span></div>
                    <textarea
                        type='date'
                        name='bio'
                        className='login-field signup-field edit-user-field edit-user-bio'
                        onChange={updateBio}
                        value={bio}
                    />
                </div>
            </form>
        </div>
    )
}

export default EditUser
