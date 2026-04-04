import type { Metadata } from 'next';
import '@app/styles/globals.css';
import { Header } from '@/widgets/header';
import { Providers } from '@/app/providers/providers';

export const metadata: Metadata = {
	title: 'DnD',
	description: '',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
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
