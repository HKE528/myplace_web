package com.example.myplace.service;

import com.example.myplace.domain.Member;
import com.example.myplace.domain.dto.MemberDTO;
import com.example.myplace.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public void saveMember(MemberDTO memberDTO) {
        Member member = Member.create(memberDTO);

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
