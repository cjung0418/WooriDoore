package com.ssafy.woori.domain.reply.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class addReplyRequest {
    private Integer replySeq;
    private Integer qnaSeq;
    private String replyText;
}
