import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navigation = () => {
  const { isAuth, setIsAuth, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    let response = await fetch("http://localhost:9000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      setIsAuth(false);
      navigate("/login");
      setUser(null);
    }
  };

  const linkStyle =
    "text-white hover:text-pink-400 transition duration-200 font-medium";

  const activeLinkStyle = "text-pink-500 underline";

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${activeLinkStyle}` : `${linkStyle}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive ? `${activeLinkStyle}` : `${linkStyle}`
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${activeLinkStyle}` : `${linkStyle}`
            }
          >
            Profile
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? `${activeLinkStyle}` : `${linkStyle}`
              }
            >
              Admin
            </NavLink>
          )}  
          
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? `${activeLinkStyle}` : `${linkStyle}`
            }
          >
            Cart
          </NavLink>
        </div>

        <div className="flex space-x-6">
          {isAuth ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${activeLinkStyle}` : `${linkStyle}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? `${activeLinkStyle}` : `${linkStyle}`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
