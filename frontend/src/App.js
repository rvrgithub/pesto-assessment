import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { TableComponent } from './Components/TableComponent';
import { SignUp } from './Components/SignUp';
import { SignIn } from './Components/SignIn';
// Global variable to store token fetched from localStorage and Api
export const token = localStorage.getItem('Token');
export const api = "http://localhost:4000";
/**
 * Main component representing the entire application.
 * Handles routing and authentication.
 */
function App() {
  // Access the navigation object using useNavigate hook
  let navigate = useNavigate();

  /**
   * Function to fetch token and redirect to sign-in page if token is not available.
   */
  let getData = async () => {
    // Check if token is not available
    if (!token) {
      // Redirect to sign-in page
      navigate('/sign-in');
    }
  };

  // Call getData function on component mount
  useEffect(() => {
    getData();
  }, []);

  // Render the application
  return (
    <div className="App">
      {/* Define application routes */}
      <Routes>
        <Route path='/' element={<TableComponent />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
