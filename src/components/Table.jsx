import ModalNew from "./modalNew.jsx"
import { useState, useEffect } from "react"
import { useUser } from "../context/UserContext"
import EditModal from "./EditModal.jsx"
import DeleteModal from "./DeleteModal.jsx"
import { ToastContainer } from "react-toastify"

function Table() {
    const { users, getUsers, dropdownVisible, setDropdownVisible } = useUser()
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); 
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
 
    useEffect(() => {
        getUsers();
    }, []);

    //Dropdown---------
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };
    const toggleDropdown = (id) => {
        setDropdownVisible((prev) => (prev === id ? false : id))
    }

    //Filtrado para buscador-------
    const filteredUsers = users.filter((user) =>
        user.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.apellido.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.telefono.includes(searchValue)
    );
    //Orden de las columnas---------
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortOrder === "asc") {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });

    // Paginación------------
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    //svg------------
    const SortIcon = (sortOrder) => (
        <svg
            className={`w-4 h-4 ml-2 transform ${sortOrder === "asc" ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
            />
        </svg>
    );

    return (
        <section className="bg-gray-600 h-screen p-3 antialiased">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                <div className="bg-gray-800 relative shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                {/* <label>Search</label> */}
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                        </svg>
                                    </div>
                                    <input type="text"
                                        onChange={handleSearchChange}
                                        className="border text-sm rounded-lg block w-full pl-10 p-2 bg-gray-700 
                                        border-gray-600 placeholder-gray-400 text-white focus:border-primary-500"
                                        placeholder="Search"
                                        value={searchValue}
                                    />
                                </div>
                            </form>
                        </div>
                        <ModalNew />

                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left  text-gray-400">
                            <thead className="text-md uppercase bg-gray-700 :text-gray-400 text-left">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-4 cursor-pointer flex"
                                        onClick={() => handleSort("id")}
                                    >
                                        ID
                                        {SortIcon(sortBy === "id" ? sortOrder : null)}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-4 cursor-pointer"
                                        onClick={() => handleSort("nombre")}
                                    >
                                        Nombre
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-4 cursor-pointer"
                                        onClick={() => handleSort("apellido")}
                                    >
                                        Apellido
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-4 cursor-pointer"
                                        // onClick={() => handleSort("email")}
                                    >
                                        Correo
                                    </th>
                                    <th scope="col" className="px-4 py-3">Telefono</th>
                                    <th
                                        scope="col"
                                        className="px-4 py-4 cursor-pointer flex"
                                        onClick={() => handleSort("estado")}
                                    >
                                        Estado
                                        {/* {SortIcon(sortBy === "estado" ? sortOrder : null)} */}

                                    </th>
                                    <th scope="col" className="px-4 py-3">Acc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && currentUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-700">
                                        <th className="px-4 py-3 font-mediu whitespace-nowrap text-white">
                                            {user.id}
                                        </th>
                                        <td className="px-4 py-3">{user.nombre}</td>
                                        <td className="px-4 py-3">{user.apellido}</td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">{user.telefono}</td>
                                        <td className="px-4 py-3">
                                            {user.status === 1 ? "Activo" : "Inactivo"}
                                        </td>
                                        <button
                                            className="flex items-center justify-center text-sm
                                            hover:bg-gray-700 p-1.5 hover-bg-gray-800 text-center
                                            rounded-lg  text-gray-400 hover:text-gray-100"
                                            type="button"
                                            onClick={() => toggleDropdown(user.id)}
                                        >
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                        {dropdownVisible === user.id && (
                                            <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg">
                                                <ul className="py-1 text-sm text-gray-400">
                                                    <EditModal id={user.id} />
                                                    <DeleteModal id={user.id} />
                                                </ul>
                                            </div>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center my-4">
                        <nav>
                            <ul className="flex space-x-2">
                                {pageNumbers.map((number) => (
                                    <>
                                        <li>
                                            <button
                                                className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded-md"
                                                onClick={() => paginate(number)}
                                            >
                                                {number}
                                            </button>
                                        </li>

                                    </>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Table
