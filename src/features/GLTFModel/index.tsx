import { Gltf, GltfProps } from '@react-three/drei';

export function GLTFModel(props: GltfProps) {
	return <Gltf {...props} useDraco="/draco-gltf" />;
}
