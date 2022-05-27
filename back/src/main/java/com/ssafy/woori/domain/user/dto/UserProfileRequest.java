package com.ssafy.woori.domain.user.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class UserProfileRequest {
	private MultipartFile[] myfile;
	private int userSeq;
	private String userImage;
}
