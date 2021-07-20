package com.example.myplace.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/geocode")
public class GeocodeApiContriller {
    private final String geocodeKey = "&key=5F043B4C-BC18-31D0-B652-0151881CD4C3";
    private String baseURL = "http://api.vworld.kr/req/address?service=address&request=getAddress&type=ROAD";

    @GetMapping("/address")
    public String pointToAddress(@RequestParam("point") String point) throws Exception {
        String coordAttr ="&point=" + point;
        String reqURL = baseURL + geocodeKey + coordAttr;
        String address = "";

        try {
            RestTemplate restTemplate = new RestTemplate();

            Map getUrlResult = restTemplate.getForObject(reqURL, Map.class);

            Map response = (Map)getUrlResult.get("response");
            ArrayList result = (ArrayList)response.get("result");
            address = ((Map)result.get(0)).get("text").toString();

        } catch (Exception e) {
            address = "해당 주소를 찾을 수 없습니다. 직접 입력하거나 다시 클릭해 주세요";
        }

        return address;
    }
}
