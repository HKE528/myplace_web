package com.example.myplace.controller;

import com.example.myplace.domain.dto.PlaceDTO;
import com.example.myplace.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/place")
public class PlaceApiController {
    private final PlaceService placeService;

    @PostMapping("/add")
    public String addPlace(PlaceDTO placeDTO, Principal principal) {
        Long id;
        String username = principal.getName();

        if(placeDTO.getId() == null){
            id = placeService.savePlace(username, placeDTO);
        } else {
            String name = placeDTO.getName();
            System.out.println("Update : " + name);

            id = placeService.updatePlace(placeDTO);
        }

        System.out.println(id);

        return id.toString();
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
