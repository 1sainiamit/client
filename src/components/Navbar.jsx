import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <div className="w-full bg-zinc-900 h-20 flex items-center justify-center text-white">
      <div className="flex gap-24 text-2xl sm:text-lg md:text-xl">
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        {!cookies.access_token ? (
          <Link to="/auth">Logout/Register</Link>
        ) : (
          <>
            <Link to="/saved-recipes">Saved Recipes</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
