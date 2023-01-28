class Despesa{

	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){
		for(let i in this){
			if(this[i] === undefined || this[i] === '' || this[i] === null)
				return false
		}

		return true
	}

}

class Bd {

	constructor(){
		let id = localStorage.getItem('id')

		if(id == null){
			localStorage.setItem('id', 0)
		}
	}

	getProximoID(){
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoID()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}

}

let bd = new Bd()

function CadastrarDespesa() {
	
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(ano.value, 
		mes.value, dia.value, 
		tipo.value, 
		descricao.value, 
		valor.value)

	if(despesa.validarDados()){
		bd.gravar(despesa)

		document.getElementById('cabecalhoModal').className = 'modal-header text-success'
		document.getElementById('gravacaoLabel').innerHTML = 'Despesa cadastrada com sucesso'
		document.getElementById('botaoModal').className = 'btn btn-success'
		document.getElementById('conteudoModal').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('botaoModal').innerHTML = 'Voltar'

		$('#modalRegistraDespesa').modal('show')
	}else{

		document.getElementById('cabecalhoModal').className = 'modal-header text-danger'
		document.getElementById('botaoModal').className = 'btn btn-danger'
		document.getElementById('gravacaoLabel').innerHTML = 'Erro ao registrar nova despesa'
		document.getElementById('conteudoModal').innerHTML = 'É necessario preencher todos os campos para adicionar uma despesa a lista'
		document.getElementById('botaoModal').innerHTML = 'Voltar e corrigir'

		$('#modalRegistraDespesa').modal('show')
	}

}
