'use client';
import styles from './sources.module.sass';
import { Tile } from '@/shared/ui/tile';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { TModelExternalMesh } from '@/entities/mesh';
import { Input } from '@/shared/ui/input';
import HiddenSidebar from '@/shared/ui/hidden-sidebar/hidden-sidebar';

type TTabs = 'all' | 'textures' | 'models' | 'NPC';

const content: TModelExternalMesh[] & { type: TTabs }[] = [
	{
		preview: '/test-tile.png',
		id: '',
		type: 'NPC',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.jpg',
		id: '',
		type: 'models',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview:
			'/local_models/fantasy_scene_stufs_lowpoly_1/textures/Material.002_baseColor.jpeg',
		id: '',
		type: 'textures',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/test-tile.png',
		id: '',
		type: 'NPC',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.jpg',
		id: '',
		type: 'models',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview:
			'/local_models/fantasy_scene_stufs_lowpoly_1/textures/Material.002_baseColor.jpeg',
		id: '',
		type: 'textures',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/test-tile.png',
		id: '',
		type: 'NPC',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.jpg',
		id: '',
		type: 'models',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview:
			'/local_models/fantasy_scene_stufs_lowpoly_1/textures/Material.002_baseColor.jpeg',
		id: '',
		type: 'textures',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/test-tile.png',
		id: '',
		type: 'NPC',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.jpg',
		id: '',
		type: 'models',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview:
			'/local_models/fantasy_scene_stufs_lowpoly_1/textures/Material.002_baseColor.jpeg',
		id: '',
		type: 'textures',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/test-tile.png',
		id: '',
		type: 'NPC',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.jpg',
		id: '',
		type: 'models',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview:
			'/local_models/fantasy_scene_stufs_lowpoly_1/textures/Material.002_baseColor.jpeg',
		id: '',
		type: 'textures',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/test-tile.png',
		id: '',
		type: 'NPC',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.jpg',
		id: '',
		type: 'models',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview:
			'/local_models/fantasy_scene_stufs_lowpoly_1/textures/Material.002_baseColor.jpeg',
		id: '',
		type: 'textures',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/test-tile.png',
		id: '',
		type: 'NPC',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.jpg',
		id: '',
		type: 'models',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview:
			'/local_models/fantasy_scene_stufs_lowpoly_1/textures/Material.002_baseColor.jpeg',
		id: '',
		type: 'textures',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/test-tile.png',
		id: '',
		type: 'NPC',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview: '/local_models/1/A7RFX93BONGSZ6FU5TOZ80QB8.jpg',
		id: '',
		type: 'models',
		creator: '',
		createdDate: 0,
		name: '',
	},
	{
		preview:
			'/local_models/fantasy_scene_stufs_lowpoly_1/textures/Material.002_baseColor.jpeg',
		id: '',
		type: 'textures',
		creator: '',
		createdDate: 0,
		name: '',
	},
];

export function Sources() {
	const [activeTab, setActiveTab] = useState<TTabs>('all');

	const filteredContent = content.filter((item) => {
		if (activeTab === 'all') return true;
		return item.type === activeTab;
	});

	const contentRender = (
		<div className={styles.content}>
			{filteredContent.map((item, index) => (
				<Tile img={item.preview} key={`${index}-${item.preview}`} />
			))}
		</div>
	);

	return (
		<HiddenSidebar
			maxWidth="324px"
			orientation="left"
			positionButton="start"
			title="Ресурсы"
		>
			<div className={styles.search}>
				<Input placeholder="Search..." />
			</div>
			<Tabs
				defaultValue={'all' as TTabs}
				onValueChange={(value) => setActiveTab(value as TTabs)}
				className={styles.tabs}
			>
				<TabsList>
					<TabsTrigger value={'all' as TTabs}>Все</TabsTrigger>
					<TabsTrigger value={'textures' as TTabs}>Текстуры</TabsTrigger>
					<TabsTrigger value={'models' as TTabs}>Модели</TabsTrigger>
					<TabsTrigger value={'NPC' as TTabs}>НПС</TabsTrigger>
				</TabsList>
				<TabsContent className={styles.tab} value={'all' as TTabs}>
					{contentRender}
				</TabsContent>
				<TabsContent className={styles.tab} value={'models' as TTabs}>
					{contentRender}
				</TabsContent>
				<TabsContent className={styles.tab} value={'textures' as TTabs}>
					{contentRender}
				</TabsContent>
				<TabsContent className={styles.tab} value={'NPC' as TTabs}>
					{contentRender}
				</TabsContent>
			</Tabs>
		</HiddenSidebar>
	);
}
