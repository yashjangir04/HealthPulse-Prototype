import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Authentication from "./pages/SignInForm";
import Landing from "./pages/Landing";
import MediList from "./pages/MediList";
import MeetingRoom from "./pages/MeetingRoom";
import Contact from "./pages/contact";
import MedicineDelivery from "./pages/MedicineDelivery";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./pages/profile";
import Connect from "./pages/Connect";

import SignInForm from "./pages/SignInForm";

import StepForm from "./pages/StepForm";
import StepFormPatient from "./pages/StepFormPatient";
import StepFormShopkeeper from "./pages/StepFormShopkeeper";
import Lobby from "./pages/Lobby";
import Appointments from "./pages/Appointments";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              showNavbar={true}
              showSidebar={false}
              isFullHeighted={false}
            >
              <Landing />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout
              showNavbar={true}
              showSidebar={false}
              isFullHeighted={false}
            >
              <div className=".box w-full h-screen mt-24 grid place-items-center">
                <h1 className="poppins-bold text-3xl">About</h1>
              </div>
            </MainLayout>
          }
        />

        <Route
          path="/meeting/:roomID"
          element={
            <MainLayout
              showNavbar={false}
              showSidebar={false}
              isFullHeighted={true}
            >
              <MeetingRoom />
            </MainLayout>
          }
        />

        <Route
          path="/appointments"
          element={
            <MainLayout
              showNavbar={false}
              showSidebar={true}
              isFullHeighted={true}
            >
              <Appointments />
            </MainLayout>
          }
        />

        <Route
          path="/lobby/:speciality"
          element={
            <MainLayout
              showNavbar={false}
              showSidebar={true}
              isFullHeighted={true}
            >
              <Lobby />
            </MainLayout>
          }
        />

        <Route path="/account/:mode" element={<Authentication />} />

        <Route
          path="/medi-list"
          element={
            <ProtectedRoute>
              <MainLayout
                showNavbar={false}
                showSidebar={true}
                isFullHeighted={true}
              >
                <MediList />
              </MainLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/connect"
          element={
            <MainLayout
              showNavbar={false}
              showSidebar={true}
              isFullHeighted={true}
            >
              <Connect />
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
       
        <Route
          path="/medicines"
          element={
            <MainLayout showNavbar={true} showSidebar={true} isFullHeighted={false}>
              <MedicineDelivery/>
            </MainLayout>
          }
        ></Route> 
        
        <Route
          path="/profile"
          element={
            <MainLayout showNavbar={false} showSidebar={true} isFullHeighted={true}>
              <Profile />
            </MainLayout>
          }
        ></Route>

        <Route
          path="/account/register"
          element={
            <MainLayout
              showNavbar={false}
              showSidebar={false}
              isFullHeighted={true}
            >
              <Signup />
            </MainLayout>
          }
        ></Route>

        <Route
          path="/login"
          element={
            <MainLayout
              showNavbar={false}
              showSidebar={false}
              isFullHeighted={true}
            >
              <SignInForm />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/stepform"
          element={
            <MainLayout
              showNavbar={false}
              showSidebar={false}
              isFullHeighted={true}
            >
              <StepForm />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/stepformPatient"
          element={
            <MainLayout
              showNavbar={false}
              showSidebar={false}
              isFullHeighted={true}
            >
              <StepFormPatient />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/stepformShopkeeper"
          element={
            <MainLayout
              showNavbar={false}
              showSidebar={false}
              isFullHeighted={true}
            >
              <StepFormShopkeeper />
            </MainLayout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
