import { TModelExternalMesh } from '@/entities/mesh';

export type TSourceTab = 'all' | 'textures' | 'models' | 'NPC';

export type TSource = TModelExternalMesh & { type: Exclude<TSourceTab, 'all'> };

const createSource = (type: TSource['type'], preview: string): TSource => ({
	id: '',
	type,
	preview,
	creator: '',
	createdDate: 0,
	name: '',
});

const BASE_SOURCES: TSource[] = [
	createSource('NPC', '/test-tile.png'),
	createSource('models', '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.jpg'),
	createSource(
		'textures',
		'/local_models/fantasy_scene_stufs_lowpoly_1/textures/Material.002_baseColor.jpeg',
	),
];

/** Заглушка каталога ресурсов, пока нет API. */
export const MOCK_SOURCES: TSource[] = Array.from({ length: 8 }, () => BASE_SOURCES).flat();
