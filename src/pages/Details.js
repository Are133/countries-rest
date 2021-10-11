import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";

function Details() {
  const [mode, setMode] = useState(true);
  const [toggleBtn, setToggleBtn] = useState(
    '<i class="far fa-sun"></i> Light Mode'
  );

  let { state } = useLocation();
  let history = useHistory();

  const goHomeBtn = () => history.push("/");

  const toggleDarkMode = () => {
    if (mode) {
      document.documentElement.classList.add("dark");
      setToggleBtn('<i class="fas fa-moon"></i> Dark Mode');
      setMode((current) => (current = !current));
    }
    if (!mode) {
      document.documentElement.classList.remove("dark");
      setToggleBtn('<i class="far fa-sun"></i> Light Mode');
      setMode((current) => (current = !current));
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="w-screen shadow-md py-6 px-3 bg-white dark:bg-gray-700 dark:text-white mb-16">
        <div className="flex container mx-auto">
          <h1 className="font-bold text-xl">Donde te encuentras?</h1>
          <div className="ml-auto font-medium">
            <button
              onClick={() => toggleDarkMode()}
              dangerouslySetInnerHTML={{ __html: toggleBtn }}
            ></button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-16">
        <button
          className="px-8 py-2 bg-white text-gray-600 shadow-md dark:bg-gray-700 dark:text-white rounded-lg"
          onClick={() => goHomeBtn()}
        >
          <i className="fa fa-arrow-left"></i> Volver
        </button>
      </div>
      <div className="container flex mx-auto p-8 pl-0 pr-0">
        <img src={state.flag} className="w-1/2 pr-8" alt={state.name} />
        <div className="p-8 pl-8">
          <h2 className="font-bold text-2xl mb-8">{state.name}</h2>
          <div className="grid grid-cols-2 gap-x-20 gap-y-4">
            <p>
              Nombre nativo:{" "}
              <span className="dark:text-gray-400 text-gray-700 text-sm">
                {state.nativeName}
              </span>
            </p>
            <p>
              Poblacion:{" "}
              <span className="dark:text-gray-400 text-gray-700 text-sm">
                {state.population}
              </span>
            </p>
            <p>
              Region:{" "}
              <span className="dark:text-gray-400 text-gray-700 text-sm">
                {state.region}
              </span>
            </p>
            <p>
              Sub Region:{" "}
              <span className="dark:text-gray-400 text-gray-700 text-sm">
                {state.subregion}
              </span>
            </p>
            <p>
              Capital:{" "}
              <span className="dark:text-gray-400 text-gray-700 text-sm">
                {state.capital}
              </span>
            </p>
            <p>
              Nivel de dominio mas alto:{" "}
              <span className="dark:text-gray-400 text-gray-700 text-sm">
                {state.topLevelDomain[0]}
              </span>
            </p>
            <p>
              Monedas:{" "}
              <span className="dark:text-gray-400 text-gray-700 text-sm">
                {state.currencies.map((cur) => cur.name)}
              </span>
            </p>
            <p>
              Lenguajes:{" "}
              <span className="dark:text-gray-400 text-gray-700 text-sm">
                {state.languages.map((lang) => lang.name + ", ")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
