package com.example.myplace.service;

import com.example.myplace.domain.Member;
import com.example.myplace.domain.Role;
import com.example.myplace.domain.dto.MemberDTO;
import com.example.myplace.domain.enums.RoleEnum;
import com.example.myplace.repository.MemberRepository;
import com.example.myplace.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public void saveMember(MemberDTO memberDTO) {
        String password = memberDTO.getPassword();
        memberDTO.setPassword(passwordEncoder.encode(password));
        Role role = roleRepository.findByName(RoleEnum.ROLE_USER);

        Member member = Member.create(memberDTO, role);

        memberRepository.save(member);
    }

    public MemberDTO findOne(String username){
        Member member = memberRepository.findByUsername(username).get();

        return member.convertDTO();
    }

    public MemberDTO findOne(Long id){
        Member member = memberRepository.getById(id);

        return member.convertDTO();
    }
}
