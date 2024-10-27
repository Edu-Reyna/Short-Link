package com.proyecto.shortURL.Services;

import com.proyecto.shortURL.Entities.Link;
import com.proyecto.shortURL.Entities.Usuarios;
import com.proyecto.shortURL.Repositories.ILinkRepository;
import com.proyecto.shortURL.utils.Conversion;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LinkServices implements ILinkServices {

    @Autowired
    private ILinkRepository linkRepository;

    @Autowired
    private Conversion conversion;

    @Override
    public List<Link> getLinks(Usuarios usuario) {
        return linkRepository.findAll().stream().filter(link -> link.getUsuario() != null && link.getUsuario().getId_usuario().equals(usuario.getId_usuario())).toList();
    }

    @Override
    public String getLink(String link) {
        var url = linkRepository.findAll().stream().filter(l -> l.getShortUrl().equals(link)).findFirst();
        if (url.isEmpty()) {
            throw new EntityNotFoundException();
        }
        var entity = url.get();
        return entity.getUrl();
    }

    @Override
    public String saveLink(Link link) {
        var entity = linkRepository.save(link);

        String converted = conversion.encodeUrl(entity.getId());
        entity.setShortUrl(converted);

        linkRepository.save(entity);

        return entity.getShortUrl();
    }

    @Override
    public void deleteLink(Long id) {
        linkRepository.deleteById(id);
    }

    @Override
    public Link editLink(Link link) {
        return linkRepository.save(link);
    }
}
