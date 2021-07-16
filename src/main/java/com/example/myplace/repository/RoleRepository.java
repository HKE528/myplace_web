package com.example.myplace.repository;

import com.example.myplace.domain.Role;
import com.example.myplace.domain.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleEnum name);
}
