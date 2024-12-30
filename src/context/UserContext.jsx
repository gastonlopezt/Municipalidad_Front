import { createContext, useContext, useState } from "react";
import { getUsersData } from "../api/newUsers";

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserContextProvider");
    }
    return context;
}

export const UserContextProvider = ({ children }) => {
    const [modal, setModal] = useState(false)
    const [users, setUsers] = useState([])
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeliting] = useState(false)

    const getUsers = async () => {
        try {
            const data = await getUsersData();
            if (data) {
                const sortedUsers = data.sort((a, b) => a.id - b.id);
                setUsers(sortedUsers);
            } else {
                console.error("Datos no válidos recibidos de la API");
            }
        } catch (error) {
            console.error("Error durante la llamada GET:", error);
        }
    };

    const handleModal = () => {
        setModal(!modal)
    }

    return (
        <UserContext.Provider value={{
            modal,
            setModal,
            users,
            getUsers,
            setIsEditing,
            isEditing,
            dropdownVisible,
            setDropdownVisible,
            handleModal,
            isDeleting, 
            setIsDeliting
        }}>
            {children}
        </UserContext.Provider>
    )
}