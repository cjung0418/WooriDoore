package com.ssafy.woori.domain.reply.dao;

import com.ssafy.woori.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Integer>{
}
