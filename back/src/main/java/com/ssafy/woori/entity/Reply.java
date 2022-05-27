package com.ssafy.woori.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "tb_qna_reply")
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer replySeq;
    @Column(nullable = false)
    private Integer qnaSeq;
    @Column(length = 1024)
    private String replyText;
    @CreatedDate
    private LocalDate replyCreatedDate;
    @LastModifiedDate
    private LocalDate replyModifiedDate;
}
