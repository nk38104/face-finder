import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';


const SignIn = ({ onRouteChange, baseURL }) => {
    const { login } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitSignIn = async () => {
        await fetch(`${baseURL}/signin`, {
            method: "post",
            headers:{"Content-Type" : "application/json"},
            body:   JSON.stringify({
                        email:      email,
                        password:   password
                    })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                login(user);
                onRouteChange("home");
            }
        });
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <a onClick={() => onRouteChange("register")} href="#0" className="f6 link dim black db">Register</a>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default SignIn;
