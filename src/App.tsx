import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const ClientDashboard = lazy(
  () => import("./components/client/ClientDashboard"),
);
const CustomerDashboard = lazy(
  () => import("./components/customer/CustomerDashboard"),
);

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
