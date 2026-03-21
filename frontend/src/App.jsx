import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Authentication from "./pages/Authentication";
import Landing from "./pages/Landing";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <MainLayout>
              <Landing />
            
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <div>About Page</div>
            </MainLayout>
          }
        />

        <Route 
          path="/loginsigup" 
          element={
            <Authentication />
        } 
      />
  
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;