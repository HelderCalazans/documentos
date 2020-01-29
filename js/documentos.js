function search(){

    var cpf = document.getElementById('inputCPF').value;
    validation(cpf);
}
function validation(cpfValue){

    var storage = firebase.storage();
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        if(todosArquivos.items.length >= 1){
            listFiles(cpfValue);
            next(cpfValue);
        }
        else{
            alert("CPF não cadastrado");
        }
        

    }).catch(function(error){
        console.log(error);
    }); // Retorna uma Promise
}

function listFiles(cpfValue){

    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cpfValue;
    var files;
    var fileNames = [];
    var fileLinks = [];
    var storage = firebase.storage();

    storage.ref().child(cpfValue).listAll().then(function(listaArquivos){
        files = listaArquivos.items;
        console.log(files);
        for(let i = 0; i<files.length; i++){
            fileNames.push(files[i].name);
            storage.ref(cpfValue+'/'+fileNames[i]).getDownloadURL().then(function(url){
                console.log(url);
            });
        }
    });
}

function next(cpfValue){

    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
}

function back(){
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById("inputCPF").value = '';
}
