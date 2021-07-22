package com.example.myplace.controller;

import com.example.myplace.domain.Place;
import com.example.myplace.domain.dto.PlaceDTO;
import com.example.myplace.domain.enums.CategoryEnum;
import com.example.myplace.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
    public String home(@RequestParam(value = "searchText", defaultValue = "") String searchText,
                       @RequestParam(value = "selCate", defaultValue = "전체") CategoryEnum selCate,
                       Model model, Principal principal) {
        if(principal != null) {
            List<PlaceDTO> allMyPlace = placeService.findAllMyPlace(principal.getName(), searchText, selCate);

            model.addAttribute("places", allMyPlace);
            model.addAttribute("searchText", searchText);
            model.addAttribute("selCate", selCate);
        }

        return "home";
    }
}
