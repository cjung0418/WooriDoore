package com.ssafy.woori.domain.track.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InvoiceRequest {
    String trackNumber;
    Integer historySeq;
}
