package com.ssafy.woori.domain.category.dao;

import com.ssafy.woori.domain.category.dto.GetListResponse;
import com.ssafy.woori.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<List<GetListResponse>> findAllBy();
}
