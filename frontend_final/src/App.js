import Nav from "./components/Nav/Nav";
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
  );
}

export default App;
