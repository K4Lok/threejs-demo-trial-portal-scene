import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'

import Experience from './Experience'

function App() {

  return (
    <div className="App">
      <Canvas camera={{position: [3, -3, 3], fov: 80}}>
        <OrbitControls autoRotate autoRotateSpeed={0.2} maxPolarAngle={Math.PI / 2.5} />
        <Experience />
      </Canvas>
    </div>
  )
}

export default App
