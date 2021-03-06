package com.example.myplace.controller;

import com.example.myplace.domain.dto.PlaceDTO;
import com.example.myplace.service.FileService;
import com.example.myplace.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/place")
public class PlaceApiController {
    private final PlaceService placeService;
    private final FileService fileService;

    @PostMapping("/add")
    public Long addPlace(@RequestParam(value = "imageFiles", required = false) List<MultipartFile> files,
                         PlaceDTO placeDTO, Principal principal) {
        Long id;
        String username = principal.getName();

        if(placeDTO.getId() == null){
            id = placeService.savePlace(username, placeDTO);
        } else {
            String name = placeDTO.getName();

            id = placeService.updatePlace(placeDTO);
        }

        if(id != null && files.size() != 0) {
            fileService.saveFile(username, id, files);
        }

        return id;
    }

    @GetMapping("/view/{id}")
    public PlaceDTO viewPlace(@PathVariable("id") Long id, Principal principal) {
        PlaceDTO place = placeService.findOne(id);

        String username = principal.getName();

        int imageCount = fileService.checkExistImage(username, id);
        if(imageCount != 0) {
            place.setImagePath(fileService.getFilePath(username, id));
        } else {
            place.setImagePath(null);
        }
        place.setImageCount(imageCount);

        return place;
    }

    @DeleteMapping("/delete/{id}")
    public void deletePlace(@PathVariable("id") Long id, Principal principal) {
        if(placeService.deleteOne(id)){
            fileService.deleteImages(principal.getName(), id);
        }
    }
}
