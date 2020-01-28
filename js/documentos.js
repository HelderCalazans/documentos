function search(){

    var cpf = document.getElementById('inputCPF').value;
    validation(cpf);
}
function validation(cpfValue){

    var storage = firebase.storage();
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        if(todosArquivos.items.length >= 1){
            next(cpfValue);
            alert("arquivo " + todosArquivos.items[0].name + " encontrado");
        }
        else{
            alert("CPF não cadastrado");
        }
        console.log(todosArquivos.items[0].name);

    }).catch(function(error){
        console.log(error);
    }); // Retorna uma Promise
}

function next(cpfValue){

    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cpfValue;
}

function back(){
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById("inputCPF").value = '';
}
