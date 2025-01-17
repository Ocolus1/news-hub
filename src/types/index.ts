export interface Article {
	id: string;
	title: string;
	description: string;
	source: string;
	category: string;
	url: string;
	imageUrl: string;
	publishedAt: string;
}

export type Category =
	| 'all'
	| 'world'
	| 'nation'
	| 'business'
	| 'technology'
	| 'entertainment'
	| 'sports'
	| 'science'
	| 'health';

export interface User {
	preferences: {
		categories: Category[];
		darkMode: boolean;
		fontSize: 'small' | 'medium' | 'large';
		language: string;
	};
}

// interface Source {
// 	name: string;
// }

export interface NewsApiResponse {
	articles: Article[];
	totalArticles?: number;
}

export interface NewsletterSubscription {
	email: string;
	categories: Category[];
	frequency: 'daily' | 'weekly';
}
