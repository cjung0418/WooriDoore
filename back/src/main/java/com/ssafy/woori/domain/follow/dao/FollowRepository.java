package com.ssafy.woori.domain.follow.dao;

import com.ssafy.woori.domain.follow.dto.GetFollowerList;
import com.ssafy.woori.domain.follow.dto.GetFollowingList;
import com.ssafy.woori.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    @Query(value = "select f.seller as seller, f.alarmIsAllow as alarmIsAllow, u.userNickname as userNickname from Follow f, User u " +
            "where f.userSeq = :userSeq and f.seller = u.userSeq")
    Optional<List<GetFollowingList>> findAllByUserSeq(int userSeq);
    boolean existsByUserSeq(int userSeq);
//    @Query(value = "select distinct u.userNickname as userNickname, f.userSeq as userSeq from User u, Follow f " +
//            "where f.seller = :seller and u.userSeq not in :seller")
    @Query(value = "select (select u.userNickname  from User u where u.userSeq = f.userSeq) as userNickname, f.userSeq as userSeq " +
            "from Follow f " +
            "where f.seller = :seller")
    Optional<List<GetFollowerList>> findAllBySeller(int seller);
    boolean existsBySeller(int seller);
    boolean existsByUserSeqAndSeller(int userSeq, int seller);
    void deleteByUserSeqAndSeller(int userSeq, int seller);
    Follow findByUserSeqAndSeller(int userSeq, int seller);
}
