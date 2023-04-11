
import Register from "./components/Register/Register";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <>
      <AppRoutes />
    </>
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
  );
};

export default App;
