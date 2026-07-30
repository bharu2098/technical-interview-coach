import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/interview/:sessionId"
        element={
          <ProtectedRoute>
            <Interview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/report/:sessionId"
        element={
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;