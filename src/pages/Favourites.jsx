import React, { useContext } from 'react';
import { BookContext } from '../context/BookProvider';
import Cards from '../components/Cards';

const Favourites = () => {
    const { favorites } = useContext(BookContext);
    
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Your Favourite Books
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        {favorites.length === 0 
                            ? "You haven't added any favorites yet" 
                            : `You have ${favorites.length} favorite book${favorites.length !== 1 ? 's' : ''}`
                        }
                    </p>
                </div>
                
                {favorites.length === 0 ? (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No favorites yet</h3>
                        <p className="mt-1 text-gray-500">
                            Start adding books to your favorites from the search page.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((book) => (
                            <Cards key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favourites;