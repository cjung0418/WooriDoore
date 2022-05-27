package com.ssafy.woori.domain.file.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {
    List<String> uploadFile(MultipartFile[] file) throws IOException;
}
