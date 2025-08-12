// Link da API
const apiUrl = 'https://api-mural.onrender.com/recados';

const listaRecados = document.getElementById('mural-lista');

fetch(apiUrl).then(response => {
    
    if (!response.ok){
        throw new Error ('Erro na Rede! Status: ${response.status}');
    }

    return response.json();
})

.then(dados => {
    console.log("Dados recebidos com sucesso:", dados);

    listaRecados.innerHTML = '';

    dados.forEach(recado => {
        
        const item = document.createElement('li');

        const dataFormatada = new Date(recado.data_criacao).toLocaleString('pt-BR');

        item.innerHTML = `
        <strong>${recado.autor}</strong> 
        <p>${recado.mensagem}</p> 
        <small>${dataFormatada}</small>`

        listaRecados.appendChild(item);

    });

    
})

.catch(error => {
    console.error("Falha ao processar a requisição: ", error);

    listaRecados.innerHTML = '<li>Houve um erro ao carregar os Dados do Mural</li>'
});