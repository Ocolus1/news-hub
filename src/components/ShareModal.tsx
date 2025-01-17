import { X as CloseIcon, Link, Linkedin } from 'lucide-react';
import type { Article } from '../types';

interface ShareModalProps {
	article: Article;
	onClose: () => void;
}

// Custom X (Twitter) logo component
function XLogo() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function ShareModal({ article, onClose }: ShareModalProps) {
	const shareUrl = article.url;
	const shareText = `Check out this article: ${article.title}`;

	const shareLinks = {
		x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
			shareUrl
		)}&text=${encodeURIComponent(shareText)}`,
		linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
			shareUrl
		)}&title=${encodeURIComponent(article.title)}`,
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			console.log('URL copied to clipboard');
		} catch (err) {
			console.error('Failed to copy URL:', err);
		}
	};

	const handleShareClick = (platform: string, url: string) => {
		window.open(
			url,
			`Share on ${platform}`,
			'width=600,height=400,location=0,menubar=0'
		);
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
						<CloseIcon className="w-5 h-5" />
					</button>
				</div>

				<div className="space-y-4">
					<div className="flex justify-center space-x-6">
						<button
							onClick={() => handleShareClick('X', shareLinks.x)}
							className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
							aria-label="Share on X"
						>
							<XLogo />
						</button>
						<button
							onClick={() =>
								handleShareClick(
									'LinkedIn',
									shareLinks.linkedin
								)
							}
							className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
							aria-label="Share on LinkedIn"
						>
							<Linkedin className="w-6 h-6 text-[#0077B5]" />
						</button>
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
