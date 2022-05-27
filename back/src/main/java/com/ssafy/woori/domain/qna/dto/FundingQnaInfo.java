package com.ssafy.woori.domain.qna.dto;

import lombok.*;

import java.time.LocalDate;

public interface FundingQnaInfo {
    String getUserNickname();
    String getQnaText();
    LocalDate getQnaCreatedDate();
    String getReplyText();
    LocalDate getReplyCreatedDate();
    Boolean getSecret();
}
