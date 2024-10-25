package com.pokmon_illustrated_guide.application.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**") // エンドポイントのパスを指定
        .allowedOrigins("http://localhost:4200") // 許可するオリジンを指定
        .allowedMethods("*") // 許可するHTTPメソッドを指定
        .allowCredentials(true); // クレデンシャル情報（Cookieなど）の送信を許可

    registry.addMapping("/api/**") // エンドポイントのパスを指定
        .allowedOrigins("http://localhost:3978") // 許可するオリジンを指定
        .allowedMethods("*") // 許可するHTTPメソッドを指定
        .allowCredentials(true); // クレデンシャル情報（Cookieなど）の送信を許可
  }
}