package com.ssafy.woori.domain.user.dao;

import com.ssafy.woori.domain.user.dto.AlarmInfoResponse;
import com.ssafy.woori.entity.Alarm;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

    Optional<List<AlarmInfoResponse>> findByUserSeq(Integer userSeq);

}
