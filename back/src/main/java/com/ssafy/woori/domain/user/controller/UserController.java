package com.ssafy.woori.domain.user.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.woori.domain.user.dto.AlarmCreateRequest;
import com.ssafy.woori.domain.user.dto.AlarmInfoResponse;
import com.ssafy.woori.domain.user.dto.UserInfoResponse;
import com.ssafy.woori.domain.user.dto.UserProfileRequest;
import com.ssafy.woori.domain.user.dto.UserUpdateRequest;
import com.ssafy.woori.domain.user.service.UserServiceImpl;
import com.ssafy.woori.entity.Alarm;
import com.ssafy.woori.entity.User;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserServiceImpl userService;
    private final String SUCCESS = "success";
    private final String FAIL = "error";
    
	@GetMapping("/login")
	public void postLoginProcessing(HttpServletRequest request, HttpServletResponse httpServletResponse) throws IOException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserInfoResponse response = userService.getUserByUserKey(authentication.getName());
		
		log.info("login Success - user: " + response.getUserNickname());
		HttpSession session = request.getSession();
		session.setAttribute("user", response);
		httpServletResponse.sendRedirect("https://j6a305.p.ssafy.io/");
	}
	
	@ApiOperation(value = "loginCheck", notes = "메인페이지가 켜질 때 마다 이걸로 로그인 여부를 체크해야 할거 같습니다. null이 반환되면 로그인이 안된거, user이 반환되면 로그인이 된 상태입니다.")
	@GetMapping("/check")
	public ResponseEntity<UserInfoResponse> loginCheck(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
        if (session == null) {
            return null;
        }
        UserInfoResponse loginUser = (UserInfoResponse) session.getAttribute("user");

        if (loginUser == null) {
            return null;
        }
		return new ResponseEntity<UserInfoResponse>(loginUser, HttpStatus.OK);
	}
	
	@ApiOperation(value = "logout", notes = "저장된 로그인 유저의 세션을 날립니다. 로그아웃에 걸고 메인페이지로 가게 해서 check에서 null을 반환 받는걸로 로그아웃 처리를 해야할거 같아요.")
	@GetMapping("/logout")
	public void logout(HttpServletRequest request){
		request.getSession().invalidate();
	}
	
	
    @GetMapping("/{userSeq}")
    public ResponseEntity<UserInfoResponse> userInfo(@PathVariable int userSeq){
    	UserInfoResponse response = userService.getUser(userSeq);
    	
    	return new ResponseEntity<UserInfoResponse>(response, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<User> updateUser(@RequestBody UserUpdateRequest request){
    	
    	return new ResponseEntity<User>(userService.updateUser(request), HttpStatus.OK);
    }
    
    @PatchMapping("/profileImage/{userSeq}")
    public ResponseEntity<String> updateUserProfileImage(
    		@RequestPart(value="file", required = false) MultipartFile[] file,
    		@PathVariable int userSeq){
    	// 파일입력받아서 수정
    	UserProfileRequest request = UserProfileRequest.builder()
    			.userSeq(userSeq)
    			.myfile(file)
    			.build();
    	
    	String result = "";
    	if (userService.updateUserProfileImage(request)) {
    		result = SUCCESS;
    	}else{
    		result = FAIL;
    	}
    	return new ResponseEntity<String>(result, HttpStatus.OK);
    }
    
    @DeleteMapping("/{userSeq}")
    public ResponseEntity<String> deleteUser(@PathVariable int userSeq){
    	
    	return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }
    
    @PostMapping("/alarm")
    public ResponseEntity<Alarm> createAlarm(@RequestBody AlarmCreateRequest request){
    	
    	return new ResponseEntity<Alarm>(userService.createAlarm(request), HttpStatus.OK);
    }

    @GetMapping("/alarms/{userSeq}")
    public ResponseEntity<List<AlarmInfoResponse>> userAlarmList(@PathVariable int userSeq){
    	List<AlarmInfoResponse> response = userService.userAlarmList(userSeq);
    	 
    	return new ResponseEntity<List<AlarmInfoResponse>>(response, HttpStatus.OK);
    }
    
}