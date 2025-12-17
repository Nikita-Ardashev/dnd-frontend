import JSZip from 'JSZip';

interface IUploadForDisk {
	method: 'PUT';
	href: string;
	templated: boolean;
	operation_id: string;
}

export const zipUpload = async (file: File) => {
	try {
		const zip = new JSZip();
		const contents = await zip.loadAsync(file);

		let gltfFile = null;
		const textureFiles: string[] = [];

		for (const fileName of Object.keys(contents.files)) {
			const zipEntry = contents.files[fileName];
			if (zipEntry.dir) continue;

			if (fileName.endsWith('.gltf') || fileName.endsWith('.glb')) {
				const blob = await zipEntry.async('blob');
				gltfFile = URL.createObjectURL(blob);
			} else if (fileName.match(/\.(jpg|jpeg|png|webp)$/i)) {
				const blob = await zipEntry.async('blob');
				textureFiles.push(URL.createObjectURL(blob));
			}
		}

		if (gltfFile) {
			return { gltfFile, textureFiles };
		} else {
			alert('GLTF файл не найден в архиве');
		}
	} catch (error) {
		console.error('Ошибка обработки архива:', error);
	}
};

export async function POST(request: Request) {
	const url = process.env.YANDEX_URL!;
	const oauthToken = process.env.YANDEX_TOKEN!;
	const searchParams = new URL(request.url).searchParams;
	try {
		const uploadUrlRequest = await fetch(
			url + `/upload?path=DND/${searchParams.get('folder')}&overwrite=false`,
			{
				method: 'get',
				headers: {
					Authorization: `OAuth ${oauthToken}`,
					Accept: '*/*',
				},
			},
		);
		const uploadInfo: IUploadForDisk = await uploadUrlRequest.json();

		const fileData = await request.arrayBuffer();

		await fetch(uploadInfo.href, {
			method: uploadInfo.method,
			body: fileData,
			headers: { 'Content-Type': 'application/octet-stream' },
		});

		return new Response('File uploaded successfully', {
			status: 201,
			headers: {
				'Content-Type': 'text/plain',
			},
		});
	} catch {
		throw new Error('Что-то пошло не так.');
	}
}
