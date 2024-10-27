import {TOKEN_STORAGE_NAME, HTTP_CONTENT_JSON} from "/js/utils/const.js";

function getHeaders() {
    return {
        'Accept': HTTP_CONTENT_JSON,
        'Content-Type': HTTP_CONTENT_JSON,
        'Authorization': localStorage.getItem(TOKEN_STORAGE_NAME)
    };
}

async function registrarUsuario (usuario) {
    const response = await fetch('/usuarios/registrar', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)

    });

        const data = await response.text();
        return data;

}

async function login (usuario) {
    try {
        const response = await fetch('/login', {
            method: 'POST', 
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
    
        });

        const data = await response.text();
        return data;

    } catch (error) {
        console.error(error);
        return null;
        
    }
}

async function getrol () {
    const response = await fetch('/role', {
        method: 'GET',
        headers: getHeaders()
    });
    return response.text();
}

async function listAdmin () {
    const response = await fetch('/usuarios/listar', {
        method: 'GET',
        headers: getHeaders()
    });
    const data = await response.json();
    return data;
}

async function deleteUsuario (id) {
    const response = await fetch(`/usuarios/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    return response.text();
}

async function editUsuario (usuario) {
    const response = await fetch('/usuarios/editar', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(usuario)
    });

    return response.text();
        
}


export {
    registrarUsuario,
    login,
    getrol,
    listAdmin,
    deleteUsuario,
    editUsuario

}