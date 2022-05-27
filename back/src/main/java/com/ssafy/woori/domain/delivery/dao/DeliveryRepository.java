package com.ssafy.woori.domain.delivery.dao;

import com.ssafy.woori.domain.delivery.dto.GetLocationResponse;
import com.ssafy.woori.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
    Optional<GetLocationResponse> findByLocationSeq(int locationSeq);

    Optional<Delivery> findFirstByUserSeqOrderByUserDateDesc(int userSeq);

    Optional<List<GetLocationResponse>> findAllByUserSeq(int userSeq);

    boolean existsByUserSeq(int userSeq);
}
