
"use client";
import React, { useState } from 'react';
import { ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface CategoryData {
  icon: string;
  subcategories: string[];
}

interface Categories {
  [key: string]: CategoryData;
}

interface CategoryMenuProps {
  width?: string;
  position?: string;
}

const Menubar: React.FC<CategoryMenuProps> = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});



  const toggleCategory = (category: string): void => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };


  const categories: Categories = {
    'New Arrival': {
      icon: '🆕',
      subcategories: ['Sneakers', 'Outfits']
    },
    'Sneakers': {
      icon: '👟',
      subcategories: [
        'Dior',
        'McQueen',
        'Onitsuka Tiger',
        'MLB',
        'All Star'
      ]
    },
    'Outfits': {
      icon: '👕',
      subcategories: [
        'Pants & Joggers',
        'Shorts',
        'Jacket',
        'Sweater',
        'Sweatshirt'
      ]
    },
    'Best Deal': {
      icon: '🔥',
      subcategories: ['Sneakers', 'Outfits']
    },
    'International Deal': {
      icon: '🌍',
      subcategories: [
        'New Balance',
        'Air Max',
        'Pegasus',
        'Running',
        'SB Dunk',
        'Slide'
      ]
    },
    'Slide': {
      icon: '🩴',
      subcategories: ['Running',
        'SB Dunk',
        'Slide']
    },
    'Bags': {
      icon: '👜',
      subcategories: []
    },
    'Accessories': {
      icon: '🎒',
      subcategories: [
        'Belt',
        'Caps',
        'Wallet',
        'Men’s Underwear',
        'Shoe Cleaner',
        'Laces',
        'Belt',
        'Caps',
        'Wallet',
        'Men’s Underwear',
        'Shoe Cleaner',
        'Laces',
        'Belt',
        'Caps',
        'Wallet',
        'Men’s Underwear',
        'Shoe Cleaner',
        'Laces',
        'Belt',
        'Caps',
        'Wallet',
        'Men’s Underwear',
        'Shoe Cleaner',
        'Laces'
      ]
    }

  };



  return (
    <div className={`relative inline-block w-full`}>
      <div className="flex rounded-lg overflow-y-auto max-h-[490px] scrollbar-hide bg-white dark:bg-transparent dark:border-0 border-r border-gray-100 dark:border-gray-700">

        <div className={`w-80`}>
          {/* main-categories */}
          <div className="py-2">
            {Object.entries(categories).map(([categoryName, categoryData], index) => (
              <div
                key={categoryName}
                className="group"
              >
                <div

                  className={`w-full px-5 py-3.5 flex items-center justify-between transition-all duration-200 
                  
              hover:bg-gray-50 dark:hover:bg-gray-700
                    } ${index !== 0 ? 'border-t border-gray-50 dark:border-gray-700' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg transition-all duration-300
                      `}>
                      {categoryData.icon}
                    </span>
                    <Link href={""} className={`text-sm hover:underline font-medium transition-all duration-300 hover:cursor-pointer 
                     
                      text-gray-700 dark:text-gray-200
                      `}>
                      {categoryName}
                    </Link>
                  </div>
                  <button disabled={categoryData?.subcategories?.length === 0} onClick={() => toggleCategory(categoryName)} className={`  transition-all disabled:cursor-not-allowed hover:cursor-pointer duration-200  text-gray-400 dark:text-gray-500
                    `}>
                    {expandedCategories[categoryName] ?
                      <ChevronUp className="h-4 w-4" /> :

                      <ChevronDown className="h-4 w-4" />
                    }
                  </button>
                </div>


                <div className={`${expandedCategories[categoryName]
                  ? "visible w-full h-full opacity-100"
                  : "invisible w-0 h-0 opacity-0 overflow-hidden"
                  } bg-gray-50 dark:bg-transparent border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200 `}>
                  {categoryData.subcategories.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      className={`w-full px-12 py-2.5 hover:cursor-pointer text-left text-sm hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 text-gray-600 dark:text-gray-300 flex items-center justify-between group/sub ${subIndex !== categoryData.subcategories.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                        }`}
                    >
                      <span>{sub}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-150 text-blue-500 dark:text-blue-400" />
                    </button>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};



export default Menubar;