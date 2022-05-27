package com.ssafy.woori.domain.track.controller;

import com.ssafy.woori.domain.funding.controller.FundingController;
import com.ssafy.woori.domain.track.dto.InvoiceRequest;
import com.ssafy.woori.domain.track.service.TrackService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/track")
public class TrackController {

    public static final Logger logger = LoggerFactory.getLogger(FundingController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    TrackService trackService;

    @PutMapping
    public ResponseEntity<Boolean> invoiceValid(@RequestBody InvoiceRequest request){
        logger.info("송장번호 확인하기 " + request.getHistorySeq() + " " + request.getTrackNumber());
        HttpStatus status;
        Boolean res = false;

        if(trackService.invoiceValid(request)){
            res = true;
            status = HttpStatus.OK;
        }
        else status = HttpStatus.NOT_FOUND;

        return(new ResponseEntity<>(res, status));
    }
}
