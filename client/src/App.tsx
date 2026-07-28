// import { useState,useEffect } from 'react';
// import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

function App() {
return(
  <BrowserRouter>
  <Routes>
    <Route path='' element={<Navigate to=''/>}/>
  </Routes>
  </BrowserRouter>
)
}

export default App;
