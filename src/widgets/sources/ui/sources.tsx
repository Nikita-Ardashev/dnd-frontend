'use client';
import styles from './sources.module.sass';
import { Tile } from '@/shared/ui/tile';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { MOCK_SOURCES, TSourceTab } from '../model/mock-sources';
import { Input } from '@/shared/ui/input';
import { HiddenSidebar } from '@/shared/ui/hidden-sidebar';

export function Sources() {
	const [activeTab, setActiveTab] = useState<TSourceTab>('all');

	const filteredContent = MOCK_SOURCES.filter((item) => {
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
				defaultValue={'all' as TSourceTab}
				onValueChange={(value) => setActiveTab(value as TSourceTab)}
				className={styles.tabs}
			>
				<TabsList>
					<TabsTrigger value={'all' as TSourceTab}>Все</TabsTrigger>
					<TabsTrigger value={'textures' as TSourceTab}>Текстуры</TabsTrigger>
					<TabsTrigger value={'models' as TSourceTab}>Модели</TabsTrigger>
					<TabsTrigger value={'NPC' as TSourceTab}>НПС</TabsTrigger>
				</TabsList>
				<TabsContent className={styles.tab} value={'all' as TSourceTab}>
					{contentRender}
				</TabsContent>
				<TabsContent className={styles.tab} value={'models' as TSourceTab}>
					{contentRender}
				</TabsContent>
				<TabsContent className={styles.tab} value={'textures' as TSourceTab}>
					{contentRender}
				</TabsContent>
				<TabsContent className={styles.tab} value={'NPC' as TSourceTab}>
					{contentRender}
				</TabsContent>
			</Tabs>
		</HiddenSidebar>
	);
}
