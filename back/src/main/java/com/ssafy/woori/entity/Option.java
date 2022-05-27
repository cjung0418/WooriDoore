package com.ssafy.woori.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "tb_option")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer optionSeq;
    @Column(nullable = false)
    private Integer fundingSeq;
    @Column
    private Integer optionOrder;
    @Column(length = 100)
    private String optionTitle;
    @Column
    private Integer optionPrice;
    @Column
    private String optionText;
    @Column
    private Integer optionMaxamount;
//    @Column(unique = true)
//    private String optionContract;
    @Column(columnDefinition = "boolean default false")
    private Boolean optionIsmain;
}
