import Home from './pages/Home.js'
import Landing from './pages/Landing.js'
import ProtectedRoute from './pages/ProtectedRoute.js'
import Profile from './components/Profile.js'
import Feed from './components/Feed.js'
import "./styles/app.css"
import { UserAuthContextProvider } from "./AuthProvider";
import { UserInfoContextProvider } from './userInfoProvider.js'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <UserAuthContextProvider>
          <UserInfoContextProvider>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          
          <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>}>
          <Route path=":userId" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          </Route>
         
        </Routes> 
        </UserInfoContextProvider>
        </UserAuthContextProvider>
      </Router>
    
    </div>
  );
}

export default App;
