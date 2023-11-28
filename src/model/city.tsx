import { AbstractMesh, Color3, FresnelParameters, Nullable, Vector3 } from "@babylonjs/core";
import { Suspense, useEffect, useRef } from "react";
import { Model } from "react-babylonjs";
import "@babylonjs/loaders/glTF";
import Monkey_basic from "./monkey-basic";
export default function City() {
	const modelRef = useRef<Nullable<AbstractMesh>>(null);
	let baseUrl = '/glb/';
	let hdr = '/hdr/snow_field.hdr'
	useEffect(() => {
		if (modelRef.current !== null) {
			console.log(modelRef.current.name);

		}
	}, [])

	return (
		<Suspense fallback={
			<box name="fallback" position={new Vector3(0, 0, 0)} />}>

			<pointLight
				name="Omni0"
				position={new Vector3(0, 0, 9)}
				diffuse={new Color3(1, 0.5, 0.5)}
				intensity={10}

			/>
			<Model
				ref={modelRef}
				name="city"
				rotation={new Vector3(0, 5, 0)}
				rootUrl={`${baseUrl}`}
				sceneFilename={"city-notexture.glb"}
				scaleToDimension={1}
				position={new Vector3(5, 0, 0)}
				scaling={new Vector3(0.5, 0.5, 0.5)}
			>
				<standardMaterial
					name="material-red"
					alpha={0.2}
					specularPower={16}
					diffuseColor={Color3.Red()}
					emissiveColor={new Color3(0.5, 100, 0.5)}
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


				>
					<cubeTexture
						assignTo="reflectionTexture"
						rootUrl={hdr}

					/>

				</standardMaterial>



			</Model>

		</Suspense>
	)
}
