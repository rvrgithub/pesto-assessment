import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { TableComponent } from './Components/TableComponent';
import { SignUp } from './Components/SignUp';
import { SignIn } from './Components/SignIn';
import { useEffect } from 'react';
export let token = localStorage.getItem("Token"); 

function App() {
  let navigate = useNavigate();

  let getData = async () => {
    if (!token) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<TableComponent />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>

    </div>
  );
}

export default App;

