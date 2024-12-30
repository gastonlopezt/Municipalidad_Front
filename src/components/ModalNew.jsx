import { Formik, Field, Form, ErrorMessage } from "formik"
import { newUser } from "../api/newUsers"
import { useUser } from "../context/UserContext"
import { toast, ToastContainer } from "react-toastify"
import * as Yup from "yup"; 

function ModalNew() {
    const { modal, setModal, handleModal, getUsers } = useUser()

    const validationSchema = Yup.object({
        nombre: Yup.string()
          .min(3, "El nombre debe tener al menos 3 caracteres")
          .max(15, "El nombre no debe tener más de 15 caracteres")
          .required("Este campo es obligatorio"),
        apellido: Yup.string()
          .min(3, "El apellido debe tener al menos 3 caracteres")
          .max(15, "El apellido no debe tener más de 15 caracteres")
          .required("Este campo es obligatorio"),
        email: Yup.string()
          .email("Correo inválido")
          .min(7, "El correo debe tener al menos 7 caracteres")
          .max(25, "El correo no debe tener más de 25 caracteres")
          .required("Este campo es obligatorio"),
        telefono: Yup.string()
          .matches(/^[0-9]{6,15}$/, "El teléfono debe ser un número válido entre 6 y 15 caracteres")
          .required("Este campo es obligatorio"),
        status: Yup.string().required("Debe seleccionar un estado"),
      });

    const handleNewUser = async (values) => {
        try {
            await newUser(values)
            toast.success('Usuario creado correctamente!!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setModal(false)
            await getUsers()
            // console.log('llegue')
        } catch (error) {
            toast.error("Ocurrió un error al crear el usuario.");
            
        }
    }

    return (
        <>
            <div className="w-full md:flex md:justify-end ">
                <button
                    type="button"
                    data-modal-toggle="createProductModal"
                    className="flex items-center justify-center text-white 
                             font-medium rounded-lg text-sm px-4 py-2 
                            bg-primary-600 hover:bg-primary-700
                            w-full md:w-1/2 xl:w-1/4"

                    onClick={handleModal}
                >
                    <svg className="h-4 w-4 mr-2" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                    >
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                    Nuevo usuario
                </button>
            </div>
            {modal &&
                <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 w-full">
                    <div className="bg-gray-700 rounded-lg p-4 w-full max-w-lg mx-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Nuevo Usuario</h2>
                            <button
                                type="button"
                                className="text-white hover:bg-gray-400 hover:rounded-xl"
                                onClick={() => setModal(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            <Formik
                                initialValues={{
                                    nombre: "",
                                    apellido: "",
                                    email: "",
                                    telefono: "",
                                    status: ""
                                }}
                                validationSchema={validationSchema}
                                onSubmit={async (values) => {
                                    await handleNewUser(values)
                                }}
                            >
                                {({ handleChange, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Nombre</label>
                                            <Field
                                                type="text"
                                                name="nombre"
                                                placeholder="Nombre"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}

                                            />
                                            <ErrorMessage name="nombre" component="p" className="text-red-500 text-xs" />
                                        </div>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Apellido</label>
                                            <Field
                                                type="text"
                                                name="apellido"
                                                placeholder="Apellido"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}

                                            />
                                            <ErrorMessage name="apellido" component="p" className="text-red-500 text-xs" />
                                        </div>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Correo</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Correo"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}

                                            />
                                            <ErrorMessage name="email" component="p" className="text-red-500 text-xs" />
                                        </div>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Telefono</label>
                                            <Field
                                                type="number"
                                                name="telefono"
                                                placeholder="Telefono"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}

                                            />
                                            <ErrorMessage name="telefono" component="p" className="text-red-500 text-xs" />
                                        </div>
                                        <div className="mt-4">
                                            <label className="text-md text-white pb-2 mt-4">Estado</label>
                                            <select
                                                name="status"
                                                placeholder="Estado"
                                                className="border rounded-lg p-2 w-full bg-gray-700 text-white mt-2"
                                                onChange={handleChange}
                                            >
                                                <option value="">Seleccione</option>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                                <ErrorMessage name="status" component="p" className="text-red-500 text-xs" />
                                            </select>
                                        </div>
                                        <div className="flex justify-center mx-3 mt-8">
                                            <button
                                                type="submit"
                                                className="text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg w-3/4"
                                            // onClick={() => setModal(false)}
                                            >Crear nuevo usuario
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

export default ModalNew
