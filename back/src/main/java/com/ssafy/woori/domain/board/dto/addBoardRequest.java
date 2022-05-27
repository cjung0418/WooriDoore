package com.ssafy.woori.domain.board.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class addBoardRequest {
    private Integer boardSeq;
    private Integer fundingSeq;
    private String boardTitle;
    private String boardContent;
}
