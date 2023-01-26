import { useRef } from "react"
import { extend, useFrame } from "@react-three/fiber"
import { useGLTF, useTexture, shaderMaterial, Center, Sparkles } from "@react-three/drei"
import * as THREE from 'three'

import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

const PortalShader = shaderMaterial({
    uTime: 0,
    uColorStart: new THREE.Color('#ffdede'),
    uColorEnd: new THREE.Color('#434789'),
}, portalVertexShader, portalFragmentShader)

extend({PortalShader})

function Scene() {
    const { nodes } = useGLTF('model/portal.glb')
    const bakeTextures = useTexture('model/baked.jpg')
    bakeTextures.flipY = false    
    
    const portalShaderRef = useRef()

    useFrame((_, delta) => {
        portalShaderRef.current.uTime += delta
    })

    return (
        <>
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakeTextures} />
            </mesh>

            <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
            </mesh>
            <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
            </mesh>

            <mesh geometry={nodes.portalLight.geometry} position={nodes.portalLight.position} rotation={nodes.portalLight.rotation}>
                <portalShader ref={portalShaderRef} side={THREE.DoubleSide}/>
            </mesh>
        </>
    )
}

export default function Experience() {
    return (
        <>
            <Center top>
                <Scene />
                <Sparkles count={20} size={4} scale={[4, 2, 4]} position-y={1} speed={0.8}/>
            </Center>
        </>
    )
}