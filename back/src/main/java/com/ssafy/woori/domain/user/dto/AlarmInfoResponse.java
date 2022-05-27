package com.ssafy.woori.domain.user.dto;

import java.time.LocalDate;

public interface AlarmInfoResponse {
	Integer getAlarmSeq();
	Integer getUserSeq();
	Integer getFundingSeq();
	Integer getAlarmType();
	String getAlarmText();
	LocalDate getAlarmDate();
	Boolean getAlarmIsRead();
}
