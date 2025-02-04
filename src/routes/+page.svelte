<script lang="ts">
	import type { BooksResponse, Volume } from '$lib';

	const { data } = $props<{ books: BooksResponse }>();

	let books: Volume[] = $state([]);
	async function handleFetchData() {
		books = data?.books?.items;
	}
	$effect(() => {
		handleFetchData();
	});

	$effect(() => {
		console.log(books);
	});
</script>

{#if data?.books}
	{#if data.books.totalItems > 0}
		{#each books as book}
			{#if book?.volumeInfo}
				<div>
					<h2>{book.volumeInfo.title}</h2>
					<p>{book.volumeInfo.authors}</p>
					<p>{book.volumeInfo.publishedDate}</p>
					<p>{book.volumeInfo.description}</p>
					<a href="book/{book.id}">View</a>
				</div>
			{/if}
		{/each}
	{:else}
		<p>No books found.</p>
	{/if}
{:else}
	<p>Loading...</p>
{/if}
