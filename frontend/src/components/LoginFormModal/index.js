import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const history = useHistory()

    useEffect(() => {
        const errors = {}

        if (credential.length < 4) errors.credential = ''
        if (password.length < 6) errors.password = ''
        setErrors(errors)
    }, [credential, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .then(history.push('/'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const demoLogin = () => {
        dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
            .then(closeModal)
            .then(history.push('/'))
    }

    return (
        <>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                {errors.credential && (
                    <p id="errors">{errors.credential}</p>
                )}
                <label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username or Email"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button
                    type="submit"
                    disabled={Object.values(errors).length > 0}
                    id={Object.values(errors).length > 0 ? 'login-disabled' : 'login-active'}
                >Log In</button>
                <button id="demo" className="demo-button" onClick={demoLogin}>DemoUser</button>
            </form>
        </>
    );
}

export default LoginFormModal;
