import React, { useState, useEffect } from "react";
import axios from "axios"
const URL = import.meta.env.VITE_API_URL

export const RunContext = React.createContext()


export default function UserProvider(props) {

const runAxios = axios.create()

runAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const [runs, setRuns] = useState([])
    
function getAllRuns(){
    runAxios.get(`${URL}/run/api/run/getAll`)
    .then(res => setRuns(res.data))
    .catch(err => console.log(err.response.data.errMsg))
}

//reactions

function addStar(runId){
    runAxios.put(`${URL}/run/api/run/star/${runId}`)
.then(res => {
    console.log('addStar response:', res.data); // Log the response data
    setRuns(prevRuns => {
    const updatedRuns = prevRuns.map(run => {
        if (run.lastRun?._id === runId){
            return {
                ...run,
                lastRun : {
                    ...run.lastRun,
                    starUsers: res.data.starUsers,
                    runningstarUsers: res.data.runningstarUsers,
                    medalUsers: res.data.medalUsers
                }
            }
        }
        return run
    })
    console.log(updatedRuns)
    return updatedRuns
})
}
)
        .catch(err => console.log(err.response.data.errMsg))
}

function addRunnerDude(runId){
    runAxios.put(`${URL}/run/api/run/runnerDude/${runId}`)
.then(res => setRuns(prevRuns => {
    const updatedRuns = prevRuns.map(run => {
        if (run.lastRun?._id === runId){
            return {
                ...run,
                lastRun : {
                    ...run.lastRun,
                    starUsers: res.data.starUsers,
                    runningstarUsers: res.data.runningstarUsers,
                    medalUsers: res.data.medalUsers
                }
            }
        }
        return run
    })
    return updatedRuns
}))
        .catch(err => console.log(err.response.data.errMsg))
}

function addMedal(runId){
    runAxios.put(`${URL}/run/api/run/medal/${runId}`)
.then(res => setRuns(prevRuns => {
    const updatedRuns = prevRuns.map(run => {
        if (run.lastRun?._id === runId){
            return {
                ...run,
                lastRun : {
                    ...run.lastRun,
                    starUsers: res.data.starUsers,
                    runningstarUsers: res.data.runningstarUsers,
                    medalUsers: res.data.medalUsers
                }
            }
        }
        return run
    })
    console.log(updatedRuns)
    return updatedRuns
}))
        .catch(err => console.log(err.response.data.errMsg))
}


    return (
        <RunContext.Provider
            value={{
runs,
getAllRuns,
addStar,
addRunnerDude,
addMedal,
runAxios
            }}

        >
            {props.children}
        </RunContext.Provider>
    )
}