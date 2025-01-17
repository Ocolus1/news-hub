import React from 'react';
import { X, Link, Twitter, Facebook, Linkedin } from 'lucide-react';
import type { Article } from '../types';

interface ShareModalProps {
	article: Article;
	onClose: () => void;
}

export function ShareModal({ article, onClose }: ShareModalProps) {
	const shareUrl = article.url;
	const shareText = `Check out this article: ${article.title}`;

	const shareLinks = {
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
			shareUrl
		)}&text=${encodeURIComponent(shareText)}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
			shareUrl
		)}`,
		linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
			shareUrl
		)}&title=${encodeURIComponent(article.title)}`,
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			// You could add a toast notification here
			console.log('URL copied to clipboard');
		} catch (err) {
			console.error('Failed to copy URL:', err);
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<div
				className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						Share Article
					</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="space-y-4">
					<div className="flex justify-center space-x-6">
						<a
							href={shareLinks.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
							aria-label="Share on Twitter"
						>
							<Twitter className="w-6 h-6 text-[#1DA1F2]" />
						</a>
						<a
							href={shareLinks.facebook}
							target="_blank"
							rel="noopener noreferrer"
							className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
							aria-label="Share on Facebook"
						>
							<Facebook className="w-6 h-6 text-[#4267B2]" />
						</a>
						<a
							href={shareLinks.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
							aria-label="Share on LinkedIn"
						>
							<Linkedin className="w-6 h-6 text-[#0077B5]" />
						</a>
					</div>

					<div className="flex items-center space-x-2">
						<input
							type="text"
							value={shareUrl}
							readOnly
							className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
						/>
						<button
							onClick={copyToClipboard}
							className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
							aria-label="Copy link to clipboard"
						>
							<Link className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
