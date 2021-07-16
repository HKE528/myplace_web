package com.example.myplace.service;

import com.example.myplace.domain.Member;
import com.example.myplace.domain.Place;
import com.example.myplace.domain.dto.PlaceDTO;
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

    public void savePlace(String username, PlaceDTO placeDTO) {
        Member member = memberRepository.findByUsername(username).get();
        Place place = Place.create(placeDTO, member);

        placeRepository.save(place);
    }

    public PlaceDTO findOne(Long id) {
        Place place = placeRepository.findById(id).get();

        return place.convertDTO();
    }

    public List<PlaceDTO> findAllMyPlace(String username) {
        Member member = memberRepository.findByUsername(username).get();

        return member.getPlaceDTOs();
    }
}
