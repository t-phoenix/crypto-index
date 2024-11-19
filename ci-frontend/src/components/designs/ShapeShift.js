import { motion } from "framer-motion";

export default function ShapeShift() {
  return (
    <motion.div
      style={{
        width: "60%",
        height: "100%",
        padding: "0%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginInline: "5%",
      }}
      // initial={{ opacity: 0, translateX: -400 }}
      // whileInView={{ opacity: 1, translateX: 0 }}
      // transition={{ duration: 2 }}
    >
      <motion.div
        viewBox="0 0 1000 600"
        animate={{
          scale: [1, 0.5, 1.2, 1.5, 1],
          rotate: [0, 90, 270, 270, 180],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          backgroundColor: [
            "#ff0055",
            "#ff0055",
            "#00cc88",
            "#00cc88",
            "#0099ff",
          ],
          boxShadow: [
            "20px 20px 20px #ff0055",
            "5px -4px 30px #ff0055",
            "-15px 8px 10px #00cc88",
            "-25px -30px 10px #00cc88",
            "50px 16px 30px #0099ff",
          ],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        }}
        style={{
          height: "180px",
          width: "180px",
          backgroundColor: "#ff0055",
          margin: "0%",
        }}
      />
    </motion.div>
  );
}

// ff0055
// 00cc88
// 0099ff
