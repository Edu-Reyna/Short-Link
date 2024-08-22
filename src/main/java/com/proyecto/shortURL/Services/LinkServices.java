package com.proyecto.shortURL.Services;

import com.proyecto.shortURL.Entities.Link;
import com.proyecto.shortURL.Entities.Usuarios;
import com.proyecto.shortURL.Repositories.ILinkRepository;
import com.proyecto.shortURL.utils.Conversion;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LinkServices implements ILinkServices {

    private ILinkRepository linkRepository;

    private Conversion conversion;


    @Override
    public List<Link> getLinks(Usuarios usuario) {
        return linkRepository.findAll().stream().filter(link -> link.getUsuario().equals(usuario)).toList();
    }

    @Override
    public String getLink(String link) {
        var id = conversion.decodeUrl(link);
        var entity = linkRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("There is no entity with " + link));

        return entity.getUrl();
    }

    @Override
    public Link saveLink(Link link) {
        var entity = linkRepository.save(link);

        String converted = conversion.encodeUrl(entity.getId());
        entity.setShortUrl(converted);

        return linkRepository.save(entity);
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
