
import { Application } from "https://cdn.skypack.dev/@splinetool/runtime@0.9.298"

console.clear()

const canvas = document.getElementById('canvas3d')
const spline = new Application(canvas)
spline
  .load('https://prod.spline.design/wJBXJCckwmL1rsqB/scene.splinecode')
  .then(() => {
		const sofa = spline.findObjectByName('sofa')
		const chair = spline.findObjectByName('chair')
		const bed = spline.findObjectByName('Bed')
		const table = spline.findObjectByName('table')
		const piupiu = spline.findObjectByName('PIUPIU')
    const objects = [sofa, chair, bed, table, piupiu]
    const objectsNoSofa = [chair, bed, table, piupiu]
  
    const rotateSofa = gsap.to(sofa.rotation, 10, {y: Math.PI * 2, repeat: -1, ease: "none"})
    const rotateChair = gsap.to(chair.rotation, 10, {y: Math.PI * 2, repeat: -1, ease: "none"})
    const rotateBed = gsap.to(bed.rotation, 10, {y: Math.PI * 2, repeat: -1, ease: "none"})
    const rotateTable = gsap.to(table.rotation, 10, {y: Math.PI * 2, repeat: -1, ease: "none"})
    const rotateBookshelf = gsap.to(piupiu.rotation, 5, {y: Math.PI * 2, repeat: -1, ease: "none"})
    
    function reduceObjects(duration){
      objects.forEach(object => {
        gsap.to(object.scale, duration, {x: 0, y: 0, z: 0, ease: "expo.inOut"})
        gsap.to(object.rotation, duration, {x: Math.PI, ease: "expo.inOut"})
      })
    }
    function reduceObjectsNoSofa(duration){
      objectsNoSofa.forEach(object => {
        gsap.to(object.scale, duration, {x: 0, y: 0, z: 0, ease: "expo.out"})
        gsap.to(object.rotation, duration, {x: Math.PI, ease: "expo.out"})
      })
    }
    function showObject(object, scale){
      reduceObjects(1)
      gsap.to(object.scale, 1, {x: scale, y: scale, z: scale, delay: 1, ease: "expo.inOut"})
      gsap.to(object.rotation, 1, {x: Math.PI * 2, delay: 1, ease: "expo.inOut"})
    }
  
    objects.forEach(object => {
      gsap.set(object.scale, {x: 0, y: 0, z: 0})
    })
    gsap.set(sofa.position, {x: 400})
    gsap.set(sofa.scale, {x: 0.5, y: 0.5, z: 0.5})
  
    var firstTL = gsap.timeline({scrollTrigger: {
      trigger: ".title",
      start: () => window.innerHeight + " bottom",
      end: () => window.innerHeight * 1.5 + " bottom",
      scrub: 2,
      onEnter: () => {
        spline.emitEvent("mouseDown", "sofa")
      },
      onEnterBack: () => {
        reduceObjectsNoSofa(1)
        spline.emitEvent("mouseDown", "sofa")
      },
      onLeave: () => {
        spline.emitEvent("mouseUp", "sofa")
      },
      onLeaveBack: () => {
        spline.emitEvent("mouseUp", "sofa")
      }
    }})
  
    firstTL.to(sofa.scale, {x: 1, y: 1, z: 1}, 0)
    firstTL.to(sofa.position, {x: 0}, 0)
    firstTL.to(sofa.rotation, {x: Math.PI * 2}, 0)
  
    document.getElementById("toChair").addEventListener("click", () => {showObject(chair, 1)})
    document.getElementById("toBed").addEventListener("click", () => {showObject(bed, 1.5)})
    document.getElementById("toTable").addEventListener("click", () => {showObject(table, 0.75)})
    document.getElementById("toPIUPIU").addEventListener("click", () => {showObject(piupiu, 1.25)})
  
    var resizeTimeout = setTimeout(0)
    window.addEventListener("resize", function(){
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(function(){reduceObjectsNoSofa(1)}, 500)
    })
	})
