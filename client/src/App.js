import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import { useEffect } from 'react';
import Loader from './components/Loader';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, SetPortfolioData, ShowLoading } from './redux/rootSlice';
import Admin from './pages/Admin';
import Login from './pages/Admin/Login';

function App() {
  // const [showLoading, setShowLoading] = useState(false);

  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);

  const dispatch = useDispatch();

  const getportfolioData = async () => {
    try {
      dispatch(ShowLoading(true));
      // const response = await axios.get("/api/portfolio/get-portfolio-data");

      const API_BASE = process.env.REACT_APP_API_URL || "";
      const response = await axios.get(`${API_BASE}/api/portfolio/get-portfolio-data`);
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading())


    } catch (error) {
      console.log(error);
      dispatch(HideLoading())

    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getportfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getportfolioData();
    }
  }, [reloadData])

  return (
    <BrowserRouter>
      {/* {showLoading ? <Loader /> : null} */}
      {loading ? <Loader /> : null}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin-login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
