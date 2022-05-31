import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Logo from '../Logo/Logo';


const EditProfile = ({ baseURL }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const { update } = useContext(UserContext);

    const onSubmitEdit = () => {
        update(username, email, baseURL);
        navigate("/user-profile");
    }

    return (
        <>
            <Logo />
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Edit Profile</legend>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username" value={username} />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email" value={email} />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={onSubmitEdit} className="b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-50" type="submit" value="Edit" />
                    </div>
                </div>
            </main>
        </article>
        </>
    );
};

export default EditProfile;
