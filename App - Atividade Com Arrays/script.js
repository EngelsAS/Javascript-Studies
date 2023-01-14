var objetos = Array('Cadeira', 'Impressora', 'Garfo')

function adicionarValor(){

	if(document.getElementById('campo_texto').value.length == 0){

		alert('Valor invalido')

	}else{

		var item = document.getElementById('campo_texto').value

		if(objetos.indexOf(item) != -1){
			alert('Esse item já existe na lista')
		}else{
			objetos.push(item)
			console.log(objetos)
			document.getElementById('campo_texto').value = ''
		}
	}
}

function ordenarLista(){
	objetos.sort()
	console.log(objetos)
}