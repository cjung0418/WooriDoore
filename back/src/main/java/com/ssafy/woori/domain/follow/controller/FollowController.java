package com.ssafy.woori.domain.follow.controller;

import com.ssafy.woori.domain.follow.dto.AddFollowRequest;
import com.ssafy.woori.domain.follow.dto.GetFollowerList;
import com.ssafy.woori.domain.follow.dto.GetFollowingList;
import com.ssafy.woori.domain.follow.dto.ModifyAlarmRequest;
import com.ssafy.woori.domain.follow.service.FollowService;
import com.ssafy.woori.domain.funding.controller.FundingController;
import com.ssafy.woori.entity.Follow;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/follow")
public class FollowController {

    public static final Logger logger = LoggerFactory.getLogger(FundingController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    FollowService followService;

    @GetMapping("/followings")
    public ResponseEntity<Map<String,Object>> followingList(@RequestParam int userSeq){
        logger.info("내가 팔로우한 리스트 가져오기 " + userSeq);
        String message = FAIL;
        HttpStatus status = null;

        Optional<List<GetFollowingList>> dto = followService.followingList(userSeq);
        Map<String, Object> response = new HashMap<>();

        if(dto.isPresent()){
            message = SUCCESS;
            status = HttpStatus.OK;
            response.put("data", dto);
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);
        return (new ResponseEntity<>(response, status));
    }

    @GetMapping("/followers")
    public ResponseEntity<Map<String, Object>>followerList(@RequestParam int seller){
        logger.info("나를 팔로우한 리스트 가져오기 " + seller);
        String message = FAIL;
        HttpStatus status;

        Optional<List<GetFollowerList>> dto = followService.followerList(seller);
        Map<String, Object> response = new HashMap<>();

        if(dto.isPresent()){
            message = SUCCESS;
            status = HttpStatus.OK;
            response.put("data", dto);
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);
        return (new ResponseEntity<>(response, status));
    }

    @PostMapping
    public ResponseEntity<String> addFollow(@RequestBody AddFollowRequest request){
        logger.info("팔로우 추가 " + request.getUserSeq());
        String message = FAIL;
        HttpStatus status;

        Follow follow = followService.addFollow(request);

        if(follow != null){
            message = SUCCESS;
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }
        return (new ResponseEntity<>(message, status));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFollow(@RequestBody AddFollowRequest request){
        logger.info("팔로우 삭제 " + request.getUserSeq());
        String message = FAIL;
        HttpStatus status;

        if(followService.deleteFollow(request)){
            message = SUCCESS;
            status = HttpStatus.OK;
        }
        else status = HttpStatus.NOT_FOUND;

        return (new ResponseEntity<>(message, status));
    }

    @PutMapping("/alarm")
    public ResponseEntity<String> modifyFollowAlarm(@RequestBody ModifyAlarmRequest request){
        logger.info("팔로우 알림 상태 변경 " + request.getUserSeq());
        String message = FAIL;
        HttpStatus status;

        if(followService.modifyFollowAlarm(request)){
            status = HttpStatus.OK;
            message = SUCCESS;
        }
        else status = HttpStatus.NOT_FOUND;

        return (new ResponseEntity<>(message, status));
    }
}
