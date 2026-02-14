import type { Metadata } from 'next';
import '@app/styles/global.sass';
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
		<html lang="ru" style={{ scrollBehavior: 'smooth' }}>
			<body>
				<Providers>
					<Header />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
