package com.ssafy.woori.domain.search.dao;

import com.ssafy.woori.domain.search.dto.FundingList;
import com.ssafy.woori.entity.Funding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SearchRepository extends JpaRepository<Funding, Integer>{
    @Query(value = "select f.fundingSeq as fundingSeq, f.fundingImage as fundingImage, f.fundingTitle as fundingTitle, f.fundingSimple as fundingSimple, f.fundingContract as fundingContract from Like l, Funding f " +
            "where l.fundingSeq = f.fundingSeq and f.fundingTitle like :text group by fundingSeq order by count(f.fundingSeq) desc")
    Optional<List<FundingList>> findListByHot(String text);
    Optional<List<FundingList>> findAllByFundingTitleContainsOrderByFundingCreateDate(String fundingTitle);
    Optional<List<FundingList>> findAllByFundingTitleContainsOrderByFundingCreateDateDesc(String fundingTitle);

    @Query(value = "select f.fundingSeq as fundingSeq, f.fundingImage as fundingImage, f.fundingTitle as fundingTitle, f.fundingSimple as fundingSimple, f.fundingContract as fundingContract from Like l, Funding f " +
            "where l.fundingSeq = f.fundingSeq and f.fundingCategory = :categoryNumber group by fundingSeq order by count(f.fundingSeq) desc")
    Optional<List<FundingList>> findListsByCategory(int categoryNumber);
    Optional<List<FundingList>> findAllByFundingCategoryOrderByFundingCreateDate(int categoryNumber);
    Optional<List<FundingList>> findAllByFundingCategoryOrderByFundingCreateDateDesc(int categoryNumber);
}
