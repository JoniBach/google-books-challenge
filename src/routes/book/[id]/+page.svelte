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
	<div class="book-container">
		<header class="book-header">
			<a href="/" class="back-button">← Back to Books</a>
		</header>
		<div class="book-content">
			<div class="info-section">
				<h1 class="book-title">{book.volumeInfo.title}</h1>
				{#if book.volumeInfo.subtitle}
					<h2 class="book-subtitle">{book.volumeInfo.subtitle}</h2>
				{/if}
				<p>
					<small>
						Written by {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'N/A'} –
						{book.volumeInfo.publishedDate
							? new Date(book.volumeInfo.publishedDate).toLocaleDateString()
							: 'N/A'}
					</small>
				</p>
				<p><small>Published by {book.volumeInfo.publisher || 'N/A'}</small></p>
				{#if book.searchInfo?.textSnippet}
					<div class="snippet">
						<strong>Snippet:</strong>
						<p>{@html book.searchInfo.textSnippet}</p>
					</div>
				{/if}
				<div class="links">
					<a
						href={book.volumeInfo.previewLink}
						target="_blank"
						rel="noopener noreferrer"
						class="btn">Preview</a
					>
					<a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer" class="btn"
						>More Info</a
					>
					<a
						href={book.volumeInfo.canonicalVolumeLink}
						target="_blank"
						rel="noopener noreferrer"
						class="btn">Canonical</a
					>
				</div>
				{#if book.volumeInfo.description}
					<div class="description">
						<h3>Description</h3>
						<p>{book.volumeInfo.description}</p>
					</div>
				{/if}
			</div>

			<div class="cover-section">
				{#if book.volumeInfo.imageLinks}
					<img
						class="book-cover"
						src={book.volumeInfo.imageLinks.thumbnail}
						alt={book.volumeInfo.title}
					/>
				{/if}
				<div class="book-extra">
					{#if book.volumeInfo.industryIdentifiers}
						<div class="industry-identifiers">
							<ul>
								{#each book.volumeInfo.industryIdentifiers as id}
									<li>{id.type}: {id.identifier}</li>
								{/each}
							</ul>
						</div>
					{/if}
					<p><strong>Page Count:</strong> {book.volumeInfo.pageCount || 'N/A'}</p>
					{#if book.volumeInfo.categories}
						<p><strong>Categories:</strong> {book.volumeInfo.categories.join(', ')}</p>
					{/if}
					<p><strong>Language:</strong> {book.volumeInfo.language || 'N/A'}</p>
					<p>
						<strong>Reading Modes:</strong>
						Text: {book.volumeInfo.readingModes?.text ? 'Yes' : 'No'}, Image: {book.volumeInfo
							.readingModes?.image
							? 'Yes'
							: 'No'}
					</p>
					<p><strong>Print Type:</strong> {book.volumeInfo.printType || 'N/A'}</p>
					<p><strong>Maturity Rating:</strong> {book.volumeInfo.maturityRating || 'N/A'}</p>
				</div>
			</div>
		</div>
	</div>
{:else}
	<p>Loading book details...</p>
{/if}

<style>
	.book-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 20px;
		font-family: Arial, sans-serif;
		background-color: #fff;
		color: #333;
	}
	.book-header {
		margin-bottom: 20px;
	}
	.back-button {
		text-decoration: none;
		color: #4285f4;
		font-size: 16px;
	}
	.book-content {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	.info-section {
		flex: 2 1 400px;
	}
	.book-title {
		font-size: 28px;
		margin: 0 0 10px;
	}
	.book-subtitle {
		font-size: 20px;
		margin: 0 0 15px;
		color: #555;
	}
	.info-section p {
		margin: 8px 0;
		line-height: 1.5;
	}
	.snippet p {
		font-size: 14px;
		line-height: 1.5;
		color: #555;
	}
	.links {
		margin: 15px 0;
	}
	.links .btn {
		display: inline-block;
		padding: 8px 16px;
		margin-right: 10px;
		background-color: #4285f4;
		color: #fff;
		text-decoration: none;
		border-radius: 4px;
		font-size: 14px;
		transition: background-color 0.2s ease-in-out;
	}
	.links .btn:hover {
		background-color: #3367d6;
	}
	.description {
		margin-top: 20px;
	}
	.description h3 {
		margin-bottom: 10px;
		font-size: 18px;
	}
	.cover-section {
		flex: 1 1 250px;
		text-align: center;
	}
	.book-cover {
		max-width: 100%;
		border: 1px solid #ddd;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		margin-bottom: 15px;
	}
	.book-extra p,
	.book-extra ul {
		font-size: 14px;
		margin: 4px 0;
		color: #555;
		text-align: left;
		padding: 0 10px;
	}
	.industry-identifiers ul {
		list-style: none;
		text-align: left;
	}
	.industry-identifiers li {
		margin: 2px 0;
	}
</style>
