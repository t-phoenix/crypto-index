import React from "react"
import { useNavigate } from "react-router-dom"


export default function Home(){
    const navigate = useNavigate()
    return(
        <div className="main-content">
            <h1>Home Screen</h1>
            <button onClick={()=>navigate('/bluechip')}>Blue chip</button>

            
        </div>
    )
}