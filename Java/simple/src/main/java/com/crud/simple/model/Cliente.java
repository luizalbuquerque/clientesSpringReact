package com.crud.simple.model;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.br.CPF;
//import javax.validation.constraints.Min;
//import javax.validation.constraints.NotNull;


@Entity
public class Cliente implements Serializable{

	private static final long serialVersionUID = 1L;
  @Id	
  @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
  
   
 @ Column( length = 100, nullable = false)
 @Size(min = 3, max = 100, message = "Nome deve estar entre 3 e 10 caracteres")
 @NotEmpty(message = "Campo nome dever ser ´preenchido")  
 @Pattern(regexp = "^[a-z0-9A-Z ]+[a-z0-9A-Z ]{1,}$", message = "permite apenas letras espaços e números")
 private String nome ;

 @CPF
 @NotBlank(message = "Campo cpf dever ser preenhcido")
 private String  Cpf;
 
 @OneToMany(mappedBy = "cliente", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
 List<Telefone> telefones  = new ArrayList<Telefone>();
 
 @OneToMany(mappedBy = "cliente", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
 List<Email> emails  = new ArrayList<Email>();

@OneToOne(cascade = CascadeType.ALL,orphanRemoval = true )
@org.hibernate.annotations.ForeignKey(name = "endereco_id")
 private Endereco endereco;

private Date dtOperacao;

private Long iduser;
  
@PrePersist
private void dataOperacao() {
	this.setDtOperacao(new Date());
}



public Long getIduser() {
	return iduser;
}



public void setIduser(Long iduser) {
	this.iduser = iduser;
}



public Date getDtOperacao() {
	return dtOperacao;
}

public void setDtOperacao(Date dtOperacao) {
	this.dtOperacao = dtOperacao;
}





public Endereco getEndereco() {
	return endereco;
}

public void setEndereco(Endereco endereco) {
	this.endereco = endereco;
}

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getNome() {
	return nome;
}

public void setNome(String nome) {
	this.nome = nome;
}

public String getCpf() {
	return Cpf;
}

public void setCpf(String cpf) {
	Cpf = cpf;
}

public List<Telefone> getTelefones() {
	return telefones;
}

public void setTelefones(List<Telefone> telefones) {
	this.telefones = telefones;
}

public List<Email> getEmails() {
	return emails;
}

public void setEmails(List<Email> emails) {
	this.emails = emails;
}

@Override
public int hashCode() {
	final int prime = 31;
	int result = 1;
	result = prime * result + ((Cpf == null) ? 0 : Cpf.hashCode());
	result = prime * result + ((id == null) ? 0 : id.hashCode());
	result = prime * result + ((nome == null) ? 0 : nome.hashCode());
	result = prime * result + ((telefones == null) ? 0 : telefones.hashCode());
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
	Cliente other = (Cliente) obj;
	if (Cpf == null) {
		if (other.Cpf != null)
			return false;
	} else if (!Cpf.equals(other.Cpf))
		return false;
	if (id == null) {
		if (other.id != null)
			return false;
	} else if (!id.equals(other.id))
		return false;
	if (nome == null) {
		if (other.nome != null)
			return false;
	} else if (!nome.equals(other.nome))
		return false;
	if (telefones == null) {
		if (other.telefones != null)
			return false;
	} else if (!telefones.equals(other.telefones))
		return false;
	return true;
}  
 

}
