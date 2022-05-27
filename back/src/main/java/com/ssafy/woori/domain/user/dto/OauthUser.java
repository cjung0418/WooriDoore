package com.ssafy.woori.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class OauthUser{

	private String userPlatform;
	private String userKey;
	private String userNickname;
	private String userEmail;
	
}
