package com.crud.simple.service.exceptions;

public class ErroBeanValidation   extends RuntimeException{
	private static final long serialVersionUID = 1L;
	public ErroBeanValidation(String msg) {
		  super(msg);
	  }
}
