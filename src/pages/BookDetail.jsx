import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch book');
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20 text-red-500">
      <p className="text-xl">Error: {error}</p>
      <button 
        onClick={handleGoBack}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Go Back
      </button>
    </div>
  );

  if (!book) return null;

  const info = book.volumeInfo;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button 
        onClick={handleGoBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Results
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3 p-6 flex justify-center bg-gray-50">
            <img
              src={info.imageLinks?.thumbnail?.replace('http://', 'https://') || 'https://via.placeholder.com/300x450?text=No+Cover'}
              alt={info.title}
              className="w-full max-w-xs h-auto rounded-lg shadow-md object-contain"
            />
          </div>
          
          {/* Book Details */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{info.title}</h1>
            
            {info.subtitle && (
              <h2 className="text-xl text-gray-600 mb-6">{info.subtitle}</h2>
            )}
            
            <div className="space-y-4">
              {info.authors && (
                <div>
                  <span className="font-semibold text-gray-800">Authors: </span>
                  <span className="text-gray-600">{info.authors.join(', ')}</span>
                </div>
              )}
              
              {info.publishedDate && (
                <div>
                  <span className="font-semibold text-gray-800">Published: </span>
                  <span className="text-gray-600">{new Date(info.publishedDate).toLocaleDateString()}</span>
                </div>
              )}
              
              {info.publisher && (
                <div>
                  <span className="font-semibold text-gray-800">Publisher: </span>
                  <span className="text-gray-600">{info.publisher}</span>
                </div>
              )}
              
              {info.categories && (
                <div>
                  <span className="font-semibold text-gray-800">Categories: </span>
                  <span className="text-gray-600">{info.categories.join(', ')}</span>
                </div>
              )}
              
              {info.pageCount && (
                <div>
                  <span className="font-semibold text-gray-800">Pages: </span>
                  <span className="text-gray-600">{info.pageCount.toLocaleString()}</span>
                </div>
              )}
              
              {info.averageRating && (
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800 mr-2">Rating: </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(info.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">({info.ratingsCount || 0} reviews)</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {info.description || 'No description available for this book.'}
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              {info.infoLink && (
                <a 
                  href={info.infoLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  View on Google Books
                </a>
              )}
              
              {info.previewLink && (
                <a 
                  href={info.previewLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview Book
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;