import { t } from 'mobx-state-tree';

export const MUrlOrCache = t
	.model('UrlOrCache', {
		url: t.string,
		cacheUrl: t.maybeNull(t.string),
	})
	.views((self) => ({
		get getSource() {
			return !!self.cacheUrl ? self.cacheUrl : self.url;
		},
	}))
	.actions((self) => ({
		setCacheUrl(url: string) {
			self.cacheUrl = url;
		},
		setUrl(url: string) {
			self.url = url;
		},
	}));
