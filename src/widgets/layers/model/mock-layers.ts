export interface ILayer {
	name: string;
	isActive: boolean;
	layersChildren: ILayer[];
}

export const MOCK_LAYERS: ILayer[] = [
	{
		name: 'Layer 1',
		isActive: true,
		layersChildren: [
			{
				name: 'Sub Layer 1',
				isActive: true,
				layersChildren: [],
			},
			{
				name: 'Sub Layer 2',
				isActive: false,
				layersChildren: [],
			},
		],
	},
	{
		name: 'Layer 2',
		isActive: false,
		layersChildren: [],
	},
];
