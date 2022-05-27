package com.ssafy.woori.domain.track.service;

import com.ssafy.woori.domain.track.dto.InvoiceRequest;

public interface TrackService {

    Boolean invoiceValid(InvoiceRequest request);
}
