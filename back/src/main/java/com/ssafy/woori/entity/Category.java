package com.ssafy.woori.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "tb_category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categorySeq;
    @Column(unique = true)
    private Integer categoryNumber;
    @Column(length = 20)
    private String categoryName;
    @Column
    private String categoryImage;
}
