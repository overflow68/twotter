import Home from './pages/Home.js'
import Landing from './pages/Landing.js'
import ProtectedRoute from './pages/ProtectedRoute.js'
import "./styles/app.css"
import { UserAuthContextProvider } from "./AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          
          
        </Routes>
        </UserAuthContextProvider>
      </Router>
    
    </div>
  );
}

export default App;
