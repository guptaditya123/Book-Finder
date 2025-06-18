import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const booksPerPage = 12;
    const MAX_API_INDEX = 1000; // Google Books API max startIndex

    useEffect(() => {
        const savedData = localStorage.getItem('lastBookSearch');
        
        if (savedData) {
            const { query: savedQuery, result: savedResult, totalItems: savedTotal } = JSON.parse(savedData);
            setQuery(savedQuery);
            setResult(savedResult);
            setTotalItems(savedTotal || 0);
        }
    }, []);

    const fetchBooks = async (q, page = 1) => {
        if (!q.trim()) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const startIndex = (page - 1) * booksPerPage;
            
            // Don't exceed API's max index
            if (startIndex >= MAX_API_INDEX) {
                setCurrentPage(Math.floor(MAX_API_INDEX / booksPerPage));
                setError("Google Books API only returns up to 1000 results");
                return;
            }

            const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}&maxResults=${booksPerPage}`
            );
            const data = await res.json();
            const items = data.items || [];
            
            setResult(items);
            setTotalItems(data.totalItems || 0);
            setCurrentPage(page);
            
            localStorage.setItem('lastBookSearch', JSON.stringify({
                query: q,
                result: items,
                totalItems: data.totalItems || 0
            }));
        } catch (error) {
            console.error('Error fetching books:', error);
            setError("Failed to fetch books. Please try again.");
            setResult([]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setCurrentPage(1);
            fetchBooks(query, 1);
        }
    }

    const clearSearch = () => {
        setQuery('');
        setResult([]);
        setTotalItems(0);
        setCurrentPage(1);
        setError(null);
        localStorage.removeItem('lastBookSearch');
    }

    // Calculate total pages considering API limits
    const getTotalPages = () => {
        const maxPossibleItems = Math.min(totalItems, MAX_API_INDEX);
        return Math.ceil(maxPossibleItems / booksPerPage);
    }

    const totalPages = getTotalPages();

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            fetchBooks(query, newPage);
        }
    }

    // Calculate the last safe page to avoid API limits
    const getLastSafePage = () => {
        return Math.min(totalPages, Math.floor(MAX_API_INDEX / booksPerPage));
    }

    return (
        <div className="min-h-screen bg-gray-200 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex gap-2">
                        <input
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search Books here...'
                        />
                        <button 
                            type='submit'
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Searching...' : 'Search'}
                        </button>
                        {(result.length > 0 || totalItems > 0) && (
                            <button
                                type='button'
                                onClick={clearSearch}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </form>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
                
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-2">Loading books...</p>
                    </div>
                ) : result.length > 0 ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">
                            {query ? `Results for "${query}"` : 'Previous Search Results'}
                            {totalItems > 0 && (
                                <span className="text-sm text-gray-600 ml-2">
                                    (Showing {((currentPage - 1) * booksPerPage) + 1}-{Math.min(currentPage * booksPerPage, Math.min(totalItems, MAX_API_INDEX))} of {Math.min(totalItems, MAX_API_INDEX)} books)
                                </span>
                            )}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {result.map((book) => (
                                <Cards key={book.id} book={book} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <nav className="inline-flex rounded-md shadow">
                                    <button
                                        onClick={() => handlePageChange(1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        «
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ‹
                                    </button>
                                    
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ›
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(getLastSafePage())}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        »
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center text-gray-500 mt-12">
                        {query ? 'No books found. Try a different search.' : 'Enter a search term to find books.'}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage;