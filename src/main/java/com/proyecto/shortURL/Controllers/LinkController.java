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
    public Link saveLink(@RequestBody Link link, @RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            link.setUsuario(null);
        }
        return iLinkServices.saveLink(link);

    }

    @PostMapping("/link/delete/{id}")
    public void deleteLink(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        };
        iLinkServices.deleteLink(id);
    }

    @PostMapping("/link/edit")
    public Link editLink(@RequestBody Link link, @RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        return iLinkServices.editLink(link);
    }

    @GetMapping(value = "/link/list")
    public List<Link> getLinks(@RequestHeader("Authorization") String token) {
        if (!validarToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        Usuarios usuarioId = jwtUtil.validarDatosUsuario(token);
        return iLinkServices.getLinks(usuarioId);
    }

    @GetMapping("{link}")
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
