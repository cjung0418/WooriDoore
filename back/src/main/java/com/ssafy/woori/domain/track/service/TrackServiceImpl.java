package com.ssafy.woori.domain.track.service;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.woori.domain.history.service.HistoryService;
import com.ssafy.woori.domain.track.dto.InvoiceRequest;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Map;
import java.util.StringTokenizer;

@Service
public class TrackServiceImpl implements TrackService{

    @Autowired
    HistoryService historyService;

    @Override
    public Boolean invoiceValid(InvoiceRequest request){
        String baseUrl = "https://apis.tracker.delivery/carriers/kr.cjlogistics/tracks/";


        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = null;
        try{
            response = restTemplate.getForEntity(baseUrl + request.getTrackNumber(), String.class);
        }
        // 운송장 유효하지 않을경우 return false
        catch (final HttpClientErrorException e){
            System.out.println(e.getStatusCode());
            return (false);
        }
        if(response.getStatusCode() == HttpStatus.OK){
            // 여기에 블록체인 API 호출 필요
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = null;
            try {
                map = mapper.readValue(response.getBody(), Map.class);
                JSONObject jsonObject = new JSONObject(map);

                String a = jsonObject.get("state").toString();
                StringTokenizer st = new StringTokenizer(a, "=,");
                if(st.hasMoreTokens())
                   st.nextToken();
                if(st.hasMoreTokens()){
                    String state = st.nextToken();
                    System.out.println(state);
                    // 배송도착 혹은 배송중인 상황
                    if(state.equals("delivered") || state.equals("out_for_delivery")) {
                        // History state 변경
                        if(!historyService.changeHistory(request.getHistorySeq())) return (false);

                        return (true);
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return (false);
    }

}
