import LoadingPage from "./pages/LoadingPage";
import { useContext } from "react";
import { AppContext } from "./store/AppContext";
import MainPage from "./pages/MainPage";
function Portfolio() {
  const { app } = useContext(AppContext);
  return <>{!app.loadPage ? <LoadingPage /> : <MainPage />}</>;
}
/*  */

export default Portfolio;
