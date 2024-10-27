import {HTTP_CONTENT_JSON, TOKEN_STORAGE_NAME} from '/js/utils/const.js';

function getHeaders() {
    return {
        'Accept': HTTP_CONTENT_JSON,
        'Content-Type': HTTP_CONTENT_JSON,
        'Authorization': localStorage.getItem(TOKEN_STORAGE_NAME)
    };
}

async function saveLink(link) {
    const response = await fetch('/link/save', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(link)
    });
    return response.text();
}

async function saveLinkUser(link) {
    const response = await fetch('/link/save/user', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(link)
    });
    if (response.status === 200) {
        return response.text();
    } else {
        return 'Fallo la creación del enlace';
    }
}

async function deleteLink(id) {
    const response = await fetch(`/link/delete/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    return response.text();
}

async function editLink(link) {
    const response = await fetch('/link/edit', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(link)
    });
    return response.text();
}

async function getLinks() {
    const response = await fetch('/link/list', {
        method: 'GET',
        headers: getHeaders()
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getLink(link) {
    const response = await fetch(`/link/${link}`, {
        method: 'GET'
    });
    if (response.status === 302) {
        return response.headers.get('Location');
    } else {
        return null;
    }
}

export {
    saveLink,
    saveLinkUser,
    deleteLink,
    editLink,
    getLinks,
    getLink
};