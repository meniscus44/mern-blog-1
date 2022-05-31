import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { useContext } from "react";
import { Context } from "./Context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar/>
      <ScrollToTop>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/register" element={user ? <Home /> : <Register />} />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route exact path="/settings" element={user ? <Settings /> : <Login/>} />
        <Route exact path="/write" element={user ? <Write /> : <Login/>} />
        <Route exact path="/post/:postId" element={<Single />} />
      </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
