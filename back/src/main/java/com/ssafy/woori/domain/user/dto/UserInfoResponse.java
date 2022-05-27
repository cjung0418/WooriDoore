package com.ssafy.woori.domain.user.dto;

import java.time.LocalDate;

import com.ssafy.woori.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserInfoResponse {
	private int userSeq;
	private String userEmail;
	private LocalDate userBirth;
	private LocalDate userCreatedDate;
	private LocalDate userModifiedDate;
	private String userNickname;
	private String userWalletAddress;
	private String userPlatform;
	private String userImage;
	private String userPhone;
	private String userIntroduce;
	private String userCompany;

	public UserInfoResponse(User user) {
		this.userSeq = user.getUserSeq();
		this.userEmail = user.getUserEmail();
		this.userBirth = user.getUserBirth();
		this.userCreatedDate = user.getUserCreatedDate();
		this.userNickname = user.getUserNickname();
		this.userModifiedDate = user.getUserModifiedDate();
		this.userWalletAddress = user.getUserWalletAddress();
		this.userPlatform = user.getUserPlatform();
		this.userImage = user.getUserImage();
		this.userPhone = user.getUserPhone();
		this.userIntroduce = user.getUserIntroduce();
		this.userCompany = user.getUserCompany();
	}
	
}
