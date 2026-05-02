'use client';

import { observer } from 'mobx-react-lite';
import { useStoreScene } from '@/shared/lib/mst/hooks';
import { Toolbar } from '@/shared/ui/toolbar';
import Image from 'next/image';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';
import {
	Tooltip,
	TooltipArrow,
	TooltipPopup,
	TooltipPortal,
	TooltipPositioner,
	TooltipTrigger,
} from '@/shared/ui/tooltip';

export const ToolbarScene = observer(function ToolbarScene() {
	const { tools, isEditable } = useStoreScene();
	const toolsRender = tools.getTools.map(
		(t, i) =>
			t.isAvailableUse &&
			isEditable && (
				<Tooltip key={`${t.name}_${t.id}_${i}`}>
					<TooltipTrigger
						render={
							<ToggleGroupItem
								onClick={(e) => {
									console.log(e);
									tools.setCurrent(t.id);
								}}
							>
								<Image
									src={t.iconURL}
									alt={t.name}
									width={32}
									height={32}
									priority
								/>
							</ToggleGroupItem>
						}
					/>
					<TooltipPortal>
						<TooltipPositioner side="top" sideOffset={8}>
							<TooltipPopup>
								<TooltipArrow />
								{t.name}
							</TooltipPopup>
						</TooltipPositioner>
					</TooltipPortal>
				</Tooltip>
			),
	);
	return (
		<Toolbar>
			<ToggleGroup>{toolsRender}</ToggleGroup>
		</Toolbar>
	);
});
