import { t } from 'mobx-state-tree';
import { SessionContextValue } from 'next-auth/react';

export const Profile = t
	.model('Profile', {
		expires: t.maybeNull(t.union(t.Date, t.string)),
		name: t.maybeNull(t.string),
		image: t.maybeNull(t.string),
		email: t.maybeNull(t.string),
	})
	.actions((self) => ({
		setProfile(session: SessionContextValue) {
			self.expires = new Date(session.data?.expires ?? '');

			Object.assign(self, session.data?.user);
		},
	}));
