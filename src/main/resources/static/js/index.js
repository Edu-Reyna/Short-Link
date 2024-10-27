import {saveLink} from "/js/class/link.js";
import {EVENT_SUBMIT, EVENT_CLICK} from "/js/utils/const.js";

document.getElementById("linkForm").addEventListener(EVENT_SUBMIT, async (event) => {
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
        url: url,
    };

     console.log(link);

    try {
        const response = await saveLink(link);
        const urlCompleta = `http://127.0.0.1:8080/link/${response}`;
        document.querySelector('input[name="shortLink"]').value = urlCompleta;
        alert('Enlace guardado exitosamente.');
    } catch (error) {
        alert('Error al guardar el enlace:', error);
    }
});

document.getElementById("copiar").addEventListener(EVENT_CLICK, async () => {
    const shortLink = document.querySelector('input[name="shortLink"]').value;
    try {
        await navigator.clipboard.writeText(shortLink);
    } catch (err) {
        console.error('Error al copiar: ', err);
    }
});



