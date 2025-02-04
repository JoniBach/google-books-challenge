<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BooksResponse, Volume } from '$lib';
	import Table from '$lib/components/Table.svelte';
	import type { Column } from '$lib/types';

	// Extract props using $props.
	const { data } = $props<{ books: BooksResponse }>();

	const columns: Column[] = [
		{
			id: 'volumeInfo.title',
			label: 'Title',
			type: 'text',
			sortable: true
		},
		{ id: 'volumeInfo.authors', label: 'Authors', type: 'text', sortable: false },
		{ id: 'volumeInfo.publishedDate', label: 'Published Date', type: 'date', sortable: true },
		{
			id: 'volumeInfo.imageLinks.thumbnail',
			label: 'Thumbnail',
			type: 'image',
			altTextField: 'volumeInfo.title'
		}
	];

	let books = $state([]);
	let currentPage = $state(1);
	let rowsPerPage = $state(10);
	let totalRows = $state(0);
	let sortBy = $state('volumeInfo.publishedDate');
	let sortDirection: 'asc' | 'desc' = $state('desc');
	let searchQuery = $state('cats');

	async function handleFetchData() {
		books = data?.books?.items || [];
		totalRows = data?.books?.totalItems || 0;
	}

	function handlePageChange(page: number) {
		currentPage = page;
		handleFetchData();
	}

	function handleSearchChange(query: string) {
		searchQuery = query;
		handleFetchData();
	}

	function handleSortChange(column: string, direction: 'asc' | 'desc') {
		sortBy = column;
		sortDirection = direction;
		console.log(`Sorting by ${column}, direction: ${direction}`);
		handleFetchData();
	}

	function handleRowClick(row: any) {
		console.log('Row clicked:', row as Volume);
		goto(`/book/${row.id}`);
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
			{currentPage}
			{rowsPerPage}
			{sortBy}
			{sortDirection}
			{searchQuery}
			{totalRows}
			pageChange={handlePageChange}
			sortChange={handleSortChange}
			searchChange={handleSearchChange}
			rowClick={handleRowClick}
		/>
	{:else}
		<p>No books found.</p>
	{/if}
{:else}
	<p>Loading...</p>
{/if}
