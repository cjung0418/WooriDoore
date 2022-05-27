package com.ssafy.woori.domain.funding.dao;

import com.ssafy.woori.domain.funding.dto.GetOptionList;
import com.ssafy.woori.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OptionRepository extends JpaRepository<Option, Integer> {

    @Query(value = "select o.optionTitle as optionTitle, o.optionPrice as optionPrice, " +
            "o.optionText as optionText, o.optionMaxamount as optionMaxamount from Option o where o.fundingSeq = :fundingSeq")
    Optional<List<GetOptionList>> getOptionsList(int fundingSeq);
}
