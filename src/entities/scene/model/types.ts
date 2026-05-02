import { MCubeMesh, MModelInternalMesh } from '@/entities/mesh/@x/scene';
import { SnapshotIn } from 'mobx-state-tree';

export type TSnapshotSceneModel = SnapshotIn<typeof MModelInternalMesh>;

export type TSnapshotSceneCube = SnapshotIn<typeof MCubeMesh>;
