import { Route, Routes } from 'react-router-dom';
import './App.css';
import { TableComponent } from './Components/TableComponent';
import { SignUp } from './Components/SignUp';
import { SignIn } from './Components/SignIn';
function App() {
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

