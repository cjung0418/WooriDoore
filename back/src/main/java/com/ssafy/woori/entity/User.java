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
@Table(name = "tb_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userSeq;
    @Column(length = 100)
    private String userEmail;
    @CreatedDate
    private LocalDate userBirth;
    @Column(columnDefinition = "boolean default true")
    private Boolean userIsActive;
    @CreatedDate
    private LocalDate userCreatedDate;
    @LastModifiedDate
    private LocalDate userModifiedDate;
    @Column(length = 20)
    private String userNickname;
    @Column
    private String userWalletAddress;
    @Column(length = 50)
    private String userPlatform;
    @Column
    private String userImage;
    @Column(length = 20)
    private String userPhone;
    @Column
    private String userIntroduce;
    @Column(length = 20)
    private String userCompany;
    @Column
    private String userKey;
}
