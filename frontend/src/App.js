import './App.css';
import { Routes, Route} from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Header/Login';
import Add from './components/Header/Add';
import Signup from './components/Header/Signup';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/add" element={<Add />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
    </>
    
  )

}

export default App;
