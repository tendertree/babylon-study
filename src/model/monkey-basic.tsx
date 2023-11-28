import { AbstractMesh, Color3, FresnelParameters, Nullable, Vector3 } from "@babylonjs/core";
import { Suspense, useRef } from "react";
import { Model } from "react-babylonjs";
import "@babylonjs/loaders/glTF";
export default function Monkey_basic() {
	const modelRef = useRef<Nullable<AbstractMesh>>(null);
	let baseUrl = '/glb/';
	return (
		<Suspense fallback={
			<box name="fallback" position={new Vector3(0, 0, 0)} />}>

			<Model
				ref={modelRef}
				name="monkey"
				rotation={new Vector3(0, 0, 0)}
				rootUrl={`${baseUrl}`}
				sceneFilename={"monkey-normal.glb"}
				scaleToDimension={1}
				position={new Vector3(0, 0, 0)}
				scaling={new Vector3(0.5, 0.5, 0.5)}
			>
				<standardMaterial
					name="material1"
					alpha={0.2}
					specularPower={16}
					diffuseColor={Color3.Black()}
					emissiveColor={new Color3(0.5, 0.5, 0.5)}
					reflectionFresnelParameters={FresnelParameters.Parse({
						isEnabled: true,
						leftColor: [1, 1, 1],
						rightColor: [0, 0, 0],
						bias: 0.1,
						power: 1,
					})}
					emissiveFresnelParameters={FresnelParameters.Parse({
						isEnabled: true,
						leftColor: [1, 1, 1],
						rightColor: [0, 0, 0],
						bias: 0.5,
						power: 4,
					})}
				/>



			</Model>

		</Suspense>
	)
}
