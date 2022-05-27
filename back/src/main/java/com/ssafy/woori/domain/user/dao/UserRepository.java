package com.ssafy.woori.domain.user.dao;

import com.ssafy.woori.domain.user.dto.UserInfoResponse;
import com.ssafy.woori.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	 boolean existsByUserKeyAndUserPlatform(String userKey, String userPlatform);

	 Optional<UserInfoResponse> getByUserSeq(int userSeq);
	 Optional<UserInfoResponse> getByUserKey(String userKey);

}
