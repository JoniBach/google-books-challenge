<script lang="ts">
	import type { BooksResponse, Volume } from '$lib';
	const { data } = $props<{ books: BooksResponse }>();
	let book: Volume | null = $state(null);

	async function handleFetchData() {
		book = data?.book;
	}
	$effect(() => {
		handleFetchData();
	});
</script>

{#if book}
	<a href="/" class="back-button">Back to Books</a>
	<div class="book-details">
		<h1>{book.volumeInfo.title}</h1>

		{#if book.volumeInfo.subtitle}
			<h2>{book.volumeInfo.subtitle}</h2>
		{/if}
	</div>
{:else}
	<p>Loading book details...</p>
{/if}
