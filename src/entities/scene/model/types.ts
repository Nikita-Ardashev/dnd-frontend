import { SnapshotIn } from 'mobx-state-tree';
import { SceneModel } from './scene-models.model';
import { SceneCube } from './scene-cube.model';

export type TSnapshotSceneModel = SnapshotIn<typeof SceneModel>;

export type TSnapshotSceneCube = SnapshotIn<typeof SceneCube>;
