import {EVENT_CLICK, TOKEN_STORAGE_NAME} from "/js/utils/const.js";

document.addEventListener('DOMContentLoaded', async (event) => {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutButton = document.getElementById('logout-button');
  
    // Función para verificar si el token existe en localStorage
    async function check() {
      const token = localStorage.getItem(TOKEN_STORAGE_NAME);
      if (token) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutButton.style.display = 'block';
      } else {
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        logoutButton.style.display = 'none';
      }
    }
  
    // Evento para el botón de cerrar sesión
    logoutButton.addEventListener(EVENT_CLICK, async function() {
      localStorage.removeItem(TOKEN_STORAGE_NAME);
      await check();
      window.location.href = 'index.html';

    });
  
    check();
});

  