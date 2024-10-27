import {login, getrol} from "/js/class/usuario.js";
import {EVENT_SUBMIT, TOKEN_USER_STORAGE_NAME, TOKEN_ADMIN_STORAGE_NAME, TOKEN_STORAGE_NAME} from "/js/utils/const.js";

document.getElementById("loginForm").addEventListener(EVENT_SUBMIT, async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const usuario = {
        email: email,
        password: password
    };


    const response = await login(usuario);

    if (response !== "Credenciales incorrectas") {    
        alert("Usuario logeado");
        localStorage.setItem(TOKEN_STORAGE_NAME, response);

        const rol = await getrol();

        if (rol === TOKEN_ADMIN_STORAGE_NAME) {
            window.location.href = "admin.html";
        } else if (rol === TOKEN_USER_STORAGE_NAME) {
            window.location.href = "usuario.html";
        }
    } else {
        alert("Credenciales incorrectas");
    }

});
