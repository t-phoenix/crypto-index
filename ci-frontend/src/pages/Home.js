import React from "react"
import { useNavigate } from "react-router-dom"
import "../styles/home.css"
import HeroSection from "../components/sections/HeroSection"
import IconList from "../components/designs/IconList"
import SecondSection from "../components/sections/SecondSection"
import ThirdSection from "../components/sections/ThirdSection"

export default function Home(){
    const navigate = useNavigate()
    return(
        <div className="main-content">
            <HeroSection />
            <IconList />
            <SecondSection />
            <ThirdSection />
        </div>
    )
}