package com.example.myplace.domain;

import com.example.myplace.domain.dto.MemberDTO;
import com.example.myplace.domain.dto.PlaceDTO;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "tb_member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(unique = true, length = 30)
    private String username;

    @Column(nullable = false, length = 50)
    private String password;

    @Column(nullable = false)
    private Boolean enabled = true;

    private String email;
    private LocalDate joindate;

    @ManyToMany
    @JoinTable(
            name = "tb_member_role",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Place> places = new ArrayList<>();

    public Member(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;

        this.joindate = LocalDate.now();
    }

    public MemberDTO convertDTO() {
        MemberDTO dto = new MemberDTO(
                id,
                username,
                password,
                enabled,
                email,
                joindate
        );

        return dto;
    }

    public List<PlaceDTO> getPlaceDTOs() {
        List<PlaceDTO> list = new ArrayList<>();

        for(Place place : places) {
            list.add(place.convertDTO());
        }

        return list;
    }

    public static Member create(MemberDTO dto, Role... roles) {
        Member member = new Member(
                dto.getUsername(),
                dto.getPassword(),
                dto.getEmail()
        );

        for(Role role : roles) {
            member.setRole(role);
        }

        return member;
    }

    private void setRole(Role role) {
        this.roles.add(role);
        role.getMembers().add(this);
    }
}
