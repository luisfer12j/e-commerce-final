import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NavBar from "./components/NavBar";
import Purchases from "./pages/Purchases";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div className="App">
      <HashRouter>
        {isLoading && <LoadingScreen />}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/purchases" element={<Purchases />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
