package com.ssafy.woori.domain.delivery.service;

import com.ssafy.woori.domain.delivery.dto.DeliveryRequest;
import com.ssafy.woori.domain.delivery.dto.GetLocationResponse;
import com.ssafy.woori.entity.Delivery;

import java.util.List;
import java.util.Optional;

public interface DeliveryService {
    Optional<GetLocationResponse> getLocation(Integer locationSeq);
    Delivery createDelivery(DeliveryRequest request);
    boolean updateDelivery(DeliveryRequest request);
    boolean setLastUsedDate(int locationSeq);
    Optional<Delivery> lastUsedLocation(int userSeq);
    Optional<List<GetLocationResponse>> locationList(int userSeq);
    boolean deleteDelivery(int locationSeq);
}
