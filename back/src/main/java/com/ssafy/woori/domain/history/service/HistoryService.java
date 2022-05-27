package com.ssafy.woori.domain.history.service;

import com.ssafy.woori.domain.funding.dto.DeliveryList;
import com.ssafy.woori.domain.funding.dto.UserBuyListResponse;
import com.ssafy.woori.domain.history.dto.AddHistoryDTO;
import com.ssafy.woori.entity.History;

import java.util.List;
import java.util.Optional;

public interface HistoryService {
    Optional<List<UserBuyListResponse>> userBuyList(int userSeq);
    Optional<List<UserBuyListResponse>> getBuyerList(int fundingSeq);
    Optional<List<DeliveryList>> getDeliveryList(int fundingSeq);
    boolean changeHistory(int historySeq);
    History addHistory(AddHistoryDTO request);
}
