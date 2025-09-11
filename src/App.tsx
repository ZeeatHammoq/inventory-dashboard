import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./components/Login";
import { DepartmentSelector } from "./components/DepartmentSelector";
import { ItemSelector } from "./components/ItemSelector";
import { TagGenerator } from "./components/TagGenerator";
import { useAuthStore } from "./stores/authStore";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/departments" replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/departments"
            element={
              <ProtectedRoute>
                <DepartmentSelector />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ItemSelector />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tag"
            element={
              <ProtectedRoute>
                <TagGenerator />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
