package com.crud.simple.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Endereco implements Serializable  {

	private static final long serialVersionUID = 1L;

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column( nullable = false , length = 9)
	@NotBlank(message = "Cep deve ser preenchido") 
	@Size(min = 9, max = 9 , message = "Cep deve ter 9 caracteres")
	private String cep;
	
	@Column( nullable = false)
	@NotBlank(message = "Logradouro deve ser preenchido") 
	private String logradouro;
	
	private String complemento;
	
	@Column( nullable = false)
	@NotBlank(message = "Bairro deve ser preenchido") 
	private String bairro;
	
	@Column( nullable = false)
	@NotBlank(message = "Localidade deve ser preenchido") 
	private String localidade;
	
	@Column( nullable = false, length = 2)
	@NotBlank(message = "Sigla da uf deve ser preenchido") 
	@Size(min = 2, max = 2 , message = "Nome da uf dever ter 2 letras")
	private String uf;
	
	

	public String getLocalidade() {
		return localidade;
	}

	public void setLocalidade(String localidade) {
		this.localidade = localidade;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}


	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Endereco other = (Endereco) obj;
		if (id != other.id)
			return false;
		return true;
	}
	

}
