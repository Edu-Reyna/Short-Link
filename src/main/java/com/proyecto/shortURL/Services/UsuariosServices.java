package com.proyecto.shortURL.Services;

import com.proyecto.shortURL.Entities.Usuarios;
import com.proyecto.shortURL.Repositories.IUsuarioRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosServices implements IUsuariosServices {

    private IUsuarioRepository usuarioRepository;


    @Override
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public void editUsuario(Usuarios usuario) {
        usuarioRepository.save(usuario);
    }

    @Override
    public void saveUsuario(Usuarios usuario) {
        usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuarios> getUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuarios getUsuario(Usuarios usuario) {
        List<Usuarios> lista = usuarioRepository.findAll().stream()
                .filter(n -> n.getEmail().equals(usuario.getEmail())).toList();
        if (lista.isEmpty()){
            return null;
        }
        String passwordHash = lista.getFirst().getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        if (argon2.verify(passwordHash, usuario.getPassword())) {
            return lista.getFirst();
        }
        return null;
    }
}
