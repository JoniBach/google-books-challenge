import type { PageLoad } from './$types';
import type { BooksResponse } from '$lib';

export const load: PageLoad = async ({ params, fetch }) => {
	const { id } = params;

	try {
		const booksResponse: Response = await fetch('/data/books/volumes.json');
		const booksData: BooksResponse = await booksResponse.json();

		const book = booksData.items.find((item) => {
			return item.id === id;
		});

		if (!book) {
			return {
				status: 404,
				error: new Error('Book not found')
			};
		}

		return {
			book
		};
	} catch {
		return {
			status: 500,
			error: new Error('Failed to load book data')
		};
	}
};
