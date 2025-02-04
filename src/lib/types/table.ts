export interface Column {
	id: string;
	label: string;
	type?: 'date' | 'text' | 'number' | 'link' | 'image';
	sortable?: boolean;
	linkField?: string;
	altTextField?: string;
}

// todo: replace any with a more specific type
export type Row = Record<string, any>;
