"use client"
import "./base.css";
import React from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Scene, PBRMetallicRoughnessMaterial, Color3, CubeTexture, SceneLoader, StandardMaterial, Texture } from "@babylonjs/core";
import SceneComponent from "babylonjs-hook"
import "@babylonjs/loaders/glTF";


const onSceneReady = (scene: Scene) => {
	const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
	camera.setTarget(Vector3.Zero());
	const canvas = scene.getEngine().getRenderingCanvas();
	camera.attachControl(canvas, true);
	const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
	light.intensity = 2;


	var pbr = new PBRMetallicRoughnessMaterial("pbr", scene);

	pbr.baseColor = new Color3(1.0, 0.766, 0.336);
	pbr.metallic = 1.0;
	pbr.roughness = 0.0;

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
					const newMaterial = new StandardMaterial('newMaterial', scene);
					newMaterial.diffuseTexture = new Texture('/image/image.jpg', scene);
					mesh.material = newMaterial;
				}
			})
		})
}

const onRender = (scene: Scene) => {

};

const Base = () => (
	<div className="h-screen w-full bg-red-100">
		<SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
	</div>
);
export default Base;
