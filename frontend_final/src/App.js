import Nav from "./components/Nav/Nav";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <AppRoutes />
    /* <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Nav />} />
        <Route exact phat="/service">
          service
        </Route>
        <Route exact phat="/news">
          News
        </Route>
        <Route exact phat="/about">
          About
        </Route>
      </Routes>
      <HomePage />
    </BrowserRouter>*/
=======
import  {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Nav />} />
          <Route exact phat="/service">service</Route>
          <Route exact phat="/news">News</Route>
          <Route exact phat="/about">About</Route>
        </Routes>
      </BrowserRouter>
>>>>>>> f133c3409c47656ab478327e71c5b75858b150e5
  );
}

export default App;
