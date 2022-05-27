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
@Table(name = "tb_file")
public class Files {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fileSeq;
    @Column(nullable = false)
    private String fileName;
//    @Column
//    private Long fileSize;
    @Column(nullable = false)
    private String filePath;
//    @Column
//    private Integer fileType;
//    @Column(nullable = false)
//    private String relationTb;
//    @Column(nullable = false)
//    private Integer relationSeq;
    @Column(columnDefinition = "boolean default true")
    private Boolean fileIsActive;
    @CreatedDate
    private LocalDate fileRegisteredDate;
    @CreatedDate
    private LocalDate fileModifiedDate;
}
