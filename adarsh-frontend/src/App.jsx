import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./component/Home";
import { Login } from "./component/Login";
import { Registration } from "./component/Registration";
import { QueryCreate } from "./component/QueryCreate";
import { WithAuth } from "./component/WithAuth";
import { Navbar } from "./component/Navbar";
import { Category } from "./component/Category";
import { ProfilePage } from "./component/ProfilePage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/posts/:category" element={<Category />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/create"
          element={
            <WithAuth>
              <QueryCreate />
            </WithAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/profile"
          element={
            <WithAuth>
              <ProfilePage />
            </WithAuth>
          }
        />
      </Routes>
    </Router>
  );
}
