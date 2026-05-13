import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import CreatePoll from "./routes/CreatePoll";
import PollDetails from "./routes/PollDetails";
import PollResults from "./routes/PollResults";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/create" element={ 
      <ProtectedRoute>
      <CreatePoll />
      </ProtectedRoute>} />

      <Route path="/poll/:slug" element={<PollDetails />} />

      <Route
        path="/poll/:slug/results"
        element={<PollResults />}
      />

    </Routes>
    </>
  );
}

export default App;