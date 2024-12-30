import { deleteUser } from "../api/newUsers"
import { useUser } from "../context/UserContext"
import { toast, ToastContainer } from "react-toastify"


function DeleteModal(id) {
    const { isDeleting, setIsDeliting, getUsers ,setDropdownVisible} = useUser()
    const idDelete = id.id
    const deletingUser = async() => {
        deleteUser(idDelete)
        toast.success('Usuario borrado correctamente!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        setIsDeliting(false)
        setDropdownVisible(false)
        await getUsers()
        // console.log(idDelete, 'user borrado')
    }
  return (
    <>
      <div>
            <li>
                <button 
                    className="block px-4 py-2 hover:bg-gray-700 hover:text-white w-full text-left"
                    onClick={() => setIsDeliting(true)}
                >
                    Eliminar
                </button>
            </li>
            </div>            
            {isDeleting && 
                <div className="flex justify-center min-h-64 items-center fixed inset-0 bg-gray-200 bg-opacity-70 w-full">
                    <div className="bg-gray-700 rounded-lg p-4 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mt-4">
                            <h2 className="text-2xl font-bold text-white">¿Seguro quiere eliminar el usuario?</h2>
                        </div>
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                type="button"
                                onClick={() => setIsDeliting(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg w-3/4"
                                onClick={()=>deletingUser()}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            }
    </>
  )
}

export default DeleteModal
