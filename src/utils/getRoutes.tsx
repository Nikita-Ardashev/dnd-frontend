import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import path from 'path';
import Link from 'next/link';

async function getRoutes() {
	try {
		const appDirectory = path.join(process.cwd(), 'src/app');
		const routes = await getRoutesFromFiles(appDirectory);
		routes.toSorted();
		return NextResponse.json({ routes });
	} catch (error) {
		console.error('Error fetching routes:', error);
		return NextResponse.json(
			{ error: `Failed to fetch routes: ${error}` },
			{ status: 500 },
		);
	}
}

async function getRoutesFromFiles(directory: string, prefix = ''): Promise<string[]> {
	const routes = await readdir(directory, { withFileTypes: true });
	const parsedRoutes: string[] = [];

	for (const route of routes) {
		if (
			route.name.startsWith('_') ||
			route.name.startsWith('.') ||
			route.name === 'api'
		) {
			continue;
		}
		const regexGroupRoute = /[()\[\]]/;
		const isGroupRoute = regexGroupRoute.test(route.name.trim());

		const routePath = isGroupRoute ? '' : '/' + route.name;

		const routeName = prefix ? prefix + routePath : `${routePath}`;
		if (route.isDirectory()) {
			const subRoutes = await getRoutesFromFiles(
				path.join(directory, route.name),
				routeName,
			);
			parsedRoutes.push(...subRoutes);
		} else if (route.name === 'page.tsx' || route.name === 'page.js') {
			const cleanRoute = routeName
				.replace(/\/page\.(tsx|js)$/, '')
				.replace(/\\/g, '/');

			parsedRoutes.push(cleanRoute === '' ? '/' : cleanRoute);
		}
	}

	return parsedRoutes;
}

const Links = async () =>
	((await (await getRoutes()).json()) as { routes: string[] }).routes
		.sort((a, b) => a.localeCompare(b))
		.map((r, i) => (
			<Link key={i + r} href={r}>
				{r}
			</Link>
		));

export { Links, getRoutes };
