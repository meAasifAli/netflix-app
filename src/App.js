import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";
import PrivateRoute from './pages/PrivateRoute'
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="h-auto bg-black w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/account' element={<PrivateRoute>
          <Account />
        </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
