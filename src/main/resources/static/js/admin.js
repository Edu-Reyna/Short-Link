import{listAdmin, deleteUsuario, editUsuario, registrarUsuario} from '/js/class/usuario.js';
import{EVENT_SUBMIT} from '/js/utils/const.js';

// Función para registrar usuario
document.querySelector('#formUser').addEventListener(EVENT_SUBMIT, async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const surname = event.target.surname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const role = event.target.role.value;

    if (password !== confirmPassword) {
        alert('Las contrasenas no coinciden');
        return;
    }

    const usuario = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        role: role
    }

    try {
        const response = await registrarUsuario(usuario);
        alert(response);
        location.reload();
    } catch (error) {
        console.error(error);
    }
})


// Función para agregar filas a la tabla
async function table() {
    try {
        const data = await listAdmin();
        const tableBody = document.querySelector('#usuarios tbody');
        
        data.forEach((usuario, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${usuario.name}</td>
                <td>${usuario.surname}</td>
                <td>${usuario.email}</td>
                <td>${usuario.role}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteUser(${usuario.id_usuario})"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#cambios" onclick="editarUser('${encodeURIComponent(JSON.stringify(usuario))}')"><i class="bi bi-pencil-square"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Inicializar DataTable
        $('#usuarios').DataTable({
            columnDefs: [{className: 'centrar', target: [0, 1, 2, 3, 4, 5]}],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
            }
        });
    } catch (error) {
        console.error('Error populating table:', error);
    }
}
//Inicializar DataTable
document.addEventListener('DOMContentLoaded', table);


//Funcion borrar usuario
window.deleteUser = async function(id) {
    try {
        const response = await deleteUsuario(id);   
        alert(response);
        location.reload();
    } catch (error) {
        console.error(error);
    }
}

//Funcion editar usuario
window.editarUser = async function(usuario) {
    const user = JSON.parse(decodeURIComponent(usuario));
    
    document.querySelector('#name').value = user.name;
    document.querySelector('#surname').value = user.surname;
    document.querySelector('#email').value = user.email;;
    document.querySelector('#role').value = user.role;

    document.querySelector('#saveChanges').onclick = async () => {
        user.name = document.querySelector('#name').value;
        user.surname = document.querySelector('#surname').value;
        user.email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;
        user.role = document.querySelector('#role').value;

        if (password !== confirmPassword) {
            alert('Las contrasenas no coinciden');
            return;
        }   

        user.password = password;

        try {
            const response = await editUsuario(user);
            alert(response);
            location.reload();
        } catch (error) {
            console.error(error);  
        }
    }
}