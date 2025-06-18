import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchPage from "./pages/SearchPage";
import Favourites from "./pages/Favourites";
import BookDetail from "./pages/BookDetail";

function App() {
  return (
    <div>
      <Home />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/Favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
