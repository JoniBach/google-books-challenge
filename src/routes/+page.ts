import type { PageLoad } from './$types';
import type { BooksResponse } from '$lib';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const booksResponse: Response = await fetch('/data/books/volumes.json');
		if (!booksResponse.ok) {
			console.log('error', booksResponse);
		}

		const booksData: BooksResponse = await booksResponse.json();

		return {
			books: booksData
		};
	} catch {
		return {
			status: 500,
			error: new Error('Failed to get books')
		};
	}
};
