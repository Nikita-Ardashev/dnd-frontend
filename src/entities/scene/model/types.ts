import { SnapshotIn } from 'mobx-state-tree';
import { MModelInternalMesh } from './construct/scene-models.model';
import { MCubeMesh } from './construct/scene-cube.model';

export type TSnapshotSceneModel = SnapshotIn<typeof MModelInternalMesh>;

export type TSnapshotSceneCube = SnapshotIn<typeof MCubeMesh>;
