import React, { useState, useContext, useEffect } from 'react'
import Runner from './runner'
import { RunContext } from '../context/runContext'


export default function Leaderboard(){
    

    const {runs, getAllRuns} = useContext(RunContext)

    useEffect (() => {
        getAllRuns()
    }, [])

    const sortedRunners = runs.sort((a, b) => b.totalMiles - a.totalMiles)



    return(
        <div className = "main">
            <h1 className = "title">Leaderboard</h1>
            {sortedRunners.map(runner => <Runner {...runner} key = {runner._id}/>)}
        </div>
    )
}