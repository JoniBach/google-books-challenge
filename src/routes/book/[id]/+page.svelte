<script lang="ts">
	import type { BooksResponse, Volume } from '$lib';
	// Get the book data from props (which will be one of the books in the JSON list)
	const { data } = $props<{ books: BooksResponse }>();
	let book: Volume | null = $state(null);

	// On load (or whenever data changes) update the book variable
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

		<p>
			<strong>Authors:</strong>
			{#if book.volumeInfo.authors}
				{book.volumeInfo.authors.join(', ')}
			{:else}
				N/A
			{/if}
		</p>

		<p><strong>Publisher:</strong> {book.volumeInfo.publisher || 'N/A'}</p>
		<p><strong>Published Date:</strong> {book.volumeInfo.publishedDate || 'N/A'}</p>
		<p><strong>Page Count:</strong> {book.volumeInfo.pageCount || 'N/A'}</p>

		{#if book.volumeInfo.categories}
			<p><strong>Categories:</strong> {book.volumeInfo.categories.join(', ')}</p>
		{/if}

		<p><strong>Language:</strong> {book.volumeInfo.language || 'N/A'}</p>

		{#if book.volumeInfo.description}
			<div class="description">
				<strong>Description:</strong>
				<p>{book.volumeInfo.description}</p>
			</div>
		{/if}

		{#if book.volumeInfo.industryIdentifiers}
			<div class="industry-identifiers">
				<strong>Industry Identifiers:</strong>
				<ul>
					{#each book.volumeInfo.industryIdentifiers as id}
						<li>{id.type}: {id.identifier}</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="reading-modes">
			<strong>Reading Modes:</strong>
			<p>
				Text: {book.volumeInfo.readingModes?.text ? 'Yes' : 'No'}, Image: {book.volumeInfo
					.readingModes?.image
					? 'Yes'
					: 'No'}
			</p>
		</div>

		<p><strong>Print Type:</strong> {book.volumeInfo.printType || 'N/A'}</p>
		<p><strong>Maturity Rating:</strong> {book.volumeInfo.maturityRating || 'N/A'}</p>

		{#if book.volumeInfo.imageLinks}
			<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
		{/if}

		<div class="links">
			<p>
				<strong>Preview Link:</strong>
				<a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
					{book.volumeInfo.previewLink}
				</a>
			</p>
			<p>
				<strong>Info Link:</strong>
				<a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
					{book.volumeInfo.infoLink}
				</a>
			</p>
			<p>
				<strong>Canonical Link:</strong>
				<a href={book.volumeInfo.canonicalVolumeLink} target="_blank" rel="noopener noreferrer">
					{book.volumeInfo.canonicalVolumeLink}
				</a>
			</p>
		</div>

		{#if book.searchInfo?.textSnippet}
			<div class="snippet">
				<strong>Snippet:</strong>
				<p>{@html book.searchInfo.textSnippet}</p>
			</div>
		{/if}

		<!-- Additional sections for sale and access info -->
		<div class="sale-info">
			<h3>Sale Info</h3>
			<p><strong>Saleability:</strong> {book.saleInfo.saleability}</p>
			<p><strong>Ebook:</strong> {book.saleInfo.isEbook ? 'Yes' : 'No'}</p>
			{#if book.saleInfo.listPrice}
				<p>
					<strong>List Price:</strong>
					{book.saleInfo.listPrice.amount}
					{book.saleInfo.listPrice.currencyCode}
				</p>
			{/if}
		</div>

		<div class="access-info">
			<h3>Access Info</h3>
			<p><strong>Viewability:</strong> {book.accessInfo.viewability}</p>
			<p><strong>Embeddable:</strong> {book.accessInfo.embeddable ? 'Yes' : 'No'}</p>
			<p><strong>Public Domain:</strong> {book.accessInfo.publicDomain ? 'Yes' : 'No'}</p>
			<p><strong>Text-to-Speech Permission:</strong> {book.accessInfo.textToSpeechPermission}</p>
			{#if book.accessInfo.webReaderLink}
				<p>
					<strong>Web Reader Link:</strong>
					<a href={book.accessInfo.webReaderLink} target="_blank" rel="noopener noreferrer">
						{book.accessInfo.webReaderLink}
					</a>
				</p>
			{/if}
		</div>
	</div>
{:else}
	<p>Loading book details...</p>
{/if}
