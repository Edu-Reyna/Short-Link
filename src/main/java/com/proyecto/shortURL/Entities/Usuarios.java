package com.proyecto.shortURL.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Entity
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;

    private String username;
    private String name;
    private String surname;

    @Column(unique = true)
    private String password;

    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "usuario")
    private List<Link> listaLinks;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;
}
