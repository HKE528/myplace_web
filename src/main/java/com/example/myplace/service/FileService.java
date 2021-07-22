package com.example.myplace.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Component
public class FileService {
    private String path = "c:/ServerRepo/MyPlace/image/place/";

    public void saveFile(String username, Long id, List<MultipartFile> files) {
        String basePath = path + username + "/" + id;

        checkAndMkdirs(basePath);

        int index = 1;
        for(MultipartFile file : files) {
            String destPath = basePath + "/" + index + getExtension(file);

            File destFile = new File(destPath);

            try {
                file.transferTo(destFile);
            } catch (Exception e) {
                e.printStackTrace();
            }
            index++;
        }
    }

    private void checkAndMkdirs(String path) {
        File div = new File(path);

        if (!div.exists())
            div.mkdirs();
    }

    private String getExtension(MultipartFile file) {
        String contentType = file.getContentType();
        String extension =
                switch (contentType) {
                    case "image/jpeg", "image/jpg" -> ".jpg";
                    case "image/png" -> ".png";
                    case "image/gif" -> ".gif";
                    default -> throw new IllegalStateException("잘못된 형식 입니다.");
                };

        return extension;
    }
}
