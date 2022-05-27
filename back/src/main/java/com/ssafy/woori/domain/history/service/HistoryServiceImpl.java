package com.ssafy.woori.domain.history.service;

import com.ssafy.woori.domain.funding.dao.FundingRepository;
import com.ssafy.woori.domain.funding.dto.DeliveryList;
import com.ssafy.woori.domain.funding.dto.UserBuyListResponse;
import com.ssafy.woori.domain.funding.repository.HistoryRepository;
import com.ssafy.woori.domain.history.dto.AddHistoryDTO;
import com.ssafy.woori.entity.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistoryServiceImpl implements HistoryService{

    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    FundingRepository fundingRepository;

    @Override
    public Optional<List<UserBuyListResponse>> userBuyList(int userSeq) {
        return (historyRepository.findByUserSeq(userSeq));
    }

    @Override
    public Optional<List<UserBuyListResponse>> getBuyerList(int fundingSeq) {
        return (historyRepository.getBuyerList(fundingSeq));
    }

    @Override
    public boolean changeHistory(int historySeq) {
        Optional<History> history = historyRepository.findById(historySeq);

        if(!history.isPresent()) return (false);

        history.ifPresent(selectHistory ->{
           historyRepository.save(
                   History.builder()
                           .historySeq(historySeq)
                           .fundingSeq(selectHistory.getFundingSeq())
                           .optionNum(selectHistory.getOptionNum())
                           .optionSeq(selectHistory.getOptionSeq())
                           .state(3)
                           .userSeq(selectHistory.getUserSeq())
                           .seller(selectHistory.getSeller())
//                           .seller(fundingRepository.getSeller(selectHistory.getFundingSeq()))
                           .build()
           );
        });
        return (true);
    }

    @Override
    public History addHistory(AddHistoryDTO request) {
        return (historyRepository.save(
                History.builder()
                        .fundingSeq(request.getFundingSeq())
                        .optionNum(request.getOptionNum())
                        .optionSeq(request.getOptionSeq())
                        .state(1)
                        .userSeq(request.getUserSeq())
//                        .seller(request.getSeller())
                        .seller(fundingRepository.getSeller(request.getFundingSeq()))
                        .build()
        ));
    }

	@Override
	public Optional<List<DeliveryList>> getDeliveryList(int fundingSeq) {
		return (fundingRepository.getDeliveryList(fundingSeq));
	}
}
