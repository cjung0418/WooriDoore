package com.ssafy.woori.domain.user.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserUpdateRequest {
	private int userSeq;
	private LocalDate userBirth;
	private String userNickname;
	private String userPhone;
	private String userIntroduce;
	private String userCompany;
	private String userWalletAddress;
	
}
