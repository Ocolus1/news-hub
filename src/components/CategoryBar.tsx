import React from 'react';
import { Category } from '../types';

interface CategoryBarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

// Updated categories to match GNews API topics
const categories: Category[] = ['all', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

export function CategoryBar({ selectedCategory, onSelectCategory }: CategoryBarProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 overflow-x-auto py-3 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}