package com.example.myplace.domain;

import com.example.myplace.domain.enums.RoleEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter
@Table(name = "tb_role")
@NoArgsConstructor
public class Role {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long Id;

    @Column(name = "name", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private RoleEnum name;

    @ManyToMany(mappedBy = "roles")
    List<Member> members = new ArrayList<>();
}
