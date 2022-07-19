import "./Portfolio.css";
import LoadingPage from "./pages/LoadingPage";
import AppContextProvider from "./store/AppContextProvider";
import { useContext } from "react";
import { AppContext } from "./store/AppContext";
import MainPage from "./pages/MainPage";
function Portfolio() {
  const { app } = useContext(AppContext);
  return <MainPage />;
}
/* {!app.loadPage ? <LoadingPage /> : <MainPage />} */

export default Portfolio;
