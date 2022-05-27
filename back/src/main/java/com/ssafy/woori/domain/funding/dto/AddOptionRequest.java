package com.ssafy.woori.domain.funding.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddOptionRequest {
    private String optionTitle;
    private Integer optionPrice;
    private String optionText;
    private Integer optionMaxamount;
}
