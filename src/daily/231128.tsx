"use client"
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh'
import { Nullable } from '@babylonjs/core/types'
import React, { FC, useEffect, useRef } from 'react'
import { Engine, Scene, useScene } from 'react-babylonjs'
import Monkey_basic from '../model/monkey-basic'
import Monkey_principle from '../model/monkey-principle'
import "@babylonjs/loaders/glTF";
import City from '../model/city'
import Setup from '../component/setup'
import "./base.css"
type MovingBoxProps = {
	rotationAxis: 'x' | 'y' | 'z'
	position: Vector3
	color: Color3
}
const rpm = 5

const MovingBox: FC<MovingBoxProps> = (props: MovingBoxProps) => {
	const scene = useScene()
	const boxRef = useRef<Nullable<AbstractMesh>>(null)
	useEffect(() => {
		if (boxRef.current !== null && scene) {
			const onBeforeRender = () => {
				let deltaTimeInMillis = scene.getEngine().getDeltaTime()
				boxRef.current!.rotation[props.rotationAxis] +=

					(rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)

			}
			scene.registerBeforeRender(onBeforeRender)
			return () => {
				scene.unregisterBeforeRender(onBeforeRender)
			}
		}
	}, [boxRef.current])

	return (
		//@ts-ignore
		<box name="box" ref={boxRef} size={2} position={props.position}>
			<standardMaterial
				name="box-mat"
				diffuseColor={props.color}
				specularColor={Color3.Black()}
			/>
		</box>

	)

}


export default function Study() {
	return (
		<div style={{ flex: 1, display: 'flex' }}>
			<Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
				<Scene
					clearColor={new Color4(0, 0, 0, 0)}
				>
					<freeCamera
						name="camera1"
						position={new Vector3(0, 5, -10)}
						setTarget={[Vector3.Zero()]}
					/>
					<hemisphericLight
						name="light1"
						intensity={0.2}
						direction={Vector3.Up()}
					>
					</hemisphericLight>

					<MovingBox
						color={Color3.Red()}
						position={new Vector3(-2, 0, 0)}
						rotationAxis="y"
					/>
					<Setup />
				</Scene>
			</Engine>

		</div >

	)
}
