package com.proyecto.shortURL.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    private String name;
    private String surname;

    @Column(unique = true)
    private String password;

    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "usuario")
    @JsonManagedReference
    private List<Link> listaLinks;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;
}
