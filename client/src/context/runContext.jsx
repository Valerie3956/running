import React, { useState, useEffect } from "react";
import axios from "axios"

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
    runAxios.get("api/run/getAll")
    .then(res => setRuns(res.data))
    .catch(err => console.log(err.response.data.errMsg))
}

//reactions

function addStar(runId){
    runAxios.put(`api/run/star/${runId}`)
.then(res => setRuns(prevRuns => {
    const updatedRuns = prevRuns.map(run => {
        if (run.lastRun._id === runId){
            return {
                ...run,
                lastRun : res.data
            }
        }
        return run
    })
    return updatedRuns
}))
        .catch(err => console.log(err.response.data.errMsg))
}

function addRunnerDude(runId){
    runAxios.put(`api/run/runnerDude/${runId}`)
.then(res => setRuns(prevRuns => {
    const updatedRuns = prevRuns.map(run => {
        if (run.lastRun._id === runId){
            return {
                ...run,
                lastRun : res.data
            }
        }
        return run
    })
    return updatedRuns
}))
        .catch(err => console.log(err.response.data.errMsg))
}

function addMedal(runId){
    runAxios.put(`api/run/medal/${runId}`)
.then(res => setRuns(prevRuns => {
    const updatedRuns = prevRuns.map(run => {
        if (run.lastRun._id === runId){
            return {
                ...run,
                lastRun : res.data
            }
        }
        return run
    })
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