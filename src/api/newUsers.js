const url = import.meta.env.VITE_API_URL

export const getUsersData = async () => {
    console.log(url)
try {
    const res = await fetch(url)
    const data = await res.json()
    return data.usuarios
    
} catch (error) {
    console.log(error, 'Problema con el GETALL')
}
}
export const newUser = async (values) => {
    try {
        const res = await fetch( url + '/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const data = await res.json()
        // console.log(data.usuario, 'usuario creado')
    } catch (error) {
        console.log(error, 'Problema con el POST')
    }
}
export const updateUser = async (values) => {
    try {
        const res = await fetch( url + '/update/' + values.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const data = await res.json()
        // console.log(data.usuario, 'usuario modificado')
    } catch (error) {
        console.log(error, 'Problema con el POST')
    }
}

export const deleteUser = async (id) => {
    try {
        // console.log(id, 'es el id')
        const res = await fetch(url + '/delete/' + id, {
            method: 'DELETE',
        })
        return {success: true}
    } catch (error) {
        console.log(error, 'Problema eliminando usuario')
    }
}