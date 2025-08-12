const apiUrl = 'https://api-mural.onrender.com/recados';
const listaRecados = document.getElementById('mural-lista');
const btnOrdenar = document.getElementById('ordenar-btn');

let recados = []; // variável global para armazenar dados

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na Rede! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(dados => {
        console.log("Dados recebidos com sucesso:", dados);
        recados = dados; // guarda os dados na variável
        renderizarLista(recados);
    })
    .catch(error => {
        console.error("Falha ao processar a requisição: ", error);
        listaRecados.innerHTML = '<li>Houve um erro ao carregar os Dados do Mural</li>';
    });

// Função para renderizar
function renderizarLista(lista) {
    listaRecados.innerHTML = '';
    lista.forEach(recado => {
        const item = document.createElement('li');
        const dataFormatada = new Date(recado.data_criacao).toLocaleString('pt-BR');

        item.innerHTML = `
            <strong>${recado.autor}</strong> 
            <p>${recado.mensagem}</p> 
            <small>${dataFormatada}</small>
        `;
        listaRecados.appendChild(item);
    });
}

// Evento do botão para ordenar
btnOrdenar.addEventListener('click', () => {
    const listaOrdenada = [...recados].sort((a, b) => 
        a.autor.localeCompare(b.autor, 'pt-BR', { sensitivity: 'base' })
    );
    renderizarLista(listaOrdenada);
});
