import "./App.css";
import { useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "./routes/AppRoutes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { AuthContext } from "./context/AuthContext";
import LoadingPage from "./components/loadingPage";
import axios from "axios";
const queryClient = new QueryClient();

function App() {
  const { user, setUser, fetchUserDataone } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND}user/getone`
      );
      console.log(res);
      if (res) {
        console.log(res);
        console.log("user from app", res);
        setUser(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserDataone();
  }, []);
  useEffect(() => {
    getUser();
  }, []);
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="App">
        <AppRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
