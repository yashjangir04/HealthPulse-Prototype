import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Authentication from "./pages/Authentication";
import Landing from "./pages/Landing";
import MediList from "./pages/MediList";
import MeetingRoom from "./pages/MeetingRoom";
import Contact from "./pages/contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout showNavbar={true} showSidebar={false} isFullHeighted={false}>
              <Landing />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout showNavbar={true} showSidebar={false} isFullHeighted={false}>
              <div className=".box w-full h-screen mt-24 grid place-items-center">
                <h1 className="poppins-bold text-3xl">About</h1>
              </div>
            </MainLayout>
          }
        />

        <Route path="/account/:mode" element={<Authentication />} />

        <Route
          path="/medi-list"
          element={
            <MainLayout showNavbar={false} showSidebar={true} isFullHeighted={true}>
              <MediList />
            </MainLayout>
          }
        ></Route>

        <Route
          path="/meeting/room/:roomID"
          element={
            <MainLayout showNavbar={false} showSidebar={true} isFullHeighted={true}>
              <MeetingRoom />
            </MainLayout>
          }
        ></Route>

        <Route
          path="/contact"
          element={
            <MainLayout showNavbar={false} showSidebar={true} isFullHeighted={true}>
              <Contact />
            </MainLayout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
