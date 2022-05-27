package com.ssafy.woori.domain.follow.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ModifyAlarmRequest {
    private Integer userSeq;
    private Integer seller;
    private Boolean alarmIsAllow;
}
