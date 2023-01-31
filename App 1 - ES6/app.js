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

	recuperarTodosRegistros() {
		let despesas = Array()
		let id = localStorage.getItem('id')

		for(let i = 1; i <= id; i++){
			let despesa = JSON.parse(localStorage.getItem(i))

			if(despesa === null){
				continue
			}else{
				despesa.id = i
				despesas.push(despesa)
			}			
		}
		return despesas
	}

	pesquisar(despesa) {
		
		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()

		if(despesa.ano != ''){
			despesasFiltradas = despesasFiltradas.filter(v => v.ano == despesa.ano)
		}

		if(despesa.mes != ''){
			despesasFiltradas = despesasFiltradas.filter(v => v.mes == despesa.mes)
		}

		if(despesa.dia != ''){
			despesasFiltradas = despesasFiltradas.filter(v => v.dia == despesa.dia)
		}

		if(despesa.tipo != ''){
			despesasFiltradas = despesasFiltradas.filter(v => v.tipo == despesa.tipo)
		}

		if(despesa.descricao != ''){
			despesasFiltradas = despesasFiltradas.filter(v => v.descricao == despesa.descricao)
		}

		if(despesa.valor != ''){
			despesasFiltradas = despesasFiltradas.filter(v => v.valor == despesa.valor)
		}

		return despesasFiltradas
	}

	remover(id) {
		localStorage.removeItem(id)
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

		ano.value = ""
		mes.value = ""
		dia.value = ""
		tipo.value = ""
		descricao.value = ""
		valor.value = ""
	}else{

		document.getElementById('cabecalhoModal').className = 'modal-header text-danger'
		document.getElementById('botaoModal').className = 'btn btn-danger'
		document.getElementById('gravacaoLabel').innerHTML = 'Erro ao registrar nova despesa'
		document.getElementById('conteudoModal').innerHTML = 'É necessario preencher todos os campos para adicionar uma despesa a lista'
		document.getElementById('botaoModal').innerHTML = 'Voltar e corrigir'

		$('#modalRegistraDespesa').modal('show')
	}

}


function carregaListaDespesas(despesas = Array(), filtro = false) {
	
	if(despesas.length == 0 && filtro == false){
		despesas = bd.recuperarTodosRegistros()
	}

	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	despesas.forEach(function(valor){

		let linha = listaDespesas.insertRow()

		linha.insertCell(0).innerHTML = `${valor.dia}/${valor.mes}/${valor.ano}`

		switch(valor.tipo){
			case '1': valor.tipo = 'Alimentação'
				break
			case '2': valor.tipo = 'Educação'
				break
			case '3': valor.tipo = 'Lazer'
				break
			case '4': valor.tipo = 'Saúde'
				break
			case '5': valor.tipo = 'Transporte'
				break
		}

		linha.insertCell(1).innerHTML = valor.tipo
		linha.insertCell(2).innerHTML = valor.descricao
		linha.insertCell(3).innerHTML = valor.valor

		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class ="fas fa-times"></i>'
		btn.id = `id_despesa_${valor.id}`
		btn.onclick = function(){
			let id = this.id.replace('id_despesa_', '')
			bd.remover(id)
			window.location.reload()
		}
		linha.insertCell(4).append(btn)

	})
	
}

function pesquisarDespesa() {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)

	carregaListaDespesas(despesas, true)
}
