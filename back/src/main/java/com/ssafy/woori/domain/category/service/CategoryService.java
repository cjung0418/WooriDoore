package com.ssafy.woori.domain.category.service;

import com.ssafy.woori.domain.category.dto.GetListResponse;
import com.ssafy.woori.domain.search.dto.FundingList;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    Optional<List<GetListResponse>> getCategory();
    Optional<List<FundingList>> categoryLists(int categoryNumber, int sort);
}
