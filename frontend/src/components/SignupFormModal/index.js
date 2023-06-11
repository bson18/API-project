import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const errorsObj = {}

        if (!email) errorsObj.email = 'Email is required'
        if (!username || username.length < 4) errorsObj.username = 'Username is required'
        if (!firstName) errorsObj.firstName = 'First name is required'
        if (!lastName) errorsObj.lastName = 'Last name is required'
        if (!password) errorsObj.password = 'Password is required'
        if (password.length < 6) errorsObj.password = 'Password must be 6 characters or more'
        if (!confirmPassword) errorsObj.confirmPassword = 'Confirm password field is required'
        setErrors(errorsObj)
    }, [email, username, firstName, lastName, password, confirmPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .then(history.push('/'))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    return (
        <>
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                {submitted && errors.email && <p className="error">{errors.email}</p>}
                {submitted && errors.username && <p className="error">{errors.username}</p>}
                {submitted && errors.firstName && <p className="error">{errors.firstName}</p>}
                {submitted && errors.lastName && <p className="error">{errors.lastName}</p>}
                {submitted && errors.password && <p className="error">{errors.password}</p>}
                {submitted && errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>)}
                <label>
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>

                <button
                    type="submit"
                    disabled={Object.values(errors).length > 0}
                    id={Object.values(errors).length > 0 ? 'sign-up-disabled' : 'sign-up-active'}
                >Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
