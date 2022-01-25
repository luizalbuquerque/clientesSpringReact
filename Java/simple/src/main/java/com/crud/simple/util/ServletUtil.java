package com.crud.simple.util;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import net.minidev.json.JSONObject;





public class ServletUtil {
	
	public static void write(HttpServletResponse response, HttpStatus status, String json) throws IOException {
		
		response.setStatus(status.value()); 
		response.setCharacterEncoding("UTF-8");
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		response.getWriter().write(json);
		
	}
	
	
	public static String getJson(String key, String value) {
		JSONObject json = new JSONObject();
		json.appendField(key, value);
		return json.toString();
	}
	

}
