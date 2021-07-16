package com.example.myplace.domain.dto;

import com.example.myplace.domain.enums.CategoryEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class PlaceDTO {

    private Long id;
    private String name;
    private CategoryEnum category;
    private String address;
    private String lonlat;
    private String phone;
    private String comment;
    private float rating;
    private String dir;
    private LocalDate addDate;

    public PlaceDTO(Long id, String name, CategoryEnum category, String address, String lonlat, String phone, String comment, float rating, String dir, LocalDate addDate) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.address = address;
        this.lonlat = lonlat;
        this.phone = phone;
        this.comment = comment;
        this.rating = rating;
        this.dir = dir;
        this.addDate = addDate;
    }
}
