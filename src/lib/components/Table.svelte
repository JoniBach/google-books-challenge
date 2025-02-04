<script lang="ts">
	/**
	 * @module Table
	 * @description
	 * A responsive data table component built with Svelte 5 and TypeScript.
	 * It supports sorting, pagination, searching, and nested data formatting.
	 *
	 * @example
	 * <Table
	 *   columns={columns}
	 *   data={data}
	 *   totalRows={totalRows}
	 *   currentPage={currentPage}
	 *   rowsPerPage={rowsPerPage}
	 *   sortBy={sortBy}
	 *   sortDirection={sortDirection}
	 *   searchQuery={searchQuery}
	 *   pageChange={handlePageChange}
	 *   sortChange={handleSortChange}
	 *   searchChange={handleSearchChange}
	 *   rowClick={handleRowClick}
	 * />
	 */

	// Import a date formatter from date-fns.
	import { format } from 'date-fns';
	import type { Column, Row } from '$lib/types';

	/**
	 * Props type for the Table component.
	 */
	type TableProps = {
		columns: Column[];
		data: Row[];
		totalRows: number;
		currentPage: number;
		rowsPerPage: number;
		sortBy: string;
		sortDirection: 'asc' | 'desc';
		/** The search query; this prop is bindable. */
		searchQuery: string;
		/** Callback triggered when the page changes. */
		pageChange: (page: number) => void;
		/** Callback triggered when the sort criteria changes. */
		sortChange: (sortBy: string, direction: 'asc' | 'desc') => void;
		/** Callback triggered when the search query changes. */
		searchChange: (query: string) => void;
		/** Callback triggered when a row is clicked. */
		rowClick: (row: Row) => void;
	};

	// Destructure our props via $props(), and make searchQuery bindable.
	let {
		columns,
		data,
		totalRows,
		currentPage,
		rowsPerPage,
		sortBy,
		sortDirection,
		searchQuery = $bindable(''),
		pageChange,
		sortChange,
		searchChange,
		rowClick
	}: TableProps = $props();

	/**
	 * Retrieves a nested value from an object using a dot-separated path.
	 *
	 * @param {Row} row - The row object from which to extract the value.
	 * @param {string} path - A dot-separated path (e.g., "user.name").
	 * @returns {any} The value found at the given path, or undefined if not found.
	 */
	function getNestedValue(row: Row, path: string): any {
		return path.split('.').reduce((acc, part) => acc && acc[part], row);
	}

	/**
	 * Formats a cell value based on its type.
	 *
	 * @param {any} value - The value to be formatted.
	 * @param {string} [type] - The type of the cell value (e.g., "date", "number").
	 * @returns {string} The formatted value as a string.
	 */
	function formatCell(value: any, type?: string): string {
		if (value == null) return '';
		switch (type) {
			case 'date': {
				const date = new Date(value);
				return isNaN(date.getTime()) ? String(value) : format(date, 'dd/MM/yyyy');
			}
			case 'number':
				return new Intl.NumberFormat().format(value);
			default:
				return String(value);
		}
	}

	/**
	 * Handles sorting when a column header is clicked.
	 * If the column is sortable, toggles the sort direction and calls the sortChange callback.
	 *
	 * @param {Column} column - The column that was clicked.
	 */
	function handleSort(column: Column): void {
		if (!column.sortable) return;
		const newDirection = column.id === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
		sortChange(column.id, newDirection);
	}

	/**
	 * Handles the search input event.
	 * Calls the searchChange callback with the new search query.
	 *
	 * @param {Event} event - The input event object.
	 */
	function handleSearch(event: Event): void {
		const input = event.target as HTMLInputElement;
		searchChange(input.value);
	}
</script>

<div class="search-container">
	<input
		type="text"
		class="search-input"
		placeholder="Search..."
		oninput={handleSearch}
		value={searchQuery}
	/>
</div>

<table class="data-table">
	<thead class="data-table__head">
		<tr class="data-table__row data-table__row--head">
			{#each columns as column}
				<th class="data-table__header" onclick={() => handleSort(column)}>
					{column.label}
					{#if column.sortable}
						<span class="data-table__sort-indicator">
							{#if column.id === sortBy}
								{sortDirection === 'asc' ? '▲' : '▼'}
							{/if}
						</span>
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class="data-table__body">
		{#each data as row}
			<tr class="data-table__row" onclick={() => rowClick(row)}>
				{#each columns as column}
					<td class="data-table__cell" data-label={column.label}>
						{#if column.type === 'link'}
							<a
								class="data-table__link"
								href={formatCell(getNestedValue(row, column.id), 'text')}
								target="_blank"
								rel="noopener noreferrer"
							>
								{getNestedValue(row, column.linkField ?? column.id)}
							</a>
						{:else if column.type === 'image'}
							<img
								class="data-table__image"
								src={formatCell(getNestedValue(row, column.id), 'text')}
								alt={column.altTextField ? getNestedValue(row, column.altTextField) : ''}
							/>
						{:else}
							{formatCell(getNestedValue(row, column.id), column.type)}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<div class="pagination-controls">
	<button
		class="pagination-controls__button"
		onclick={() => pageChange(currentPage - 1)}
		disabled={currentPage === 1}
	>
		Previous
	</button>
	<span class="pagination-controls__info">
		Page {currentPage} of {Math.ceil(totalRows / rowsPerPage)}
	</span>
	<button
		class="pagination-controls__button"
		onclick={() => pageChange(currentPage + 1)}
		disabled={currentPage >= Math.ceil(totalRows / rowsPerPage)}
	>
		Next
	</button>
</div>

<style>
	.search-container {
		display: block;
		width: 100%;
		margin-bottom: 1rem;
		text-align: right;
	}

	.search-input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		box-sizing: border-box;
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}
	.data-table__head {
		background: #f0f0f0;
	}
	.data-table__header,
	.data-table__cell {
		padding: 8px;
		text-align: left;
		border: 1px solid #ddd;
		cursor: pointer;
	}
	.data-table__sort-indicator {
		margin-left: 4px;
		font-size: 0.8rem;
		color: #555;
	}
	.data-table__link {
		color: blue;
		text-decoration: none;
	}
	.data-table__link:hover {
		text-decoration: underline;
	}
	.data-table__image {
		max-height: 50px;
	}

	.pagination-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
		gap: 1rem;
	}
	.pagination-controls__button {
		padding: 0.5rem 1rem;
		background: #0070f3;
		color: #fff;
		border: none;
		cursor: pointer;
	}
	.pagination-controls__button:disabled {
		background: #ccc;
		cursor: not-allowed;
	}
	.pagination-controls__info {
		font-size: 0.9rem;
	}

	/* Responsive styling for small screens */
	@media screen and (max-width: 600px) {
		.data-table,
		.data-table__head,
		.data-table__body,
		.data-table__header,
		.data-table__cell,
		.data-table__row {
			display: block;
		}
		.data-table__head .data-table__row--head {
			display: none;
		}
		.data-table__body .data-table__row {
			margin-bottom: 1rem;
			border: 1px solid #ddd;
			padding: 0.5rem;
		}
		.data-table__cell {
			display: flex;
			justify-content: space-between;
			padding: 4px 8px;
			border: none;
			border-bottom: 1px solid #ddd;
			position: relative;
		}
		.data-table__cell:before {
			content: attr(data-label);
			font-weight: bold;
			flex-basis: 40%;
		}
		.data-table__cell:last-child {
			border-bottom: 0;
		}
	}
</style>
