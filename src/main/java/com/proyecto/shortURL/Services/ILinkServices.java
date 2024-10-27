package com.proyecto.shortURL.Services;

import com.proyecto.shortURL.Entities.Link;
import com.proyecto.shortURL.Entities.Usuarios;

import java.util.List;

public interface ILinkServices {

    //Mostrar lista de links de un usuario
    public List<Link> getLinks(Usuarios usuario);

    //Mostrar un link
    public String getLink(String link);

    //Crear un link
    public String saveLink(Link link);

    //Borrar un link
    public void deleteLink(Long id);

    //Actualizar un link
    public Link editLink(Link link);
}

