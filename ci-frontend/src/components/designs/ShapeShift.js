
import { motion } from "framer-motion";


export default function ShapeShift(){
    return (
    <div style={{width: '60%', height: '100%', padding: '0%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginInline: '5%'}}>
    
        <motion.div
        viewBox="0 0 600 600"
        animate={{
          scale: [1, 0.5, 1.2, 1.5, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
        style={{height: '180px', width: '180px', backgroundColor: '#32d9cb', margin: '0%'}}
      />
      </div>
    )
}