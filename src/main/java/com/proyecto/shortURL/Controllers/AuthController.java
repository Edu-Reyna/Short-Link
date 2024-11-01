package com.proyecto.shortURL.Controllers;

import com.proyecto.shortURL.Entities.Usuarios;
import com.proyecto.shortURL.Services.IUsuariosServices;
import com.proyecto.shortURL.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private IUsuariosServices iUsuariosServices;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody Usuarios usuario) {

        Usuarios usuarioLogueado = iUsuariosServices.getUsuario(usuario);
        if (usuarioLogueado != null) {
            return jwtUtil.create(String.valueOf(usuarioLogueado.getId_usuario()), usuarioLogueado.getEmail(),
                    usuarioLogueado.getRole());
        }
        return "Credenciales incorrectas";
    }

    @GetMapping("/role")
    public String role(@RequestHeader("Authorization") String token) {

        return jwtUtil.validarDatosUsuario(token).getRole().toString();
    }

}
