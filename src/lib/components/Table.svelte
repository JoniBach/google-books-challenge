<script lang="ts">
	export let columns: { id: string; label: string }[] = [];
	export let data: { [key: string]: any }[] = [];
	export let sortBy: string = '';
	export let sortDirection: 'asc' | 'desc' = 'asc';
	export let searchQuery: string = '';
	export let onSortChange: (sortBy: string, direction: 'asc' | 'desc') => void = () => {};
	export let onRowClick: (row: any) => void = () => {};
	export let onSearchChange: (query: string) => void = () => {};

	function handleSort(columnId: string) {
		const newDirection = columnId === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
		onSortChange(columnId, newDirection);
	}

	function getNestedValue(obj: any, path: string): any {
		return path.split('.').reduce((acc, key) => (acc && acc[key] != null ? acc[key] : ''), obj);
	}
	function handleSearch(event: Event): void {
		const input = event.target as HTMLInputElement;
		onSearchChange(input.value);
	}
</script>

<div class="search-container">
	<input
		type="text"
		class="search-input"
		placeholder="Search..."
		on:input={handleSearch}
		value={searchQuery}
	/>
</div>
<table>
	<thead>
		<tr>
			{#each columns as column}
				<th on:click={() => handleSort(column.id)}>
					{column.label}
					{#if column.id === sortBy}
						{sortDirection === 'asc' ? '▲' : '▼'}
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<tr on:click={() => onRowClick(row)}>
				{#each columns as column}
					<td>{getNestedValue(row, column.id)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.search-container {
		display: block;
		width: 100%;
		text-align: right;
	}

	.search-input {
		width: 100%;
		padding: 0.5rem;
		box-sizing: border-box;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
		font-size: 14px;
	}
	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: left;
	}
	th {
		cursor: pointer;
		background: #f0f0f0;
	}
	th:hover {
		background: #e0e0e0;
	}
</style>
