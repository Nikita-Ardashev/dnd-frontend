'use client';
import { Input } from '@/components/ui/input';
import { observer } from 'mobx-react-lite';
import { FormEvent } from 'react';
import { apiUploadModels } from '@/services/api/api';

export const AddMesh = observer(function AddMesh() {
	const handlerUpload = (e: FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.files === null) return;
		const file = e.currentTarget.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = async () => {
			const buffer = new Uint8Array(await file.arrayBuffer());
			apiUploadModels(file.name, buffer);
		};
		reader.readAsArrayBuffer(file);
	};

	return <Input type="file" accept=".gltf,.glb,.zip" onChange={handlerUpload} />;
});
