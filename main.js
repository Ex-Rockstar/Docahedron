import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {gsap} from 'gsap';
//Scene

const scene = new THREE.Scene();

const geometry = new THREE.DodecahedronGeometry(13,2)
const material = new THREE.MeshStandardMaterial({
  color:"#570CBE",
})

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

//Size : 

const size ={
  width:  window.innerWidth,
  height: window.innerHeight,

}


const light = new THREE.PointLight(0xffffff,1,100)
light.position.set(-10,10,25)
scene.add(light)
light.intensity = 1

const light1 = new THREE.PointLight(0xffffff,1,100)
light1.position.set(10,10,10)
light1.add(light1)
light1.intensity = 2.0

//Add Camera

const camera = new THREE.PerspectiveCamera(45,size.width/size.height,0.1,100)
camera.position.z=70 
scene.add(camera)




const canvas= document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width,size.height)
renderer.render(scene,camera)
renderer.setPixelRatio(2)

const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan= false
controls.enableZoom = false
controls.autoRotate = true

window.addEventListener('resize',() =>{
  size.width= window.innerWidth,
  size.height = window.innerHeight,
  
  
  camera.aspect= size.width/size.height,
  camera.updateProjectionMatrix()
  renderer.setSize(size.width,size.height)
  
})


const loop = ()=>{
  // mesh.position.z -=0.1
  // mesh.position.x +=0.1
  // mesh.position.y +=0.1
  
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)

}
loop()


// time line

const t1 =gsap.timeline({defaults:  {duration :1}})
t1.fromTo(mesh.scale,{z:0,x:0,y:0}, {z:1,x:1,y:1})
t1.fromTo('nav',{y:'-100%'}, {y:'0%'})
t1.fromTo('.title',{opacity:0},{opacity:1})



let mouseDown = false
let rbg = [];
window.addEventListener('mousedown',()=>(mouseDown=true))
window.addEventListener('mouseup',()=>(mouseDown=false))

window.addEventListener("mousemove",(e)=>{
  if(mouseDown){
    rgb=[
      Math.round((e.pageX/size.width)*255),
      Math.round((e.pageY/size.width)*255),
      150

    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    // new THREE.Color(`rgb(0,100,150)`)
    gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b: newColor.b  })
  }

})