package com.ssafy.woori.domain.delivery.dto;

import java.time.LocalDate;

public interface GetLocationResponse {
    Integer getLocationSeq();
    LocalDate getUserDate();
    String getAddress();
    String getAddressDetail();
    String getUserPhone();
    Integer getZipCode();
}
