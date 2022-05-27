package com.ssafy.woori.domain.qna.service;

import com.ssafy.woori.domain.qna.dao.QnaRepository;
import com.ssafy.woori.domain.qna.dto.FundingQnaInfo;
import com.ssafy.woori.domain.qna.dto.addQnaRequest;
import com.ssafy.woori.entity.Qna;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QnaServiceImpl implements QnaService{

    @Autowired
    QnaRepository qnaRepository;

    @Override
    public Qna addQna(addQnaRequest request) {

        return (qnaRepository.save(
                Qna.builder()
                        .fundingSeq(request.getFundingSeq())
                        .userSeq(request.getUserSeq())
                        .qnaTitle(request.getQnaTitle())
                        .qnaText(request.getQnaText())
//                        .isPublic(request.isPublic())
                        .secret(request.getSecret())
                        .qnaCreatedDate(LocalDate.now())
                        .qnaModifiedDate(LocalDate.now())
                        .build()));
    }

    @Override
    public boolean modifyQna(addQnaRequest request) {
        Optional<Qna> qna =qnaRepository.findById(request.getQnaSeq());

        if(!qna.isPresent()) return (false);

        qna.ifPresent(selectQna ->{
            qnaRepository.save(
                Qna.builder()
                        .qnaSeq(selectQna.getQnaSeq())
                        .fundingSeq(selectQna.getFundingSeq())
                        .userSeq(selectQna.getUserSeq())
                        .qnaTitle(request.getQnaTitle())
                        .qnaText(request.getQnaText())
                        .secret(request.getSecret())
                        .qnaCreatedDate(selectQna.getQnaCreatedDate())
                        .qnaModifiedDate(LocalDate.now())
                        .build()
            );
        });

        return (true);
    }

    @Override
    public Optional<List<Map<String,Object>>> fundingQna(int fundingSeq) {

        return (qnaRepository.findByFundingSeq(fundingSeq));
    }

    @Override
    public boolean deleteQna(int qnaSeq) {
        if(qnaRepository.findById(qnaSeq).isPresent()){
            qnaRepository.deleteById(qnaSeq);
            return (true);
        }
        return (false);
    }

}
