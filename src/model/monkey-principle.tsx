import { AbstractMesh, Nullable, Vector3 } from "@babylonjs/core";
import { Suspense, useRef } from "react";
import { Model } from "react-babylonjs";
import "@babylonjs/loaders/glTF";
export default function Monkey_principle() {
	const modelRef = useRef<Nullable<AbstractMesh>>(null);
	let baseUrl = '/glb/';
	return (
		<Suspense fallback={
			<box name="fallback" position={new Vector3(0, 0, 0)} />}>

			<Model
				ref={modelRef}
				name="monkey-principle"
				rotation={new Vector3(0, 0, 0)}
				rootUrl={`${baseUrl}`}
				sceneFilename={"monkey-principle.glb"}
				scaleToDimension={1}
				position={new Vector3(5, 0, 0)}
				scaling={new Vector3(0.5, 0.5, 0.5)}
			/>

		</Suspense>
	)
}
