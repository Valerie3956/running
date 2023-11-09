import React, { useState, useContext } from 'react'
import AuthForm from './authForm'
import { UserContext } from '../context/userContext'


export default function Auth() {

    const initInputs = { username: "", password: "" }

    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg, resetAuthError } = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }

    function toggleForm() {
        setToggle(prev => !prev)
        resetAuthError()
    }


    return (
        <div className="authPage">
            <div className = "authForm">
                <h1>Run Tracker</h1>
                {!toggle ?
                    <>
                        <AuthForm
                            handleChange={handleChange}
                            handleSubmit={handleLogin}
                            inputs={inputs}
                            btnText="Login"
                            errMsg={errMsg}
                        />
                        <p onClick={toggleForm}>Not a member?</p>
                    </>
                    :
                    <>
                        <AuthForm
                            handleChange={handleChange}
                            handleSubmit={handleSignup}
                            inputs={inputs}
                            btnText="Sign up"
                            errMsg={errMsg}
                        />
                        <p onClick={toggleForm}>Already a member?</p>
                    </>
                }
            </div>
        </div>
    )
}