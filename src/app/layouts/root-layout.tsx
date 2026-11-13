import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../styles/globals.css';
import { Header } from '@/widgets/header';

import { Providers } from '../providers';

export const metadata: Metadata = {
	title: 'DnD',
	description: '',
};

/** Общий каркас всех страниц: провайдеры, шапка и область контента. */
export function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="ru" style={{ scrollBehavior: 'smooth' }} data-theme="dark">
			<body>
				<div className="root" style={{ display: 'contents' }}>
					<Providers>
						<Header />
						<main>{children}</main>
					</Providers>
				</div>
			</body>
		</html>
	);
}
