package com.example.myplace.domain;

import com.example.myplace.domain.dto.PlaceDTO;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity @Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_place")
@DynamicUpdate
public class Place {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String lonLat;

    private String phone;
    private String comment;
    private float rating;
    private String dir;
    private LocalDate addDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Place(String name, String category, String address, String lonLat, String phone, String comment, float rating) {
        this.name = name;
        this.category = category;
        this.address = address;
        this.lonLat = lonLat;
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
                lonLat,
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
                dto.getCategory(),
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
