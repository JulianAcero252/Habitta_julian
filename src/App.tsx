import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "@presentation/components/layout/Layout";
import Home from "@presentation/pages/home/Home";
import PropertiesPage from "@presentation/pages/properties/PropertiesPage";
import RegisterPropertyPage from "@presentation/pages/registerpropeties/RegisterPropertyPage";
import Promotion from "@presentation/pages/promotion_tmp/Promotion";
import Auth from "@presentation/pages/auth/Auth";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="registerpropeties" element={<RegisterPropertyPage />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
