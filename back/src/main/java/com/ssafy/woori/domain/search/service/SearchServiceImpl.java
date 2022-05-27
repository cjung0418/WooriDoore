package com.ssafy.woori.domain.search.service;

import com.ssafy.woori.domain.search.dao.SearchRepository;
import com.ssafy.woori.domain.search.dto.FundingList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SearchServiceImpl implements SearchService{

    @Autowired
    SearchRepository searchRepository;

    @Override
    public Optional<List<FundingList>> searchFunding(String text, int sort) {
        if(sort == 1){
            return(searchRepository.findListByHot("%"+text+"%"));
        }
        else if(sort == 2){
            return (searchRepository.findAllByFundingTitleContainsOrderByFundingCreateDate(text));
        }
        else if(sort == 3){
            return (searchRepository.findAllByFundingTitleContainsOrderByFundingCreateDateDesc(text));
        }
        return Optional.empty();
    }
}
