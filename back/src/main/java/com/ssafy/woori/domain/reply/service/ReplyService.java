package com.ssafy.woori.domain.reply.service;

import com.ssafy.woori.domain.reply.dto.addReplyRequest;
import com.ssafy.woori.entity.Reply;

public interface ReplyService {
    Reply addReply(addReplyRequest request);
    boolean modifyReply(addReplyRequest request);
    boolean deleteReply(int replySeq);
}
