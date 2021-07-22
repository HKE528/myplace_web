package com.example.myplace.service;

import com.example.myplace.domain.Member;
import com.example.myplace.domain.Place;
import com.example.myplace.domain.dto.PlaceDTO;
import com.example.myplace.domain.enums.CategoryEnum;
import com.example.myplace.repository.MemberRepository;
import com.example.myplace.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PlaceService {
    private final PlaceRepository placeRepository;
    private final MemberRepository memberRepository;

    public Long savePlace(String username, PlaceDTO placeDTO) {
        Member member = memberRepository.findByUsername(username).get();
        Place place = Place.create(placeDTO, member);

        Place save = placeRepository.save(place);

        return save.getId();
    }

    public PlaceDTO findOne(Long id) {
        Place place = placeRepository.findById(id).get();

        return place.convertDTO();
    }

    public List<PlaceDTO> findAllMyPlace(String username, String searchText, CategoryEnum cate) {
        Member member = memberRepository.findByUsername(username).get();

        List<PlaceDTO> placeDTOs = member.getPlaceDTOs();

        if(!searchText.isEmpty()) {
            placeDTOs = placeDTOs.stream().filter(it -> it.getName().contains(searchText)).toList();
        }

        if(!cate.equals(CategoryEnum.전체)){
            placeDTOs = placeDTOs.stream().filter(it -> it.getCategory().equals(cate)).toList();
        }

        return placeDTOs;
    }

    public boolean deleteOne(Long id) {
        placeRepository.deleteById(id);

        return true;
    }

    public Long updatePlace(PlaceDTO dto) {
        Place place = placeRepository.findById(dto.getId()).get();

        place.changData(dto);

        return place.getId();
    }
}
