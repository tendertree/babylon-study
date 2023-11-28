"use client"
import { Color3, Color4, CubeTexture, HDRCubeTexture, HemisphericLight, Mesh, PBRMaterial, PBRMetallicRoughnessMaterial, SceneLoader, StandardMaterial, Texture, Vector3, Scene as Bs, ShadowGenerator, DirectionalLight } from "@babylonjs/core";
import { useEffect } from "react";
import { Box, useScene } from "react-babylonjs";
import "@babylonjs/loaders/glTF";
import "./setup.css"
export default function Setup() {
	const scene = useScene();
	useEffect(() => {
		if (scene === null) return;
		var hdrTexture = CubeTexture.CreateFromPrefilteredData("https://assets.babylonjs.com/environments/studio.env", scene);
		scene.environmentTexture = hdrTexture;
		var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
		light.intensity = 0.05;


		var pbr = new PBRMaterial("pbr", scene);
		pbr.metallic = 0.0;
		pbr.roughness = 0
		pbr.subSurface.isRefractionEnabled = true;
		SceneLoader.ImportMesh(
			'', // root url
			'/glb/', // directory where the model is located
			'city.glb', // model filename
			scene,
			function(meshes) {
				meshes[0].name = 'city';
				meshes[0].position = new Vector3(0, 0, 0);
				meshes.forEach(function(mesh) {
					if (mesh.material) {
						const newMaterial = new PBRMaterial('newMaterial', scene);
						newMaterial.albedoColor = new Color3(1, 1, 1);
						newMaterial.metallic = 0.5;
						newMaterial.roughness = 0.5;
						mesh.material = newMaterial;
					}
				}
				)

				scene.fogMode = Bs.FOGMODE_LINEAR;
				scene.fogColor = new Color3(0.8, 0.8, 0.8); // Adjust the color as needed
				scene.fogStart = 0; // Adjust the start distance of the fog
				scene.fogEnd = 50; //

				const light = new DirectionalLight('dirLight', new Vector3(-1, -1, -1), scene);
				light.intensity = 1; // Adjust the light intensity as needed
				light.position = new Vector3(0, 5, 0); // Adjust the light position as needed

				// Set up shadows for the directional light
				const shadowGenerator = new ShadowGenerator(1024, light);
				shadowGenerator.usePoissonSampling = true; // Optional: Use Poisson Sampling for smoother shadows

				// Assign the shadow generator to each mesh
				meshes.forEach(function(mesh) {
					shadowGenerator.addShadowCaster(mesh);
				})
				if (scene != null) {
					scene.imageProcessingConfiguration!.colorGradingEnabled = true;

					scene.imageProcessingConfiguration!.colorCurves.globalHue = -0.5; // Adjust the hue to make it more bluish
				}


			}
		)
	}, [])

	return (
		<standardMaterial
			name="box-mat"
			diffuseColor={Color3.Red()}
			specularColor={Color3.Black()}
		/>
	)
}
