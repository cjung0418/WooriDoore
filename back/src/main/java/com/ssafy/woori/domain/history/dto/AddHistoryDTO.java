package com.ssafy.woori.domain.history.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddHistoryDTO {
    private Integer userSeq;
    private Integer fundingSeq;
    private Integer optionNum;
    private Integer optionSeq;
 //   private Integer seller;
}
