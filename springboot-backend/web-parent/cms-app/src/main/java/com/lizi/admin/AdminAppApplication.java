package com.lizi.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@SpringBootApplication
@EntityScan({"com.lizi.common.entity"})
public class AdminAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminAppApplication.class, args);
	}

}
