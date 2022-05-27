package com.ssafy.woori.domain.reply.service;

import com.ssafy.woori.domain.reply.dao.ReplyRepository;
import com.ssafy.woori.domain.reply.dto.addReplyRequest;
import com.ssafy.woori.entity.Reply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ReplyServiceImpl implements ReplyService{

    @Autowired
    private ReplyRepository replyRepository;

    @Override
    public Reply addReply(addReplyRequest request) {

        return (replyRepository.save(
                Reply.builder()
                        .qnaSeq(request.getQnaSeq())
                        .replyText(request.getReplyText())
                        .replyCreatedDate(LocalDate.now())
                        .replyModifiedDate(LocalDate.now())
                        .build()
        ));
    }

    @Override
    public boolean modifyReply(addReplyRequest request) {
        Optional<Reply> reply = replyRepository.findById(request.getReplySeq());

        if(!reply.isPresent()) return (false);

        reply.ifPresent(selectReply ->{
            replyRepository.save(
                    Reply.builder()
                            .replySeq(selectReply.getReplySeq())
                            .qnaSeq(selectReply.getQnaSeq())
                            .replyText(request.getReplyText())
                            .replyCreatedDate(selectReply.getReplyCreatedDate())
                            .replyModifiedDate(LocalDate.now())
                            .build()
            );
        });
        return (true);
    }

    @Override
    public boolean deleteReply(int replySeq) {
        if(replyRepository.findById(replySeq).isPresent()){
            replyRepository.deleteById(replySeq);
            return (true);
        }
        return (false);
    }
}
