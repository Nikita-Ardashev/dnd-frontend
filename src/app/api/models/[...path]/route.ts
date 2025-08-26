// src/app/api/models/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface IYandexResponseFile {
	method: string;
	href: string;
	templated: boolean;
}

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	try {
		const path = (await params).path.join('/');
		const targetUrl = `${process.env.SRC_MODELS}/${path}`;
		const oauthToken = process.env.YANDEX_TOKEN;

		// Загружаем файл с Яндекс Диска
		const response = await fetch(targetUrl, {
			headers: {
				Authorization: `OAuth ${oauthToken}`,
				Accept: '*/*',
			},
		});

		if (!response.ok) {
			throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
		}

		const body = (await response.json()) as IYandexResponseFile;

		const file = await fetch(body.href, {
			headers: {
				Authorization: `OAuth ${oauthToken}`,
				Accept: '*/*',
			},
		});

		if (!file.ok) {
			throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
		}

		// Получаем данные файла
		const fileBuffer = await file.arrayBuffer();
		const contentType =
			response.headers.get('content-type') || 'application/octet-stream';

		// Возвращаем файл с правильными заголовками
		return new NextResponse(fileBuffer, {
			status: 200,
			headers: {
				'Content-Type': contentType,
				'Content-Disposition': `inline; filename="${path.split('/').pop()}"`,
				'Cache-Control': 'public, max-age=3600', // Кэширование на 1 час
			},
		});
	} catch (error) {
		console.error('Ошибка при проксировании файла:', error);
		return NextResponse.json({ error: 'Ошибка при загрузке файла' }, { status: 500 });
	}
}
