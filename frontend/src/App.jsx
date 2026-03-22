import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Authentication from "./pages/Authentication";
import Landing from "./pages/Landing";
import MediList from "./pages/MediList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            
              <Landing />
            
          
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

        <Route path="/account/:mode" element={<Authentication />} />

        <Route
          path="/medi-list"
          element={
            <MainLayout>
              <MediList />
            </MainLayout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
