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
@Table(name = "tb_qna")
public class Qna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer qnaSeq;
    @Column
    private Integer fundingSeq;
    @Column
    private Integer userSeq;
    @Column
    private String qnaTitle;
    @Column(length = 1024)
    private String qnaText;
    @CreatedDate
    private LocalDate qnaCreatedDate;
    @LastModifiedDate
    private LocalDate qnaModifiedDate;
    @Column(nullable = false)
    private Boolean secret;
    
}
