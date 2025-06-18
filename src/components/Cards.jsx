import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../context/BookProvider";

const Cards = ({ book }) => {
  const info = book.volumeInfo;
  const { toggleFavorite, favorites } = useContext(BookContext);
  const isFavorite = favorites.some(favBook => favBook.id === book.id);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Book Cover Image */}
      <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
        {info.imageLinks?.thumbnail ? (
          <img
            src={info.imageLinks.thumbnail.replace('http://', 'https://')}
            alt={info.title}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <div className="text-center p-4">
            <span className="text-gray-400 text-sm">No cover available</span>
          </div>
        )}
        {isFavorite && (
          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Book Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {info.title}
        </h3>
        
        {info.authors && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-1">
            by {info.authors.join(", ")}
          </p>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          <Link 
            to={`/book/${book.id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Details
          </Link>
          
          <button 
            onClick={() => toggleFavorite(book)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
              isFavorite 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {isFavorite ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Unfavorite
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorite
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;