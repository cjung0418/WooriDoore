package com.ssafy.woori.domain.follow.service;

import com.ssafy.woori.domain.follow.dto.AddFollowRequest;
import com.ssafy.woori.domain.follow.dto.GetFollowerList;
import com.ssafy.woori.domain.follow.dto.GetFollowingList;
import com.ssafy.woori.domain.follow.dto.ModifyAlarmRequest;
import com.ssafy.woori.entity.Follow;

import java.util.List;
import java.util.Optional;

public interface FollowService {
    Optional<List<GetFollowingList>> followingList(int userSeq);
    Optional<List<GetFollowerList>> followerList(int seller);
    Follow addFollow(AddFollowRequest request);
    boolean deleteFollow(AddFollowRequest request);
    boolean modifyFollowAlarm(ModifyAlarmRequest request);
}
