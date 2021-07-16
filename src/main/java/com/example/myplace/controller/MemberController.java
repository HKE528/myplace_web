package com.example.myplace.controller;

import com.example.myplace.domain.dto.MemberDTO;
import com.example.myplace.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/login")
    public String login() {
        return "member/login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("member", new MemberDTO());

        return "member/register";
    }

    @PostMapping("/register")
    public String register(MemberDTO memberDTO) {
        memberService.saveMember(memberDTO);

        return "redirect:/member/login";
    }
}
