import React from "react"
import { useNavigate } from "react-router-dom"
import {motion} from 'framer-motion';

import HeroSection from "../components/sections/HeroSection"
import IconList from "../components/designs/IconList"
import SecondSection from "../components/sections/SecondSection"
import ThirdSection from "../components/sections/ThirdSection"
import ForthSection from "../components/sections/ForthSection"

export default function Home(){
    const navigate = useNavigate()
    return(
        <div >
            <HeroSection />
            {/* <motion.div 
                initial={{opacity: 0, translateX: -200}}
                whileInView={{opacity: 1, translateX: 0}}
                transition={{duration: 1}}
                >
                <IconList />
            </motion.div> */}
            <SecondSection />
            <ThirdSection />
            <ForthSection />
        </div>
    )
}