import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './CRM/Dashboard';
import Editor from './Editor/Editor';
import Login from './Login';
import Register from './Register';
import AuthRoutes from './AuthRoutes';
import OtpVerific from './OtpVerific';
import Home from './CRM/Home';
import Sites from './CRM/Sites';
import Templates from './CRM/Templates';

function App() {


  

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthRoutes> {localStorage.getItem("logged_status") === "success" ? <Dashboard/> : <Login/>} </AuthRoutes>} />
          <Route path="/otpverific" element={<AuthRoutes loginRequire={true} state='otp_verify'> <OtpVerific /> </AuthRoutes>} />
          <Route path="/editor" element={<AuthRoutes loginRequire={true} state="success"> <Editor /> </AuthRoutes>} />
          <Route path="/register" element={<AuthRoutes> <Register /> </AuthRoutes>} />
          <Route path="/dashboard" element={<AuthRoutes loginRequire={true} state="success"> <Dashboard /> </AuthRoutes>} />
          <Route path="/sites" element={<AuthRoutes loginRequire={true} state="success"> <Sites /> </AuthRoutes>} />
          <Route path="/templates" element={<AuthRoutes loginRequire={true} state="success"> <Templates /> </AuthRoutes>} />
          <Route path="/Home" element={<AuthRoutes loginRequire={true} state="success"> <Home /> </AuthRoutes>} />
        </Routes>
      </BrowserRouter>




    </div>
  );
}

export default App;
