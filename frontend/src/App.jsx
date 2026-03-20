import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
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

        <Route path="/account/:mode" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
