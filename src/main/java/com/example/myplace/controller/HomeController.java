package com.example.myplace.controller;

import com.example.myplace.domain.Place;
import com.example.myplace.domain.dto.PlaceDTO;
import com.example.myplace.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class HomeController {
    private final PlaceService placeService;

    @RequestMapping("/")
    public String redirectHome() {
        return "redirect:/home";
    }

    @RequestMapping("/home")
    public String home(Model model, Principal principal) {
        System.out.println("Home!");

        if(principal != null) {
            List<PlaceDTO> allMyPlace = placeService.findAllMyPlace(principal.getName());

            model.addAttribute("places", allMyPlace);
        }

        return "home";
    }
}
