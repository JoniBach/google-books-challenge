<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BooksResponse, Volume } from '$lib';

	import Table from '$lib/components/Table.svelte';

	const { data } = $props<{ books: BooksResponse }>();

	const columns = [
		{ id: 'volumeInfo.title', label: 'Title' },
		{ id: 'volumeInfo.authors', label: 'Authors' },
		{ id: 'volumeInfo.publishedDate', label: 'Published Date' }
	];

	let books = $state([]);
	let sortBy = $state('volumeInfo.publishedDate');
	let sortDirection: 'asc' | 'desc' = $state('desc');
	let searchQuery = $state('cats');

	async function handleFetchData() {
		books = data?.books?.items ?? [];
	}

	function handleSortChange(column: string, direction: 'asc' | 'desc') {
		sortBy = column;
		sortDirection = direction;
		handleFetchData();
	}

	function handleRowClick(row: any) {
		console.log('Row clicked:', row as Volume);
		goto(`/book/${row.id}`);
	}

	function handleSearchChange(query: string) {
		searchQuery = query;
		handleFetchData();
	}

	$effect(() => {
		handleFetchData();
	});
</script>

{#if data?.books}
	{#if data.books.totalItems > 0}
		<Table
			{columns}
			data={books}
			{sortBy}
			{sortDirection}
			{searchQuery}
			onSortChange={handleSortChange}
			onRowClick={handleRowClick}
			onSearchChange={handleSearchChange}
		/>
	{:else}
		<p>No books found.</p>
	{/if}
{:else}
	<p>Loading...</p>
{/if}
