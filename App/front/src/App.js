import './App.css';
import {Route, Routes} from "react-router-dom";
import Landing from './pages/Landing';
import Upload from './pages/Upload';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Landing}/>
        <Route path='/upload' Component={Upload}/>
      </Routes>
    </div>
  );
}

export default App;
