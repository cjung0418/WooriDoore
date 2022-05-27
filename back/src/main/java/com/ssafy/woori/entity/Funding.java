package com.ssafy.woori.entity;

import lombok.*;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "tb_funding")
public class Funding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fundingSeq;
    @Column
    private String fundingImage;
    @Column(nullable = false)
    private Integer userSeq;
    @Column(nullable = false)
    private Integer fundingCategory;
    @Column
    private String userNickname;
    @Column
    private String userPhone;
    @Column
    private String userIntroduce;
    @Column(nullable = false, length = 100)
    private String fundingTitle;
    @Column(nullable = true, length = 1024)
    private String fundingText;
    @Column(nullable = false, length = 100)
    private String fundingSimple;
    @Column
    private String fundingWarning;
    @Column(columnDefinition = "int default 1")
    private Integer fundingStatus;
    @Column
    private Integer fundingCheap;
    @CreatedDate
    private LocalDate fundingCreateDate;
    @CreatedDate
    private LocalDate fundingModifyDate;
    @Column
    private String fundingContract;
}
