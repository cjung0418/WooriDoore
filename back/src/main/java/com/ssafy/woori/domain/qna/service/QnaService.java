package com.ssafy.woori.domain.qna.service;

import com.ssafy.woori.domain.qna.dto.FundingQnaInfo;
import com.ssafy.woori.domain.qna.dto.addQnaRequest;
import com.ssafy.woori.entity.Qna;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface QnaService {
    Qna addQna(addQnaRequest request);
    boolean deleteQna(int qnaSeq);
    boolean modifyQna(addQnaRequest request);
    Optional<List<Map<String,Object>>> fundingQna(int fundingSeq);
}
