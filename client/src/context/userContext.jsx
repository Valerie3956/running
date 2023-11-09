import React, { useState, useEffect } from "react";
import axios from "axios"

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [userRuns, setUserRuns] = useState([])

    // log user runs at initial render

    useEffect(() => {
        userAxios.get("/api/run/user")
            .then(res => setUserRuns(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }, [])

    //signup

    function signup(credentials) {
        axios.post("/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    //login

    async function login(credentials) {
        try {
            const loginResponse = await axios.post("/auth/login", credentials)
            const { user, token } = loginResponse.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))

            const userRunResponse = await userAxios.get("/api/run/user")
            setUserRuns(userRunResponse.data)
        }

        catch (err) {
            if (err.response) {
                handleAuthError(err.response.data.errMsg)
            } else {
                console.log(err.response.data.errMsg)
            }
        }
    }

    //logout

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            errMsg: ""
        })
        setUserRuns([])
    }

    function handleAuthError(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthError() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    //addRun

    async function addRun(newRun) {
        try {
            //add run to DB
            const runResponse = await userAxios.post("api/run", newRun)
            
            //updates userState
            setUserState(prevUserState => ({
                ...prevUserState,
                user: {
                    ...prevUserState.user,
                    totalMiles: runResponse.data.runUser.totalMiles
                }
            }))
            //update user runs in state
            const userRunResponse = await userAxios.get("/api/run/user")
            setUserRuns(userRunResponse.data)
        } catch (err) {
            console.log(err)
        }

    }

    //delete run

    async function deleteRun(runId) {
        try {
            //add run to DB
            const runResponse = await userAxios.delete(`/api/run/${runId}`)
            
            //updates userState
            setUserState(prevUserState => ({
                ...prevUserState,
                user: {
                    ...prevUserState.user,
                    totalMiles: runResponse.data.runUser.totalMiles
                }
            }))
            //update user runs in state
            setUserRuns(prevUserRuns => prevUserRuns.filter(run => run._id !== runId))
        } catch (err) {
            console.log(err)
        }

    }


    //edit run
    function editRun(inputs, runId) {

        userAxios.put(`api/run/${runId}`, inputs)
            .then(setUserRuns(prevUserRuns => prevUserRuns.map(run => {

                if (run._id !== runId) {
                    return run
                } else if (run._id === runId) {
                    return {
                        ...run,
                        inputs
                    }
                }
            }
            )))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                userAxios,
                resetAuthError,
                addRun,
                userRuns,
                deleteRun,
                editRun
            }}

        >
            {props.children}
        </UserContext.Provider>
    )
}