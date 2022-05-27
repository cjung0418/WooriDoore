package com.ssafy.woori.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AlarmCreateRequest {
    private int userSeq;
    private int fundingSeq;
    private int alarmType;
    private String alarmText;

}
