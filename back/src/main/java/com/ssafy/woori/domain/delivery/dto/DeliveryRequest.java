package com.ssafy.woori.domain.delivery.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryRequest {
    private Integer locationSeq;
    private Integer userSeq;
    private String address;
    private String addressDetail;
    private String userPhone;
    private Integer zipCode;
}
