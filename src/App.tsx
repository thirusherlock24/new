import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm.tsx";
import HomePage from "./components/HomePage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Terms from "./components/Terms.tsx";
import Privacy from "./components/Privacy.tsx";
function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<AuthForm />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

<Route
  path="/home"
  element={
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  }
/>        
      </Routes>
    </Router>
  );
}

export default App;
