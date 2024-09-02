import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import PlatformPage from "./pages/PlatformPage";
import RegisterPlatform from "./pages/RegisterPlatform";
import { PlatformProvider } from "./context/PlatformContext";
import { SellPlatformProvider } from "./context/SellPlatformContext";
import BuyPage from "./pages/BuyPage";
import SellPlatformPage from "./pages/SellPlatformPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SellPlatformProvider>
        <PlatformProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="flex">
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="homePage" element={<HomePage />} />
                    <Route
                      path="/sellPlatform"
                      element={<SellPlatformPage />}
                    />

                    <Route
                      element={<ProtectedRoute allowedRoles={["admin"]} />}
                    >
                      <Route path="userPage" element={<UserPage />} />
                      <Route path="platforms" element={<PlatformPage />} />
                      <Route path="register" element={<RegisterPage />} />
                      <Route
                        path="registerPlatforms"
                        element={<RegisterPlatform />}
                      />
                      <Route
                        path="/registerPlatforms/:id"
                        element={<RegisterPlatform />}
                      />
                      <Route path="/register/:id" element={<RegisterPage />} />
                    </Route>

                    <Route
                      element={<ProtectedRoute allowedRoles={["vendedor"]} />}
                    >
                      <Route path="/buyPage" element={<BuyPage />} />
                    </Route>
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </AuthProvider>
        </PlatformProvider>
      </SellPlatformProvider>
    </>
  );
}

export default App;
