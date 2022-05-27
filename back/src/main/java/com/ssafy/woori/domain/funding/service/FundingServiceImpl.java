package com.ssafy.woori.domain.funding.service;

import com.ssafy.woori.domain.file.service.FileService;
import com.ssafy.woori.domain.funding.dao.FundingRepository;
import com.ssafy.woori.domain.funding.dao.OptionRepository;
import com.ssafy.woori.domain.funding.dto.*;
import com.ssafy.woori.entity.Funding;
import com.ssafy.woori.entity.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FundingServiceImpl implements FundingService{

    @Autowired
    FundingRepository fundingRepository;

    @Autowired
    OptionRepository optionRepository;

    @Autowired
    FileService fileService;

    @Override
    public Optional<List<FundingListResponse>> fundingList(int sort) {

        if(sort == 1){
            return (fundingRepository.findBaseList());
        }
        else if(sort == 2){
            return (fundingRepository.findNewList());
        }
        else if(sort == 3){
            return (fundingRepository.findLikeList());
        }
        else{
            return (Optional.empty());
        }
    }

    @Override
    public Optional<FundingInfoResponse> fundingInfo(int fundingSeq) {

        Optional<FundingInfoResponse> response = fundingRepository.findByFundingSeq(fundingSeq);

        //if(response.isPresent()) return (response);

//        Optional<Funding> funding = fundingDao.findById(fundingSeq);
//
//        FundingInfoResponse response;// = FundingInfoResponse.builder().build();
//
//        funding.ifPresent(selectFunding ->{
//
//        });
        return response;
    }

    @Override
    public Optional<List<OptionListResponse>> getOptions(int fundingSeq) {
        return fundingRepository.findOptions(fundingSeq);
        //return Optional.empty();
    }

    @Override
    //@Transactional
    public Funding addFunding(AddFundingRequest request, MultipartFile[] file) throws IOException {
        // 파일 추가하는것도 존재해야함
        String imgPath = fileService.uploadFile(file).get(0);

        if(imgPath == null) imgPath="";

        Funding funding = fundingRepository.save(
                Funding.builder()
                        .userSeq(request.getUserSeq())
                        .userNickname(request.getUserNickname())
                        .userPhone(request.getUserPhone())
                        .fundingTitle(request.getFundingTitle())
                        .fundingSimple(request.getFundingSimple())
                        .fundingCategory(request.getFundingCategory())
                        .fundingImage(imgPath)
                        .fundingText(request.getFundingText())
                        .fundingWarning(request.getFundingWarning())
                        .fundingContract(request.getFundingContract())
                        .build()
        );

        for(int i = 0; i < request.getOption().length; i++){
            optionRepository.save(
                    Option.builder()
                            .fundingSeq(funding.getFundingSeq())
                            .optionTitle(request.getOption()[i].getOptionTitle())
                            .optionPrice(request.getOption()[i].getOptionPrice())
                            .optionText(request.getOption()[i].getOptionText())
                            .optionMaxamount(request.getOption()[i].getOptionMaxamount())
                            .optionOrder(i)
                            .build()
            );
        }

        return (funding);
    }

    @Override
    public boolean deleteFunding(int fundingSeq) {
        if(fundingRepository.findById(fundingSeq).isPresent()){
            fundingRepository.deleteById(fundingSeq);
            return (true);
        }
        return false;
    }

    @Override
    public FundingTopResponse getFunding(int fundingSeq) {

        Optional<GetTopValues> dto = fundingRepository.findTopValues(fundingSeq);
        Optional<List<GetOptionList>> options = optionRepository.getOptionsList(fundingSeq);

        if(dto.isPresent() && options.isPresent()){
            FundingTopResponse response = new FundingTopResponse(
                    dto.get().getFundingTitle(),
                    dto.get().getUserSeq(),
                    dto.get().getFundingImage(),
                    dto.get().getFundingSimple(),
                    dto.get().getUserNickname(),
                    dto.get().getFundingContract(),
                    options.get()
            );
            return (response);
        }
        return null;
    }

    @Override
    public List<FundingTopResponse> getSellList(int userSeq) {

        Optional<List<GetSellList>> dto = fundingRepository.findAllByUserSeq(userSeq);

        List<FundingTopResponse> lists = new ArrayList<>();
        if(dto.isPresent()){
            for(GetSellList tmp : dto.get()){
                lists.add(
                        FundingTopResponse
                                .builder()
                                .fundingContract(tmp.getFundingContract())
                                .fundingSimple(tmp.getFundingSimple())
                                .userSeq(tmp.getUserSeq())
                                .fundingTitle(tmp.getFundingTitle())
                                .fundingImage(tmp.getFundingImage())
                                .option(optionRepository.getOptionsList(tmp.getFundingSeq()).get())
                                .build()
                );
            }
        }

        return (lists);
    }

	@Override
	public List<DeliveryList> getDeliveryList(int fundingSeq) {
		return fundingRepository.getDeliveryList(fundingSeq).orElse(null);
	}
}
