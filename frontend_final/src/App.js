import AppRoutes from "./Routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <AppRoutes />

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
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
