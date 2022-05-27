package com.ssafy.woori.domain.board.dto;

import java.time.LocalDate;

public interface FundingBoardInfo {
    String getBoardTitle();
    String getBoardContent();
    LocalDate getBoardCreatedDate();
}
