import { useEffect } from "react"

export default function NeuralBackground(){

  useEffect(()=>{

    const neural = document.getElementById("neural")
    const particles = document.getElementById("particles")

    if(!neural || !particles) return

    for(let i=0;i<25;i++){
      const line=document.createElement("div")
      line.className="neural-line"

      line.style.left=Math.random()*100+"%"
      line.style.animationDelay=Math.random()*6+"s"
      line.style.height=100+Math.random()*200+"px"

      neural.appendChild(line)
    }

    // for(let i=0;i<60;i++){
    //   const p=document.createElement("div")
    //   p.className="particle"

    //   p.style.left=Math.random()*100+"%"
    //   p.style.animationDelay=Math.random()*12+"s"

    //   particles.appendChild(p)
    // }

  },[])

  return (
    <>
      <div className="neural-bg" id="neural"></div>
      <div className="mesh-gradient"></div>
      <div id="particles"></div>
    </>
  )
}