import { useEffect, useState } from "react";

function ThemeToggle() {

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem("theme") === "dark"
    );
useEffect(() => {

  if (darkMode) {

    document.body.style.backgroundColor =
      "#020617";

    document.body.style.color =
      "white";

  } else {

    document.body.style.backgroundColor =
      "white";

    document.body.style.color =
      "black";

  }

}, [darkMode]);

  return (

    <button
      onClick={() =>
        setDarkMode(!darkMode)
      }
      className="bg-slate-800 text-white px-3 py-2 rounded-lg"
    >
      {darkMode
        ? "☀"
        : "🌙"}
    </button>

  );

}

export default ThemeToggle;