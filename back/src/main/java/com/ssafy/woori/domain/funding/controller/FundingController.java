package com.ssafy.woori.domain.funding.controller;

import com.ssafy.woori.domain.funding.dto.*;
import com.ssafy.woori.domain.history.service.HistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ssafy.woori.domain.funding.service.FundingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/funding")
public class FundingController {

    public static final Logger logger = LoggerFactory.getLogger(FundingController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private FundingService fundingService;

    @Autowired
    private HistoryService historyService;

    @PostMapping
    public ResponseEntity<String> addFunding(@RequestPart AddFundingRequest request,
                                            @RequestPart(required = false) MultipartFile[] file) throws IOException {

        logger.info("펀딩 등록하기 " + request.getUserSeq());
        String message = FAIL;
        HttpStatus status = null;

        if(fundingService.addFunding(request, file) != null){
            message = SUCCESS;
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }

        return (new ResponseEntity<>(message, status));
    }

    @GetMapping("/lists/{sort}")
    public ResponseEntity<Map<String, Object>> fundingList(@PathVariable int sort){
        logger.info("펀딩 리스트 조회" + sort);
        String message = FAIL;
        HttpStatus status;

        Map<String,Object> response = new HashMap<>();
        Optional<List<FundingListResponse>> dto = fundingService.fundingList(sort);

        if(dto.isPresent()){
            message = SUCCESS;
            response.put("data", dto);
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);

        return (new ResponseEntity<>(response, status));
    }

    @GetMapping("/lists/buy")
    public ResponseEntity<Map<String,Object>>userBuyList(@RequestParam int userSeq){
        logger.info("구매목록 리스트 가져오기 " + userSeq);
        String message = FAIL;
        HttpStatus status;

        Map<String, Object> response = new HashMap<>();
        Optional<List<UserBuyListResponse>> dto = historyService.userBuyList(userSeq);

        if(dto.isPresent() && dto.get().size() != 0){
            status = HttpStatus.OK;
            message = SUCCESS;
            response.put("data", dto);
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);
        return (new ResponseEntity<>(response, status));
    }

    @GetMapping("/lists/sell")
    public ResponseEntity<Map<String, Object>> userSellList(@RequestParam int userSeq){
        logger.info("판매 리스트 가져오기 " + userSeq);
        String message = FAIL;
        HttpStatus status;

        Map<String, Object> response = new HashMap<>();
        List<FundingTopResponse> dto = fundingService.getSellList(userSeq);

        if(!dto.isEmpty()){
            response.put("data", dto);
            message = SUCCESS;
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);

        return (new ResponseEntity<>(response, status));
    }

    @GetMapping("/introduce")
    public ResponseEntity<Map<String,Object>>fundingInfo(@RequestParam int fundingSeq){
        logger.info("상품소개 가져오기 " + fundingSeq);
        String message = FAIL;
        HttpStatus status;

        Optional<FundingInfoResponse> dto = fundingService.fundingInfo(fundingSeq);
        Map<String, Object> response = new HashMap<>();

        if(dto.isPresent()){
            message = SUCCESS;
            response.put("data",dto);
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);
        return (new ResponseEntity<>(response, status));
    }

    @GetMapping("/options")
    public ResponseEntity<Map<String, Object>> getOptions(@RequestParam int fundingSeq){
        logger.info("결제 옵션 가져오기 " + fundingSeq);
        String message = FAIL;
        HttpStatus status;

        System.out.println(fundingSeq);
        Optional<List<OptionListResponse>> dto = fundingService.getOptions(fundingSeq);
        Map<String, Object> response = new HashMap<>();

        if(dto.isPresent()){
            message = SUCCESS;
            response.put("data", dto);
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);
        return (new ResponseEntity<>(response, status));
    }

    @DeleteMapping("/{fundingSeq}")
    public ResponseEntity<String> deleteFunding(@PathVariable int fundingSeq){
        logger.info("펀딩 삭제하기 " + fundingSeq);
        String message = FAIL;
        HttpStatus status;

        if(fundingService.deleteFunding(fundingSeq)){
            message = SUCCESS;
            status = HttpStatus.OK;
        }
        else status = HttpStatus.NOT_FOUND;


        return (new ResponseEntity<>(message, status));
    }

    @GetMapping("/top/{fundingSeq}")
    public ResponseEntity<Map<String,Object>> getFunding(@PathVariable int fundingSeq){
        logger.info("펀딩 상단정보 가져오기 " + fundingSeq);
        String message = FAIL;
        HttpStatus status = HttpStatus.OK;

        Map<String, Object> response = new HashMap<>();
        FundingTopResponse dto = fundingService.getFunding(fundingSeq);

        if(dto != null){
            message = SUCCESS;
            status = HttpStatus.OK;
            response.put("data", dto);
        }
        else {
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);


        return (new ResponseEntity<>(response, status));
    }

    @GetMapping("/lists/buyer/{fundingSeq}")
    public ResponseEntity<Map<String,Object>> getBuyerList(@PathVariable int fundingSeq){
        logger.info("펀딩 구매자 목록 가져오기(판매자 입장) " + fundingSeq);
        String message = FAIL;
        HttpStatus status = HttpStatus.OK;

        Map<String, Object> response = new HashMap<>();
        Optional<List<UserBuyListResponse>> dto = historyService.getBuyerList(fundingSeq);

        if(dto.isPresent()){
            message = SUCCESS;
            status = HttpStatus.OK;
            response.put("data", dto);
        }
        else {
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);


        return (new ResponseEntity<>(response, status));
    }
    
    @GetMapping("/lists/delivery/{fundingSeq}")
    public ResponseEntity<Map<String,Object>> getDeliveryList(@PathVariable int fundingSeq){
        logger.info("펀딩 구매 리스트 가져오기 " + fundingSeq);
        String message = FAIL;
        HttpStatus status = HttpStatus.OK;

        Map<String, Object> response = new HashMap<>();
        List<DeliveryList> dto = fundingService.getDeliveryList(fundingSeq);

        if(dto != null){
            message = SUCCESS;
            status = HttpStatus.OK;
            response.put("data", dto);
        }
        else {
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);


        return (new ResponseEntity<>(response, status));
    }
}
