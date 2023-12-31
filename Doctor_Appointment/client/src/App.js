import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./component/Spinner";
import PublicRoute from "./component/PublicRoute";
import ProtectedRoute from "./component/ProtectedRoute";
import Layout from "./component/Layout";



function App() {
  const { loading } = useSelector(state => state.alert || {});

  return (
    <>

      <BrowserRouter>
        {loading ? <Spinner /> : <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>}

      </BrowserRouter>
    </>
  );
}

export default App;
