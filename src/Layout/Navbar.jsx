import logoMuni from "../assets/img/logo_muni.png"
import logoMuniW from "../assets/img/logo_muni_white.png"
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú hamburguesa

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="h-32 w-full bg-gray-200">
      <div className="flex">
        <div className="flex justify-start ml-5 p-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/5">
          <img src={logoMuni} alt="Logo municipalidad" className=" h-20 w-full" />
        </div>
        <div className="lg:flex items-center hidden w-full lg:justify-center">
          <ul className="flex ">
            <li className="p-5">INICIO</li>
            <li className="p-5">GOBIERNO</li>
            <li className="p-5 hidden xl:block">TRAMITES Y SERVICIOS</li>
            <li className="p-5">LA CIUDAD</li>
            <li className="p-5">NOTICIAS</li>

          </ul>
          <button className="bg-blue-600 h-10 ml-2 p-5 flex items-center rounded-lg text-white">Ingresar a CiDiTuc</button>
        </div>
        <div className="lg:w-1/4 w-1/2">
          <div className="lg:hidden flex items-center justify-end w-full mt-5">
            <button
              className="p-4"
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          // <div className="lg:hidden bg-gray-700 absolute text-white w-full top-28 z-10">
          <div
            className={`lg:hidden absolute top-0 right-0 h-full bg-primary-950 text-white w-8/12 transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-10`}
          >
            <div className="flex mt-5">
              <div className="flex justify-start ml-5 p-5 w-full">
                <img src={logoMuniW} alt="Logo municipalidad" className=" h-16 w-full" />
              </div>
              <button
                type="button"
                className="text-white hover:bg-gray-400 hover:rounded-xl flex justify-end"
                onClick={toggleMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col items-center py-4 w-full justify-center">
              <li className="p-4 border-b-2 border-gray-600 w-3/4 text-left">INICIO</li>
              <li className="p-4 border-b-2 border-gray-600 w-3/4 text-left">GOBIERNO</li>
              <li className="p-4 border-b-2 border-gray-600 w-3/4 text-left">TRAMITES Y SERVICIOS</li>
              <li className="p-4 border-b-2 border-gray-600 w-3/4 text-left">LA CIUDAD</li>
              <li className="p-4  w-3/4 text-left">NOTICIAS</li>
            </ul>
            <div className="flex flex-col items-center py-4 w-full justify-center">
              <h2 className="text-gray-500 w-3/4 text-left">CONTACTO</h2>
              <ul>
                <li className=" mx-5 mt-5 text-left">
                  <a className="text-blue-600 text-left">
                    Dirección: 9 De Julio 598 Sur, T4000 San Miguel De Tucumán, Tucumán
                  </a>
                </li>
                <li className=" mx-5 mt-5">
                  <a className="text-blue-600 w-1/2 text-left">
                   Municipalidad: 4516500
                  </a>
                </li>
                <li className=" mx-5 mt-5">
                  <a className="text-blue-600 w-1/2 text-left">
                    Asistencia Pública: 4308393
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
