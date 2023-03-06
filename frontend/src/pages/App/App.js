import { Route, Routes } from "react-router-dom";

import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import HistoryPage from "../HistoryPage/HistoryPage";
import HomePage from "../HomePage/HomePage";
import OrganizationPage from "../OrganizationPage/OrganizationPage";
import UsersPage from "../UsersPage/UsersPage";

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </div>
  );
};

export default App;
