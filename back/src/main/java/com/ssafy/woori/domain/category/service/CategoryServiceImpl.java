package com.ssafy.woori.domain.category.service;

import com.ssafy.woori.domain.category.dao.CategoryRepository;
import com.ssafy.woori.domain.category.dto.GetListResponse;
import com.ssafy.woori.domain.search.dao.SearchRepository;
import com.ssafy.woori.domain.search.dto.FundingList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    SearchRepository searchRepository;

    @Override
    public Optional<List<GetListResponse>> getCategory() {
        return categoryRepository.findAllBy();
    }

    @Override
    public Optional<List<FundingList>> categoryLists(int categoryNumber, int sort) {
        if(sort == 1){
            return (searchRepository.findListsByCategory(categoryNumber));
        }
        else if(sort == 2){
            return (searchRepository.findAllByFundingCategoryOrderByFundingCreateDate(categoryNumber));
        }
        else if(sort == 3){
            return (searchRepository.findAllByFundingCategoryOrderByFundingCreateDateDesc(categoryNumber));
        }
        return Optional.empty();
    }
}
