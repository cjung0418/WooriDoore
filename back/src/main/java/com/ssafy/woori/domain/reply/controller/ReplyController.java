package com.ssafy.woori.domain.reply.controller;

import com.ssafy.woori.domain.funding.controller.FundingController;
import com.ssafy.woori.domain.reply.dto.addReplyRequest;
import com.ssafy.woori.domain.reply.service.ReplyService;
import com.ssafy.woori.entity.Reply;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/funding/reply")
public class ReplyController {

    public static final Logger logger = LoggerFactory.getLogger(FundingController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private ReplyService replyService;

    @PostMapping
    public ResponseEntity<Map<String, Object>>addFundingReply(@RequestBody addReplyRequest request) {
        logger.info("댓글 추가 " +request);
        String message = FAIL;
        HttpStatus status;

        Reply reply = replyService.addReply(request);
        Map<String, Object> response = new HashMap<>();

        if(reply != null){
            message = SUCCESS;
            response.put("data", reply);
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);

        return (new ResponseEntity<>(response, status));
    }

    @PutMapping
    public ResponseEntity<String> modifyFundingReply(@RequestBody addReplyRequest request){
        logger.info("댓글 수정 " +request.getReplySeq());
        String response = FAIL;
        HttpStatus status;

        if(replyService.modifyReply(request)){
            response = SUCCESS;
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }

        return (new ResponseEntity<>(response, status));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFundingReply(@RequestParam int replySeq){
        logger.info("댓글 삭제 " + replySeq);
        String message = FAIL;
        HttpStatus status;

        if(replyService.deleteReply(replySeq)){
            message = SUCCESS;
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }

        return (new ResponseEntity<>(message, status));
    }
}
