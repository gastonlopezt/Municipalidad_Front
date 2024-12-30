import { useState, useEffect } from "react"
import { Formik, Form } from "formik"
import { updateUser } from "../api/newUsers"
import { useUser } from "../context/UserContext"
import { toast } from "react-toastify"

function EditModal(id) {
    const { isEditing, setIsEditing, users, handleModal, getUsers, dropdownVisible, setDropdownVisible } = useUser()
    const [selectedUser, setSelectedUser] = useState(null)
    useEffect(() => {
        const user = users.find((user) => user.id === id.id)
        setSelectedUser(user || null)
    }, [id, users])

    const onSubmit = async (values) => {
        try {
            await updateUser(values)
            setIsEditing(false)
            toast.success('Usuario editado correctamente!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
            setDropdownVisible(false)
            await getUsers()
            
        } catch (error) {
            toast.error("Ocurrió un error al editar el usuario.");
        }
    }

    return (
        <>
            <div>
                <li>
                    <button
                        className="block px-4 py-2 hover:bg-gray-700 hover:text-white w-full text-left"
                        onClick={() => setIsEditing(true)}
                    >
                        Editar
                    </button>
                </li>
            </div>
            {isEditing &&

                <div className="flex justify-center items-center fixed inset-0 bg-gray-200 bg-opacity-70 w-full">
                    <div className="bg-gray-700 rounded-lg p-4 w-full max-w-lg mx-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Editar Usuario</h2>
                            <button
                                type="button"
                                className="text-white hover:bg-gray-400 hover:rounded-xl"
                                onClick={() => setIsEditing(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            <Formik
                                initialValues={{
                                    id: selectedUser?.id || "",
                                    nombre: selectedUser?.nombre || "",
                                    apellido: selectedUser?.apellido || "",
                                    email: selectedUser?.email || "",
                                    telefono: selectedUser?.telefono || "",
                                    status: selectedUser?.status || ""
                                }}
                                enableReinitialize={true}
                                onSubmit={(values) => {
                                     onSubmit(values)
                                }}
                            >
                                {({ handleChange, handleSubmit, values }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="mt-4 flex flex-col">
                                            <label className="text-md text-white pb-2 mt-4">ID</label>
                                            <input
                                                type="number"
                                                name="id"
                                                placeholder="ID"
                                                className="border rounded-lg p-2 w-full bg-gray-500 text-white mt-2"
                                                onChange={handleChange}
                                                value={values.id}
                                                disabled
                                                required

                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Nombre</label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                placeholder="Nombre"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}
                                                value={values.nombre}
                                                required

                                            />

                                        </div>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Apellido</label>
                                            <input
                                                type="text"
                                                name="apellido"
                                                placeholder="Apellido"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}
                                                value={values.apellido}

                                                required

                                            />

                                        </div>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Correo</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Correo"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}
                                                value={values.email}

                                                required

                                            />

                                        </div>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Telefono</label>
                                            <input
                                                type="number"
                                                name="telefono"
                                                placeholder="Telefono"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}
                                                value={values.telefono}

                                                required

                                            />

                                        </div>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Estado</label>
                                            <select
                                                name="status"
                                                placeholder="Estado"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}
                                                value={values.status}

                                                required
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>

                                            </select>
                                        </div>
                                        <div className="flex justify-center mx-3 mt-8">
                                            <button
                                                type="submit"
                                                className="text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg w-3/4"
                                            // onClick={() => setModal(false)}
                                            >Editar usuario
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default EditModal
