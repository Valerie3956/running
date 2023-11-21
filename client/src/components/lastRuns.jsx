import React, { useContext, useEffect } from 'react'
import { RunContext } from '../context/runContext'
import Run from './run'


export default function LastRuns(props) {

    const { runs, addStar, addRunnerDude, addMedal, getAllRuns } = useContext(RunContext)


useEffect (() => {
    getAllRuns()
}, [])


const lastRuns = runs.filter(run => run.lastRun)

const sortedLastRuns = lastRuns.sort((a, b) => new Date(b.lastRun.date) - new Date(a.lastRun.date))

const displayName = run.lastRun.username.split("@")[0]

    return (
        <div className="main">
            <h1>Last Runs</h1>
            {sortedLastRuns.map(run => 

            <div key = {run.lastRun._id}>
                <h1 className = "nameSocial">{displayName}</h1>
                <Run 
                date = {run.lastRun.date}
                _id = {run.lastRun._id}
                distance = {run.lastRun.distance}
                time = {run.lastRun.time}
                pace = {run.lastRun.pace}
                starUsers = {run.lastRun.starUsers}
                runningstarUsers = {run.lastRun.runningstarUsers}
                comments = {run.lastRun.comments}
                medalUsers = {run.lastRun.medalUsers}
                addStar = {() => addStar(run.lastRun._id)}
                addRunnerDude = {() => addRunnerDude(run.lastRun._id)}
                addMedal = {() => addMedal(run.lastRun._id)}
                />




           
            </div>)}
        </div>
    )
}