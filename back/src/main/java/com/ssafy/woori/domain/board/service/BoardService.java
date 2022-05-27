package com.ssafy.woori.domain.board.service;

import com.ssafy.woori.domain.board.dto.FundingBoardInfo;
import com.ssafy.woori.domain.board.dto.addBoardRequest;
import com.ssafy.woori.entity.Board;

import java.util.List;
import java.util.Optional;

public interface BoardService {
    Board addBoard(addBoardRequest request);
    boolean deleteBoard(int boardSeq);
    boolean modifyBoard(addBoardRequest request);
    List<FundingBoardInfo> fundingBoard(int fundingSeq);
}
