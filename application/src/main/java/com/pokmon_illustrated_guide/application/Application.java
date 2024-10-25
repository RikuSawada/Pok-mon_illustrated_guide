package com.pokmon_illustrated_guide.application;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;
@SpringBootApplication
@ComponentScan({"com.pokmon_illustrated_guide.application", "com.pokmon_illustrated_guide.application.domain.service", "com.pokmon_illustrated_guide.application.domain.repository",
		"com.pokmon_illustrated_guide.application.infra.Postgres.mapper","com.pokmon_illustrated_guide.application.infra.Postgres.repository"})
@EnableTransactionManagement
@MapperScan("com.pokmon_illustrated_guide.application.infra.Postgres.mapper")
@ConfigurationPropertiesScan
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}

