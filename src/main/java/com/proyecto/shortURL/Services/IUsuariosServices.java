package com.proyecto.shortURL.Services;

import com.proyecto.shortURL.Entities.Usuarios;

import java.util.List;

public interface IUsuariosServices {

    public void deleteUsuario(Long id);

    public void editUsuario(Usuarios usuario);

    public void saveUsuario(Usuarios usuario);

    public List<Usuarios> getUsuarios();

    public Usuarios getUsuario(Usuarios usuario);

}
