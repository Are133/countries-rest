import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ThumbDetail from "../components/ThumbDetail";

function Home() {
  const [countries, setCountries] = useState([]);
  const [mode, setMode] = useState(true);
  const [toggleBtn, setToggleBtn] = useState(
    '<i class="far fa-sun"></i> Light Mode'
  );

  useEffect(() => {
    getCountries();
  }, []);

  const toggleDarkMode = () => {
    if (mode) {
      document.documentElement.classList.add("dark");
      setToggleBtn('<i class="fas fa-moon"></i> Modo oscuro');
      setMode((current) => (current = !current));
      console.log(setToggleBtn);
    }
    if (!mode) {
      document.documentElement.classList.remove("dark");
      setToggleBtn('<i class="far fa-sun"></i> Modo claro');
      setMode((current) => (current = !current));
      console.log(setToggleBtn);
    }
  };

  const getCountries = async () => {
    const res = await fetch("https://restcountries.com/v2/all");
    const data = await res.json();
    await setCountries(data);
    console.log(data);
  };

  const filterByRegion = async (region) => {
    if (region === "") {
      return;
    }
    let data = await fetch(`https://restcountries.com/v2/continent/${region}`);
    data = await data.json(data);
    await setCountries(data);
  };

  const searchCountry = async (term) => {
    if (term.length < 3 || term === "") {
      return;
    }

    let data = await fetch(`https://restcountries.com/v2/name/${term}`);
    data = await data.json(data);
    await setCountries(data);
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

      <div className="container mx-auto mb-16 mr-9 z-10 pr-2 pl-3 py-5 rounded-md text-gray-400">
        <i className="fa fa-search" aria-hidden="true"></i>
        <input
          type="text"
          placeholder="Buscar"
          className="pl-10 p-2 rounded-md w-1/3 dark:bg-gray-700"
          onChange={(term) => searchCountry(term.target.value)}
        />

        <select
          className="ml-auto my-2 p-2 shadow-md rounded-md font-medium dark:bg-gray-700"
          onChange={(val) => filterByRegion(val.target.value)}
        >
          <option value="">Filtrar por region</option>
          <option value="americas">America</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europa</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      <div className="container grid grid-cols-4 gap-16 mx-auto">
        {countries.map((country, index) => (
          <Link to={{ pathname: "details", state: country }} key={index}>
            <ThumbDetail
              title={country.name}
              image_url={country.flag}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
