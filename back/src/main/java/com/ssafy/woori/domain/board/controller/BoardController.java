package com.ssafy.woori.domain.board.controller;

import com.ssafy.woori.domain.board.dto.FundingBoardInfo;
import com.ssafy.woori.domain.board.dto.addBoardRequest;
import com.ssafy.woori.domain.board.service.BoardService;
import com.ssafy.woori.domain.funding.controller.FundingController;
import com.ssafy.woori.entity.Board;
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
@RequestMapping("/funding/board")
public class BoardController {

    public static final Logger logger = LoggerFactory.getLogger(FundingController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private BoardService boardService;

    @GetMapping
    public ResponseEntity<Map<String, Object>>fundingBoard(@RequestParam int fundingSeq){
        logger.info("공지사항 가져오기 " + fundingSeq);
        String message = FAIL;
        HttpStatus status;

        List<FundingBoardInfo> dto = boardService.fundingBoard(fundingSeq);
        Map<String, Object> response = new HashMap<>();

        if(dto != null){
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

    @PostMapping
    public ResponseEntity<Map<String, Object>>addFundingBoard(@RequestBody addBoardRequest request){
        logger.info("공지사항 추가 " +request.getBoardTitle());
        String message;
        HttpStatus status;

        Board board = boardService.addBoard(request);
        Map<String, Object> response = new HashMap<>();

        if(board != null){
            message = SUCCESS;
            response.put("data", board);
            status = HttpStatus.OK;
        }
        else{
            message = FAIL;
            status = HttpStatus.NOT_FOUND;
        }
        response.put("message", message);

        return (new ResponseEntity<>(response, status));
    }

    @PutMapping
    public ResponseEntity<String>modifyFundingBoard(@RequestBody addBoardRequest request){
        logger.info("공지사항 수정 " +request.getBoardTitle());
        String message = SUCCESS;
        HttpStatus status = null;

        if(boardService.modifyBoard(request)){
            message = "SUCCESS";
            status = HttpStatus.OK;
        }
        else{
            message ="FAIL";
            status = HttpStatus.NOT_FOUND;
        }

        return (new ResponseEntity<>(message, status));
    }

    @DeleteMapping
    public ResponseEntity<String>deleteFundingBoard(@RequestParam int boardSeq) {
        logger.info("공지사항 삭제 " + boardSeq);
        String message = FAIL;
        HttpStatus status;

        if(boardService.deleteBoard(boardSeq)) {
            message = SUCCESS;
            status = HttpStatus.OK;
        }
        else{
            status = HttpStatus.NOT_FOUND;
        }

        return (new ResponseEntity<>(message, status));
    }
}
