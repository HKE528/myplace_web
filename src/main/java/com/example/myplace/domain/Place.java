package com.example.myplace.domain;

import com.example.myplace.domain.dto.PlaceDTO;
import com.example.myplace.domain.enums.CategoryEnum;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity @Getter
@Table(name = "tb_place")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
public class Place {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private CategoryEnum category;

    @Column(nullable = false, length = 100)
    private String address;

    @Column(nullable = false, length = 60)
    private String lonlat;

    @Column(length = 20)
    private String phone;

    @Column(length = 200)
    private String comment;
    private float rating;

    @Column(length = 100)
    private String dir;
    private LocalDate addDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Place(String name, CategoryEnum category, String address, String lonlat, String phone, String comment, float rating) {
        this.name = name;
        this.category = category;
        this.address = address;
        this.lonlat = lonlat;
        this.phone = phone;
        this.comment = comment;
        this.rating = rating;
    }

    public PlaceDTO convertDTO() {
        PlaceDTO dto = new PlaceDTO(
                id,
                name,
                category,
                address,
                lonlat,
                phone,
                comment,
                rating,
                dir,
                addDate
        );

        return dto;
    }

    public static Place create(PlaceDTO dto, Member member){
        Place place = new Place(
                dto.getName(),
                dto.getCategory(),
                dto.getAddress(),
                dto.getLonLat(),
                dto.getPhone(),
                dto.getComment(),
                dto.getRating()
        );

        place.setMember(member);

        return place;
    }

    private void setMember(Member member){
        this.member = member;
        member.getPlaces().add(this);
    }
}
