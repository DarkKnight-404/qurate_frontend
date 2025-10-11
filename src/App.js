import { BrowserRouter , Route, Routes} from 'react-router-dom';
import './App.css';
import Dashboard from './CRM/Dashboard';
import Editor from './Editor/Editor';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Editor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        
      </BrowserRouter>

      

      
    </div>
  );
}

export default App;
