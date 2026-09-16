import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import CreateBatch from "./pages/createbatch";
import ShowBatches from "./pages/showbatches";
import ShowUsers from "./pages/showusers";
import ProtectedRoute from "./component/ProtectedRoute";
import Dashboard from "./pages/dboard";

function App() {
  return (
    <BrowserRouter>
     <Routes>

  {/* Public */}
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />


  {/* Students */}
  <Route
    element={
      <ProtectedRoute
        // allowedRoles={["student"]}
      />
    }
  >
    <Route
      path="/profile"
      element={<Profile />}
    />
  </Route>


  {/* Admin + Teacher */}
  <Route
    element={
      <ProtectedRoute
        allowedRoles={["admin", "teacher"]}
      />
    }
  >
    <Route
      path="/dboard"
      element={<Dashboard />}
    />
  </Route>


  {/* Admin only */}
  <Route
    element={
      <ProtectedRoute
        allowedRoles={["admin"]}
      />
    }
  >
    <Route
      path="/createbatch"
      element={<CreateBatch />}
    />

    <Route
      path="/showbatches"
      element={<ShowBatches />}
    />

    <Route
      path="/showusers"
      element={<ShowUsers />}
    />
  </Route>

</Routes>
    </BrowserRouter>
  );
}

export default App;