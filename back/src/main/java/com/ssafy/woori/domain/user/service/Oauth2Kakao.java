package com.ssafy.woori.domain.user.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.woori.domain.user.dto.AuthorizationKakao;
import com.ssafy.woori.domain.user.dto.KakaoUserInfo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Oauth2Kakao {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${custom.oauth2.kakao.client-id}")
    private String kakaoRestAPIKey;
    
    private final String frontendRedirectUrl = "http://localhost:3000/test/loggedin";

    // 인가코드로 accessToken 받기
    public AuthorizationKakao callTokenApi(String code) {
        String grantType = "authorization_code";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grantType);
        params.add("client_id", kakaoRestAPIKey);
        params.add("redirect_uri", frontendRedirectUrl);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        String url = "https://kauth.kakao.com/oauth/token";
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            return objectMapper.readValue(response.getBody(), AuthorizationKakao.class);
        } catch (RestClientException | JsonProcessingException ex) {
            ex.printStackTrace();
            return null;
        }
    }


    /**
     * accessToken 을 이용한 유저정보 받기
     * @return
     */
    public KakaoUserInfo callGetUserByAccessToken(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        String url = "https://kapi.kakao.com/v2/user/me";
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            return objectMapper.readValue(response.getBody(), KakaoUserInfo.class);
        }catch (RestClientException | JsonProcessingException ex) {
            ex.printStackTrace();
            return null;
        }
    }
}