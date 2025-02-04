// Mock dataset captured from Google Books API using Postman: https://www.googleapis.com/books/v1/volumes?q=cats&orderBy=newest
// Interfaces generated using a popular LLM and reviewed for accuracy.
// Google Books API is a public resource and contains no sensitive information.

export interface BooksResponse {
	kind: string;
	totalItems: number;
	items: Volume[];
}

export interface Volume {
	kind: string;
	id: string;
	etag: string;
	selfLink: string;
	volumeInfo: VolumeInfo;
	saleInfo: SaleInfo;
	accessInfo: AccessInfo;
	searchInfo?: SearchInfo;
}

export interface VolumeInfo {
	title: string;
	subtitle?: string;
	authors: string[];
	publisher?: string;
	publishedDate: string;
	description?: string;
	industryIdentifiers?: IndustryIdentifier[];
	readingModes: ReadingModes;
	pageCount?: number;
	printType: string;
	categories?: string[];
	maturityRating: string;
	allowAnonLogging: boolean;
	contentVersion: string;
	panelizationSummary: PanelizationSummary;
	imageLinks: ImageLinks;
	language: string;
	previewLink: string;
	infoLink: string;
	canonicalVolumeLink: string;
	averageRating?: number;
	ratingsCount?: number;
}

export interface IndustryIdentifier {
	type: string;
	identifier: string;
}

export interface ReadingModes {
	text: boolean;
	image: boolean;
}

export interface PanelizationSummary {
	containsEpubBubbles: boolean;
	containsImageBubbles: boolean;
}

export interface ImageLinks {
	smallThumbnail: string;
	thumbnail: string;
}

export interface SaleInfo {
	country: string;
	saleability: string;
	isEbook: boolean;
	listPrice?: Price;
	retailPrice?: Price;
	buyLink?: string;
	offers?: Offer[];
}

export interface Price {
	amount: number;
	currencyCode: string;
}

export interface Offer {
	finskyOfferType: number;
	listPrice: PriceMicros;
	retailPrice: PriceMicros;
	giftable: boolean;
}

export interface PriceMicros {
	amountInMicros: number;
	currencyCode: string;
}

export interface AccessInfo {
	country: string;
	viewability: string;
	embeddable: boolean;
	publicDomain: boolean;
	textToSpeechPermission: string;
	epub: Epub;
	pdf: Pdf;
	webReaderLink: string;
	accessViewStatus: string;
	quoteSharingAllowed: boolean;
}

export interface Epub {
	isAvailable: boolean;
	acsTokenLink?: string;
}

export interface Pdf {
	isAvailable: boolean;
	acsTokenLink?: string;
}

export interface SearchInfo {
	textSnippet: string;
}
