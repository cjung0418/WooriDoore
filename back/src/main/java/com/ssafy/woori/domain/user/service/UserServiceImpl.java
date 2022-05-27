package com.ssafy.woori.domain.user.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.woori.domain.file.service.FileServiceImpl;
import com.ssafy.woori.domain.user.dao.AlarmRepository;
import com.ssafy.woori.domain.user.dao.UserRepository;
import com.ssafy.woori.domain.user.dto.AlarmCreateRequest;
import com.ssafy.woori.domain.user.dto.AlarmInfoResponse;
import com.ssafy.woori.domain.user.dto.AuthorizationKakao;
import com.ssafy.woori.domain.user.dto.KakaoUserInfo;
import com.ssafy.woori.domain.user.dto.UserInfoResponse;
import com.ssafy.woori.domain.user.dto.UserProfileRequest;
import com.ssafy.woori.domain.user.dto.UserUpdateRequest;
import com.ssafy.woori.entity.Alarm;
import com.ssafy.woori.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;
    @Autowired
    AlarmRepository alarmRepository;
    
	private final FileServiceImpl fileService;    
	private final Oauth2Kakao oauth2Kakao;

    // 카카오로 인증받기
    public KakaoUserInfo oauth2AuthorizationKakao(String code) {
        AuthorizationKakao authorization = oauth2Kakao.callTokenApi(code);
        return oauth2Kakao.callGetUserByAccessToken(authorization.getAccess_token());
    }

	@Override
	public List<AlarmInfoResponse> userAlarmList(int userSeq) {
		
		Optional<List<AlarmInfoResponse>> response = alarmRepository.findByUserSeq(userSeq);
    	
		return response.orElse(null);
	}
	
	@Override
	public Alarm createAlarm(AlarmCreateRequest request) {
		return (alarmRepository.save(
				Alarm.builder()
				.userSeq(request.getUserSeq())
				.fundingSeq(request.getFundingSeq())
				.alarmType(request.getAlarmType())
				.alarmText(request.getAlarmText())
				.build()
				));
	}

	@Override
	public UserInfoResponse getUser(int userSeq) {
		return userRepository.getByUserSeq(userSeq).orElse(null);
	}

	@Override
	public UserInfoResponse getUserByUserKey(String userkey) {
		return userRepository.getByUserKey(userkey).orElse(null);
	}

	@Override
	public User updateUser(UserUpdateRequest request) {
		Optional<User> user = userRepository.findById(request.getUserSeq());
		user.ifPresent(selectUser -> {
			userRepository.save(User.builder()
					.userSeq(selectUser.getUserSeq())
					.userBirth(request.getUserBirth())
					.userNickname(request.getUserNickname())
					.userPhone(request.getUserPhone())
					.userIntroduce(request.getUserIntroduce())
					.userCompany(request.getUserCompany())
					.userWalletAddress(request.getUserWalletAddress())
					.userEmail(selectUser.getUserEmail())
					.userIsActive(selectUser.getUserIsActive())
					.userCreatedDate(selectUser.getUserCreatedDate())
					.userModifiedDate(selectUser.getUserModifiedDate())
					.userPlatform(selectUser.getUserPlatform())
					.userImage(selectUser.getUserImage())
					.userKey(selectUser.getUserKey())
					.build());
		});
		return user.orElse(null);
	}

	@Override
	public boolean updateUserProfileImage(UserProfileRequest request) {
		boolean result = false;
		try {
			String path = fileService.uploadFile(request.getMyfile()).get(0);
		
			Optional<User> user = userRepository.findById(request.getUserSeq());
			user.ifPresent(selectUser -> {
				userRepository.save(User.builder()
						.userSeq(selectUser.getUserSeq())
						.userEmail(selectUser.getUserEmail())
						.userBirth(selectUser.getUserBirth())
						.userIsActive(selectUser.getUserIsActive())
						.userCreatedDate(selectUser.getUserCreatedDate())
						.userModifiedDate(selectUser.getUserModifiedDate())
						.userNickname(selectUser.getUserNickname())
						.userWalletAddress(selectUser.getUserWalletAddress())
						.userPlatform(selectUser.getUserPlatform())
						.userImage(path)
						.userPhone(selectUser.getUserPlatform())
						.userIntroduce(selectUser.getUserIntroduce())
						.userCompany(selectUser.getUserCompany())
						.userKey(selectUser.getUserKey())
						.build());
			});
			result = true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		return result;
	}

	@Override
	public boolean deleteUser(int userSeq) {
		userRepository.delete(User.builder().userSeq(userSeq).build());
		
		return false;
	}
	
	
}