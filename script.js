const apiUrl = 'https://api-mural.onrender.com/recados';
const listaRecados = document.getElementById('mural-lista');
const btnOrdenar = document.getElementById('ordenar-btn');
const formRecado = document.getElementById('form-recado');

let recados = [];

// GET inicial
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na Rede! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(dados => {
        recados = dados;
        renderizarLista(recados);
    })
    .catch(error => {
        console.error("Falha ao processar a requisição: ", error);
        listaRecados.innerHTML = '<li>Houve um erro ao carregar os Dados do Mural</li>';
    });

// Renderizar recados
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

// Ordenar por autor
btnOrdenar.addEventListener('click', () => {
    const listaOrdenada = [...recados].sort((a, b) => 
        a.autor.localeCompare(b.autor, 'pt-BR', { sensitivity: 'base' })
    );
    renderizarLista(listaOrdenada);
});

// POST novo recado
formRecado.addEventListener('submit', (e) => {
    e.preventDefault();

    const novoRecado = {
        autor: document.getElementById('autor').value,
        mensagem: document.getElementById('mensagem').value,
        data_criacao: new Date().toISOString()
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoRecado)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao enviar recado");
        }
        return response.json();
    })
    .then(dadoCriado => {
        recados.push(dadoCriado);
        renderizarLista(recados);
        formRecado.reset();
    })
    .catch(error => {
        console.error("Erro no POST:", error);
        alert("Não foi possível enviar o recado.");
    });
});
