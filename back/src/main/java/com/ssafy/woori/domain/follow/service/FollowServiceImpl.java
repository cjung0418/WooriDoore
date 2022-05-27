package com.ssafy.woori.domain.follow.service;

import com.ssafy.woori.domain.follow.dao.FollowRepository;
import com.ssafy.woori.domain.follow.dto.AddFollowRequest;
import com.ssafy.woori.domain.follow.dto.GetFollowerList;
import com.ssafy.woori.domain.follow.dto.GetFollowingList;
import com.ssafy.woori.domain.follow.dto.ModifyAlarmRequest;
import com.ssafy.woori.entity.Follow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FollowServiceImpl implements FollowService{

    @Autowired
    FollowRepository followRepository;

    @Override
    @Transactional
    public Optional<List<GetFollowingList>> followingList(int userSeq) {
        if(!followRepository.existsByUserSeq(userSeq)) return (Optional.empty());
        return (followRepository.findAllByUserSeq(userSeq));
    }

    @Override
    @Transactional
    public Optional<List<GetFollowerList>> followerList(int seller) {
        if(!followRepository.existsBySeller(seller)) return (Optional.empty());
        return (followRepository.findAllBySeller(seller));
    }

    @Override
    public Follow addFollow(AddFollowRequest request) {
        return (followRepository.save(
                Follow.builder()
                        .userSeq(request.getUserSeq())
                        .seller(request.getSeller())
                        .alarmIsAllow(true)
                        .requestDate(LocalDate.now())
                        .build()
        ));
    }

    @Override
    @Transactional
    public boolean deleteFollow(AddFollowRequest request) {
        if(followRepository.existsByUserSeqAndSeller(request.getUserSeq(), request.getSeller())){
            followRepository.deleteByUserSeqAndSeller(request.getUserSeq(), request.getSeller());
            return (true);
        }
        return false;
    }

    @Override
    public boolean modifyFollowAlarm(ModifyAlarmRequest request) {
        if(followRepository.existsByUserSeqAndSeller(request.getUserSeq(), request.getSeller())){
            Follow follow = followRepository.findByUserSeqAndSeller(request.getUserSeq(), request.getSeller());
            followRepository.save(
                    Follow.builder()
                            .followSeq(follow.getFollowSeq())
                            .userSeq(request.getUserSeq())
                            .seller(request.getSeller())
                            .alarmIsAllow(request.getAlarmIsAllow())
                            .requestDate(follow.getRequestDate())
                            .build()
            );

            return (true);
        }

        return (false);
    }
}
