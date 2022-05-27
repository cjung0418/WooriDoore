package com.ssafy.woori.domain.user.dto;

import org.json.simple.JSONObject;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class KakaoUserInfo {
	private String id;
	private String connected_at;
	private JSONObject kakao_account;
}
