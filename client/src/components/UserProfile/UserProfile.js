import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Logo from '../Logo/Logo';


const UserProfile = ({ onRouteChange, baseURL }) => {
    const { user, logout } = useContext(UserContext);
    const joined = new Date(user.joined);

    const onSubmitDelete = async () => {
        await fetch(`${baseURL}/users/${user.id}`, {
            method: "delete",
            headers:{"Content-Type" : "application/json"},
        })
        .then(response => {
            logout();
            response.status === 200 && onRouteChange("signin");  
        }) 
        .catch((err) => console.log(err));
    }

    return (
        <>
            <Logo />
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">User Profile</legend>
                            <div className="mt4">
                                <p className="db fw6 lh-copy f6">Username: {user.username}</p>
                            </div>
                            <div className="mv3">
                                <p className="db fw6 lh-copy f6">Email: {user.email}</p>
                            </div>
                            <div className="mv3">
                                <p className="db fw6 lh-copy f6">Seach Counter: {user.entries}</p>
                            </div>
                            <div className="mv3">
                                <p className="db fw6 lh-copy f6">Joined: {`${joined.getDate() - 1}/${joined.getMonth()+1}/${joined.getFullYear()}`}</p>
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={() => onSubmitDelete()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Delete Account" />
                        </div>
                    </div>
                </main>
            </article>
        </>
    )
}

export default UserProfile;
