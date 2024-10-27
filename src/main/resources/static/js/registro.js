import {registrarUsuario} from "/js/class/usuario.js";
import {EVENT_SUBMIT} from "/js/utils/const.js";

document.getElementById("registerForm").addEventListener(EVENT_SUBMIT, async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
        alert('Las contrasenas no coinciden.');
        return;
    };

    const usuario = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        role: "ROLE_USER"
    };

    try {
        const response = await registrarUsuario(usuario);
        alert(response);
    } catch (error) {
        alert('Error al registrar el usuario:', error);
    }
});
