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
@Table(name = "tb_board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer boardSeq;
    @Column
    private Integer fundingSeq;
    @Column(length = 100)
    private String boardTitle;
    @Column(length = 1024)
    private String boardContent;
    @CreatedDate
    private LocalDate boardCreatedDate;
    @LastModifiedDate
    private LocalDate boardModifiedDate;


}
