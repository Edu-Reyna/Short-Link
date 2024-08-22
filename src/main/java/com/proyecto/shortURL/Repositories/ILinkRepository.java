package com.proyecto.shortURL.Repositories;

import com.proyecto.shortURL.Entities.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILinkRepository extends JpaRepository<Link, Long> {

}
