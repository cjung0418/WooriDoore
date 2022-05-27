package com.ssafy.woori.domain.category.controller;

import com.ssafy.woori.domain.category.dto.GetListResponse;
import com.ssafy.woori.domain.category.service.CategoryService;
import com.ssafy.woori.domain.funding.controller.FundingController;
import com.ssafy.woori.domain.search.dto.FundingList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    public static final Logger logger = LoggerFactory.getLogger(FundingController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCategory(){
        logger.info("카테고리 리스트 가져오기");
        String message = FAIL;
        HttpStatus status = null;

        Optional<List<GetListResponse>> dto = categoryService.getCategory();
        Map<String,Object> response = new HashMap<>();
        if(dto.isPresent()){
            message = SUCCESS;
            status = HttpStatus.OK;
            response.put("data", dto);
            System.out.println(dto.get());
        }
        else status = HttpStatus.NOT_FOUND;
        response.put("message", message);

        return (new ResponseEntity<>(response, status));
    }

    @GetMapping("/lists")
    public ResponseEntity<Map<String,Object>> categoryLists(@RequestParam int categoryNumber, @RequestParam int sort){
        logger.info("특정 카테고리 리스트 가져오기 " + categoryNumber + " " + sort);
        String message = FAIL;
        HttpStatus status = null;

        Map<String,Object> response = new HashMap<>();
        Optional<List<FundingList>> dto = categoryService.categoryLists(categoryNumber, sort);

        if(dto.isPresent()){
            message = SUCCESS;
            status = HttpStatus.OK;
            response.put("data", dto);
        }
        else status = HttpStatus.NOT_FOUND;
        response.put("messages", message);

        return (new ResponseEntity<>(response, status));
    }
}
