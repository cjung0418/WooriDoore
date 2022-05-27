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
@Table(name="tb_follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer followSeq;
    @Column(nullable = false)
    private Integer userSeq;
    @Column(nullable = false)
    private Integer seller;
    @Column(columnDefinition = "boolean default true")
    private Boolean alarmIsAllow;
    @CreatedDate
    private LocalDate requestDate;
}
