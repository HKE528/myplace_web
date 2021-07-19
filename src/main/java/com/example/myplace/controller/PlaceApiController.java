package com.example.myplace.controller;

import com.example.myplace.domain.dto.PlaceDTO;
import com.example.myplace.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/place")
public class PlaceApiController {
    private final PlaceService placeService;

    @PostMapping("/add")
    public void addPlace(PlaceDTO placeDTO, Principal principal) {
        String username = principal.getName();

        placeService.savePlace(username, placeDTO);
    }

    @GetMapping("/view/{id}")
    public PlaceDTO viewPlace(@PathVariable("id") Long id) {
        PlaceDTO place = placeService.findOne(id);

        return place;
    }

    @DeleteMapping("/delete/{id}")
    public void deletePlace(@PathVariable("id") Long id) {
        placeService.deleteOne(id);
    }
}
