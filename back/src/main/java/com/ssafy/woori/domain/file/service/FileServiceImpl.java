package com.ssafy.woori.domain.file.service;

import com.ssafy.woori.domain.file.dao.FileRepository;
import com.ssafy.woori.entity.Files;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService{
    @Autowired
    FileRepository fileRepository;

    public String makeFolder(){

        LocalDate now = LocalDate.now();

        // 폴더 명 지정 필요 + 폴더가 없다면 만들기
//        String path = "C:\\Users\\pang\\Desktop\\files\\" + now.getYear() + "\\" + now.getMonthValue() + "\\" + now.getDayOfMonth() + "\\";
        String path = "/files/" + now.getYear() + "/" + now.getMonthValue() + "/" + now.getDayOfMonth() + "/";

        File Folder = new File(path);

        if(!Folder.exists()) {
            try {
                Folder.mkdirs();
            }
            catch(Exception e) {
                e.getStackTrace();
            }
        }
        return (path);
    }

    @Override
    public List<String> uploadFile(MultipartFile[] file) throws IOException {

        String path = makeFolder();

        List<String> result = new ArrayList<>();

        for(MultipartFile files: file){
            UUID uuid = UUID.randomUUID();
            String saveName = path + uuid.toString() + "_" + files.getOriginalFilename();

            files.transferTo(new File(saveName));

            fileRepository.save(
                    Files.builder()
                            .fileName(files.getOriginalFilename())
                            .filePath(saveName)
                            .fileIsActive(true)
                            .fileRegisteredDate(LocalDate.now())
                            .fileModifiedDate(LocalDate.now())
                            .build()
            );
            result.add(saveName);
        }

        return (result);
    }
}
