import {getLinks, saveLinkUser, deleteLink, editLink} from '/js/class/link.js';
import { EVENT_SUBMIT} from '/js/utils/const.js';


// Función para agregar filas a la tabla
async function table() {
    try {
        const data = await getLinks();
        const tableBody = document.querySelector('#links tbody');
        
        data.forEach((link, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${link.url}</td>
                <td>http://127.0.0.1:8080/link/${link.shortUrl}</td>
                <td>${new Date(link.creationDate).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-primary" onclick="copiar('http://127.0.0.1:8080/link/${link.shortUrl}')"><i class="bi bi-clipboard"></i></button>
                    <button class="btn btn-danger" onclick="deleteLink(${link.id})"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#cambios" onclick="editar('${encodeURIComponent(JSON.stringify(link))}')"><i class="bi bi-pencil-square"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Inicializar DataTable
        $('#links').DataTable({
            columnDefs: [{className: 'centrar', target: [0, 1, 2, 3]}],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
            }
        });
    } catch (error) {
        console.error('Error', error);
    }
}


/** 
let dataTable;
let dataInci = false;

const initDataTable = async () => {
    if(dataInci){
        dataTable.destroy();
    }

    await userTable();

    dataTable = $('#links').DataTable({});
    dataInci = true;
}

const userTable = async () => {
    try {
        const data = await getLinks();

        let content = ``;
        data.forEach((link) => {
            content += `
                <td>${link.url}</td>
                <td>http://127.0.0.1:8080/link/${link.shortUrl}</td>
                <td>${new Date(link.creationDate).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-primary" onclick="copiar('http://127.0.0.1:8080/link/${link.shortUrl}')">Copiar</button>
                    <button class="btn btn-danger" onclick="deleteLink(${link.id})">Eliminar</button>
                    <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#cambios" onclick="editar('${encodeURIComponent(JSON.stringify(link))}')">Editar</button>
                </td>`;
                tableBody.innerHTML = content;
        });

    }catch (error) {
        console.error('Error', error);
    }
};
*/

document.addEventListener('DOMContentLoaded', table);


//Funcion copiar enlace
window.copiar = async function(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert('Enlace copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar: ', err);
    }
}

//Funcion borrar enlace
window.deleteLink = async function(id) {
    try {
        await deleteLink(id);
        alert('Enlace borrado exitosamente');
        location.reload();
    } catch (err) {
        console.error('Error al borrar: ', err);
    }
}

//Funcion editar enlace
window.editar = function(enlaces) {
    const link = JSON.parse(decodeURIComponent(enlaces));
    document.querySelector('#urlLink').value = link.url;

    document.querySelector('#saveChanges').onclick = async function() {
        link.url = document.querySelector('#urlLink').value;

        // Validación URL
        const urlLink = link.url;

        const isValidURL = (urlLink) => {
            const patronURL = new RegExp(
                '^(https?:\\/\\/)?'+
                // valida nombre de dominio
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
                // valida OR direccion ip (v4)
                '((\\d{1,3}\\.){3}\\d{1,3}))'+
                // valida puerto y path
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
                // valida queries
                '(\\?[;&a-z\\d%_.~+=-]*)?'+
                // valida fragment locator
                '(\\#[-a-z\\d_]*)?$','i'); 
            return !!patronURL.test(urlLink);
        }

        if (!isValidURL(urlLink.trim())) {
            alert('La URL no es válida.');
            return;
        }

        try {
            await editLink(link);
            alert('Enlace editado exitosamente');
            location.reload();
        } catch (err) {
            console.error('Error al editar: ', err);
        }
    };
}



//Funcion crear enlace
document.querySelector('#formlink').addEventListener(EVENT_SUBMIT, async (event) => {
    event.preventDefault();
    const url = event.target.url.value;

    const isValidURL = (url) => {
        var patronURL = new RegExp(
          // valida protocolo
          '^(https?:\\/\\/)?'+
          // valida nombre de dominio
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
          // valida OR direccion ip (v4)
          '((\\d{1,3}\\.){3}\\d{1,3}))'+
          // valida puerto y path
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
          // valida queries
          '(\\?[;&a-z\\d%_.~+=-]*)?'+
          // valida fragment locator
          '(\\#[-a-z\\d_]*)?$','i'); 
        return !!patronURL.test(url);
  }

    if (!isValidURL(url.trim())) {
        alert('La URL no es válida.');
        return;
    }

    const link = {
        url: url
    };

    try {
        saveLinkUser(link);
        alert('Enlace creado');
        location.reload();
    } catch (error) {
        console.error(error);
    }

});

