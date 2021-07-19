package com.example.myplace.controller;

import com.example.myplace.domain.dto.MemberDTO;
import com.example.myplace.domain.dto.PlaceDTO;
import com.example.myplace.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/place")
public class PlaceApiController {
    private final PlaceService placeService;

    @PostMapping("/add")
    public void addPlace(PlaceDTO placeDTO, Principal principal) {
        String username = principal.getName();

        System.out.println("Run AddApI !!");
        System.out.println("comment: " + placeDTO.getComment());

        placeService.savePlace(username, placeDTO);
    }
}
