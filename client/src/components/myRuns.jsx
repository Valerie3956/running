import React, { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import Run from './run'



export default function MyRuns(props) {

    const { userRuns } = useContext(UserContext)


    //sort my runs chronologically
    const sortedRuns = userRuns.sort((a, b) => new Date(b.date) - new Date(a.date))


    return (
        <div className="main">
            <div>

            {sortedRuns.map(run => 
            <Run {...run} key = {run._id} isMyRunsPage = {true} />
            )}

            </div>
        </div>
    )
}