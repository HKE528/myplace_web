package com.example.myplace.domain.dto;

import com.example.myplace.domain.Member;
import com.example.myplace.domain.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class MemberDTO {

    private Long id;
    private String username;
    private String password;
    private Boolean enabled = true;
    private String email;
    private LocalDate joindate;
    private List<PlaceDTO> places = new ArrayList<>();

    public MemberDTO(Long id, String username, String password, Boolean enabled, String email, LocalDate joindate) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.email = email;
        this.joindate = joindate;
    }
}
