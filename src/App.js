import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div className="App">
      <HashRouter>
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
