package com.ssafy.woori.domain.history.controller;

import com.ssafy.woori.domain.funding.controller.FundingController;
import com.ssafy.woori.domain.history.dto.AddHistoryDTO;
import com.ssafy.woori.domain.history.service.HistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/history")
public class HistoryController {

    public static final Logger logger = LoggerFactory.getLogger(FundingController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private HistoryService historyService;

    @PostMapping
    public ResponseEntity<String> addHistory(@RequestBody AddHistoryDTO request){

        logger.info("펀딩 구매하기 " + request.getUserSeq());
        String message = FAIL;
        HttpStatus status;

        if(historyService.addHistory(request) != null){
            message = SUCCESS;
            status = HttpStatus.OK;
        }
        else status = HttpStatus.NOT_FOUND;

        return (new ResponseEntity<>(message,status));
    }
}
