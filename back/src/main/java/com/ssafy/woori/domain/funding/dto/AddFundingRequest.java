package com.ssafy.woori.domain.funding.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddFundingRequest {
    private Integer userSeq;
    private String userNickname;
    private String userPhone;
    private String userIntroduce;
    private String fundingTitle;
    private String fundingSimple;
    private Integer fundingCategory;
    private String fundingText;
    private String fundingWarning;
    private String fundingContract;
    private AddOptionRequest[] option;
}
