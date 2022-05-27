package com.ssafy.woori.domain.follow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddFollowRequest {
    private Integer userSeq;
    private Integer seller;
}
