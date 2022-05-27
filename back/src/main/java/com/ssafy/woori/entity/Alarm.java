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
@Table(name = "tb_alarm")
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer alarmSeq;
    @Column(nullable = false)
    private Integer userSeq;
    @Column(nullable = true)
    private Integer fundingSeq;
    @Column
    private Integer alarmType;
    @Column
    private String alarmText;
    @CreatedDate
    private LocalDate alarmDate;
    @Column(columnDefinition = "boolean default false")
    private Boolean alarmIsRead;
    @Column(columnDefinition = "boolean default false")
    private Boolean alarmIsActive;
}
