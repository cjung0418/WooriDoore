package com.ssafy.woori.domain.file.controller;

import com.ssafy.woori.domain.file.service.FileService;
import com.ssafy.woori.domain.funding.controller.FundingController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/file")
public class FileController {

    public static final Logger logger = LoggerFactory.getLogger(FundingController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    FileService fileService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addPhoto(@RequestPart MultipartFile[] files) throws IOException {
        logger.info("파일 업로드하기 " + files[0].getOriginalFilename());
        String message = FAIL;
        HttpStatus status;

        Map<String, Object> result = new HashMap<>();
        List<String> dto = fileService.uploadFile(files);

        if(dto != null){
            message = SUCCESS;
            status = HttpStatus.OK;
            result.put("file", dto.get(0));
        }
        else status = HttpStatus.NOT_FOUND;

        result.put("message", message);

        return (new ResponseEntity<>(result, status));
    }
}
