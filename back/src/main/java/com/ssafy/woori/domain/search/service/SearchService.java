package com.ssafy.woori.domain.search.service;

import com.ssafy.woori.domain.search.dto.FundingList;

import java.util.List;
import java.util.Optional;

public interface SearchService {

    Optional<List<FundingList>> searchFunding(String text, int sort);
}
