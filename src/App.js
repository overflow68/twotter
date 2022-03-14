import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
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
          
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
        </Routes>
        </UserAuthContextProvider>
      </Router>
    
    </div>
  );
}

export default App;
