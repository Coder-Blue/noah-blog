// @ts-ignore
// @ts-nocheck

"use client";

import { Suspense, useEffect, useRef } from "react";
import {
  OrbitControls,
  useAnimations,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "../loader";

function DeveloperModel({ animationName = "idle", ...props }) {
  const { nodes, materials } = useGLTF("./models/human/scene.glb");

  const group = useRef();

  const { animations: idleAnimation } = useFBX(
    "./models/human/animations/idle.fbx",
  );
  const { animations: saluteAnimation } = useFBX(
    "./models/human/animations/salute.fbx",
  );
  const { animations: clappingAnimation } = useFBX(
    "./models/human/animations/clapping.fbx",
  );
  const { animations: victoryAnimation } = useFBX(
    "./models/human/animations/victory.fbx",
  );

  idleAnimation[0].name = "idle";
  saluteAnimation[0].name = "salute";
  clappingAnimation[0].name = "clapping";
  victoryAnimation[0].name = "victory";

  const { actions } = useAnimations(
    [
      idleAnimation[0],
      saluteAnimation[0],
      clappingAnimation[0],
      victoryAnimation[0],
    ],
    group,
  );

  useEffect(() => {
    actions[animationName]?.reset().fadeIn(0.5).play();

    return () => actions[animationName]?.fadeOut(0.5);
  }, [animationName]);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
    </group>
  );
}

useGLTF.preload("./models/human/scene.glb");

export default function HumanCanvas({
  animationName,
}: {
  animationName: string;
}) {
  return (
    <Canvas>
      <ambientLight intensity={3} />
      <spotLight position={[15, 15, 15]} angle={0.15} penumbra={1} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
      <Suspense fallback={<CanvasLoader />}>
        <DeveloperModel
          position-y={-3}
          scale={3}
          animationName={animationName}
        />
      </Suspense>
    </Canvas>
  );
}
