import { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce.ts';

interface HeaderProps {
	darkMode: boolean;
	onToggleDarkMode: () => void;
	onSearch: (query: string) => void;
}

export function Header({ darkMode, onToggleDarkMode, onSearch }: HeaderProps) {
	const [searchValue, setSearchValue] = useState('');
	const debouncedSearch = useDebounce(searchValue, 500);
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		onSearch(debouncedSearch);
	}, [debouncedSearch, onSearch]);

	const handleClearSearch = () => {
		setSearchValue('');
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};

	return (
		<header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<h1 className="text-xl font-bold text-gray-900 dark:text-white">
						NewsHub
					</h1>

					<div className="flex-1 max-w-xl mx-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								ref={searchInputRef}
								type="search"
								placeholder="Search news..."
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-blue-500 dark:text-white"
							/>
							{searchValue && (
								<button
									onClick={handleClearSearch}
									className="absolute right-3 top-1/2 transform -translate-y-1/2"
								>
									<X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
								</button>
							)}
						</div>
					</div>

					<button
						onClick={onToggleDarkMode}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
					>
						{darkMode ? (
							<Sun className="w-6 h-6 text-gray-300" />
						) : (
							<Moon className="w-6 h-6 text-gray-600" />
						)}
					</button>
				</div>
			</div>
		</header>
	);
}
