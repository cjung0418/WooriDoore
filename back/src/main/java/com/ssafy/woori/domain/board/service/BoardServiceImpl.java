package com.ssafy.woori.domain.board.service;

import com.ssafy.woori.domain.board.dao.BoardRepository;
import com.ssafy.woori.domain.board.dto.FundingBoardInfo;
import com.ssafy.woori.domain.board.dto.addBoardRequest;
import com.ssafy.woori.entity.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardRepository boardRepository;

    @Override
    public List<FundingBoardInfo> fundingBoard(int fundingSeq) {

        List<FundingBoardInfo> response = boardRepository.findByFundingSeq(fundingSeq);

        return response;
    }

    @Override
    public Board addBoard(addBoardRequest request) {

        return (boardRepository.save(
                Board.builder()
                .fundingSeq(request.getFundingSeq())
                .boardTitle(request.getBoardTitle())
                .boardContent(request.getBoardContent())
                .boardCreatedDate(LocalDate.now())
                .boardModifiedDate(LocalDate.now())
                .build()));
    }

    @Override
    public boolean modifyBoard(addBoardRequest request) {
        Optional<Board> board = boardRepository.findById(request.getBoardSeq());

        if(!board.isPresent()) return (false);  // 값이 존재하지 않음

        board.ifPresent(selectBoard ->{
            boardRepository.save(
                    Board.builder()
                            .boardSeq((selectBoard.getBoardSeq()))
                            .fundingSeq(selectBoard.getFundingSeq())
                            .boardTitle(request.getBoardTitle())
                            .boardContent(request.getBoardContent())
                            .boardCreatedDate(selectBoard.getBoardCreatedDate())
                            .boardModifiedDate(LocalDate.now())
                            .build()
            );

        });
        return (true);
    }

    @Override
    public boolean deleteBoard(int boardSeq) {
        if(boardRepository.findById(boardSeq).isPresent()){ //삭제할값이 존재
            boardRepository.deleteById(boardSeq);
            return (true);
        }
        else return (false);
    }
}
