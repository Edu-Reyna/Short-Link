package com.proyecto.shortURL.Controllers;

import com.proyecto.shortURL.Entities.Usuarios;
import com.proyecto.shortURL.Services.IUsuariosServices;
import com.proyecto.shortURL.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor @NoArgsConstructor
@RestController
public class UsuariosController {

    @Autowired
    private IUsuariosServices usuariosServices;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/usuarios/registrar")
    public void registrarUsuario(@RequestBody Usuarios usuario) {

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);

        usuariosServices.saveUsuario(usuario);
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return (usuarioId != null);
    }

    @GetMapping("/usuarios")
    public List<Usuarios> getUsuarios(@RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        return usuariosServices.getUsuarios();
    }

    @DeleteMapping("/usuarios/{id}")
    public void deleteUsuario(@PathVariable("id") Long id, @RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        usuariosServices.deleteUsuario(id);
    }
    
    @PutMapping("/usuarios/editar")
    public void editUsuario( @RequestBody Usuarios usuario, @RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        usuariosServices.editUsuario(usuario);
    }
}
