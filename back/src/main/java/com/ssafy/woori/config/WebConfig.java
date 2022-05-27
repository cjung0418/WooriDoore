package com.ssafy.woori.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
//                .allowedOrigins("https://j6a305.p.ssafy.io",
//                        "https://j6a305.p.ssafy.io:80",
//                        "https://j6a305.p.ssafy.io:3000",
//                        "http://j6a305.p.ssafy.io",
//                        "http://j6a305.p.ssafy.io:80",
//                        "http://j6a305.p.ssafy.io:3000",
//                        "http://127.0.0.1",
//                        "https://127.0.0.1",
//                        "http://127.0.0.1:3000")
                .allowedOrigins("*")
                .allowedMethods("*")
                .maxAge(3000);
    }
}
