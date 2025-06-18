import { createContext, useState } from "react";

export const BookContext = createContext();

// In BookProvider.js
export const BookProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favoriteBooks');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleFavorite = (book) => {
        setFavorites(prevFavorites => {
            const exists = prevFavorites.some(b => b.id === book.id);
            const newFavorites = exists 
                ? prevFavorites.filter(b => b.id !== book.id)
                : [...prevFavorites, book];
            localStorage.setItem('favoriteBooks', JSON.stringify(newFavorites));
            return newFavorites;
        });
    }

    return (
        <BookContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </BookContext.Provider>
    )
}