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

        try {
            int index = 1;
            for (MultipartFile file : files) {
                String destPath = basePath + "/" + index + getExtension(file);

                File destFile = new File(destPath);

                file.transferTo(destFile);

                index++;
            }
        } catch (IllegalStateException e) {
            System.out.println("파일이 없거나 지원하지 않는 형식");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteImages(String username, Long id) {
        if(checkExistImage(username, id) == 0)  return;

        String placeDiv = path + username + "/" + id;

        File div = new File(placeDiv);

        for(File image : div.listFiles()) {
            image.delete();
        }

        if(div.listFiles().length == 0) {
            div.delete();
        }
    }

    public int checkExistImage(String username, Long id) {
        String filePath = path + username + "/" + id;
        File div = new File(filePath);

        if(div.exists()) {
            return div.listFiles().length;
        } else {
            return 0;
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
