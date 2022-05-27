package com.ssafy.woori.domain.board.dao;

import com.ssafy.woori.domain.board.dto.FundingBoardInfo;
import com.ssafy.woori.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
    List<FundingBoardInfo> findByFundingSeq(int fundingSeq);
}
