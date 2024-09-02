import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  RiArrowUpSLine,
  RiLogoutCircleRLine,
  RiMenu3Fill,
  RiCloseLine,
  RiHome6Line,
  RiArrowLeftRightFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Navbar({ children, users }) {
  const { isAuthenticated, logout, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };



  return (
    
    <div className="bg-[#f5f5f5]">
      {/* Sidebar */}
      <div
        className={`bg-[#1E1F24] fixed ${
          showMenu ? "-left-0" : "-left-full"
        } lg:left-0 top-0 w-72 h-full p-8 flex flex-col justify-between transition-all z-50`}
      >
        {/* Menu */}
        <div>
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-white uppercase font-bold text-2xl tracking-[4px]">
              STREAM FAMILY
            </h1>
          </div>
          {/* Nav */}
          <nav>
            <div className="flex items-center gap-4 mb-10">
              <div>
                {user ? (
                  
                  <>
                  
                    <p className="text-gray-400 text-sm">{user.role}</p>
                    <h5 className="font-bold text-white text-lg">
                      {user.username}
                    </h5>
                    {user.role === "admin" ? (
                      <p></p>
                    ) : (
                      <>
                        <br />
                        <p className="text-gray-400 text-sl">
                          <strong>Saldo: </strong>
                          {user.balance}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <div>No user data</div>
                )}
              </div>
            </div>
            <ul>
              <li>
                <Link
                  to="/homePage"
                  className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                >
                  <RiHome6Line />
                  Inicio
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/userPage"
                    className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                  >
                    <RiHome6Line />
                    Administrar Usuarios
                  </Link>
                  <Link
                    to="/platforms"
                    className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                  >
                    <RiHome6Line />
                    Administrar Plataformas
                  </Link>
                  <Link
                    to="/sellPlatform"
                    className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                  >
                    <RiHome6Line />
                    Historial
                  </Link>
                </li>
              )}

              {user?.role === "vendedor" && (
                <li>
                  <Link
                    to="/buyPage"
                    className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                  >
                    <RiHome6Line />
                    Plataformas
                  </Link>
                  <Link
                    to="/sellPlatform"
                    className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                  >
                    <RiHome6Line />
                    Historial
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        {/* Logout */}
        <div>
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center gap-4 text-gray-400 py-2 hover:text-gray-200 transition-colors"
                onClick={() => {
                  logout();
                }}
              >
                <RiLogoutCircleRLine />
                Salir
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Btn menu movile */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed right-4 bottom-4 bg-[#1E1F24] ring-4 ring-[#141517] text-white text-xl p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>

      {/* Content */}
      <main className="bg-[#ffffff] lg:ml-80 lg:mt-10 md:pt-0 lg:pt-2 min-h-[80vh] w-full lg:w-[calc(96%-300px)] grid grid-cols-1 lg:grid-cols-1 border border-gray-300 shadow-lg">
        {/* Header */}
        <div>{children}</div>
      </main>
    </div>
  );
}
