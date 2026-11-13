import { SnapshotIn } from 'mobx-state-tree';

import { MCubeMesh, MModelInternalMesh } from '@/entities/mesh/@x/scene';

export type TSnapshotSceneModel = SnapshotIn<typeof MModelInternalMesh>;

export type TSnapshotSceneCube = SnapshotIn<typeof MCubeMesh>;
