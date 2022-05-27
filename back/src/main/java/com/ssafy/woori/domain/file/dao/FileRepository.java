package com.ssafy.woori.domain.file.dao;

import com.ssafy.woori.entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<Files, Integer> {
}
