package com.proyecto.shortURL.Controllers;

import com.proyecto.shortURL.Entities.Link;
import com.proyecto.shortURL.Entities.Usuarios;
import com.proyecto.shortURL.Services.ILinkServices;
import com.proyecto.shortURL.utils.JWTUtil;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@AllArgsConstructor @NoArgsConstructor
@RestController
public class LinkController {

    @Autowired
    private ILinkServices iLinkServices;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return (usuarioId != null);
    }

    @PostMapping("/link/save")
    public String saveLink(@RequestBody Link link) {
        var creacion = new Date();
        link.setCreationDate(creacion);
            link.setUsuario(null);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(creacion);
            calendar.add(Calendar.DAY_OF_YEAR, 7);
            link.setExpirationDate(calendar.getTime());
            return iLinkServices.saveLink(link);
    }

   @PostMapping("/link/save/user")
    public String saveLink(@RequestBody Link link, @RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        var creacion = new Date();
        link.setCreationDate(creacion);
        Usuarios usuarioId = jwtUtil.validarDatosUsuario(token);
        link.setUsuario(usuarioId);
        iLinkServices.saveLink(link);
        return "Link guardado exitosamente";
    }

    @DeleteMapping("/link/delete/{id}")
    public String deleteLink(@PathVariable("id") Long id, @RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        };
        iLinkServices.deleteLink(id);
        return "Link eliminado exitosamente";
    }

    @PutMapping("/link/edit")
    public String editLink(@RequestBody Link link, @RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        Usuarios usuarioId = jwtUtil.validarDatosUsuario(token);
        link.setUsuario(usuarioId);
        iLinkServices.editLink(link);
        return "Link editado exitosamente";
    }

    @GetMapping(value = "/link/list")
    public List<Link> getLinks(@RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        Usuarios usuarioId = jwtUtil.validarDatosUsuario(token);
        return iLinkServices.getLinks(usuarioId);
    }


    @GetMapping("/link/{link}")
    public ResponseEntity<Void> getLink(@PathVariable String link) {
        String link1 = iLinkServices.getLink(link);
        if (link1 == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(link1))
                .build();
    }


}
