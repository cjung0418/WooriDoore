package com.ssafy.woori.domain.user.service;

import java.util.List;

import com.ssafy.woori.domain.user.dto.AlarmCreateRequest;
import com.ssafy.woori.domain.user.dto.AlarmInfoResponse;
import com.ssafy.woori.domain.user.dto.UserInfoResponse;
import com.ssafy.woori.domain.user.dto.UserProfileRequest;
import com.ssafy.woori.domain.user.dto.UserUpdateRequest;
import com.ssafy.woori.entity.Alarm;
import com.ssafy.woori.entity.User;

public interface UserService {
	List<AlarmInfoResponse> userAlarmList(int userSeq);
	Alarm createAlarm(AlarmCreateRequest request);
	public UserInfoResponse getUserByUserKey(String userkey);
	UserInfoResponse getUser(int userSeq);
	User updateUser(UserUpdateRequest request);
	boolean updateUserProfileImage(UserProfileRequest request);
	boolean deleteUser(int userSeq);
}