import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Heart(props) {
  const { nodes, materials } = useGLTF("/heart.gltf");
  const ref = useRef();

 
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // clean spin
      
    }
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={ [0, 0, 0]}>
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.Heart}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.Marble}
          rotation={[-Math.PI / 2, 0, 0]}
         
        />
      </group>
    </group>
  );
}

useGLTF.preload("/heart.gltf");