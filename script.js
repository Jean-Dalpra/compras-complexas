const produtos = [
    {
        titulo: "Pitufet",
        preco: "R$ 3.499,00 Pitudolars",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtSV-WaMHwQTx8NlqDaXbAJ6jCJM_MnYGUw&s"
    },
    {
        titulo: "Papa Pitufal",
        preco: "R$ 2.799,00 Pitudolars",
        imagem: "https://media.tenor.com/JXMJLYyapxUAAAAM/dance-papa-smurf.gif"
    },
    {
        titulo: "Cat Pitufo Crazy",
        preco: "R$ 299,00 Pitudolars",
        imagem: "https://img.fruugo.com/product/7/72/1254806727_max.jpg"
    },
    {
        titulo: "Los Pitufos Ultimate Hiper Mega Edition Deluxe Pitufal SSJ 10",
        preco: "R$ 2.000.000.00000 Pitupilas",
        imagem: "https://i.makeagif.com/media/2-08-2024/wjbs3U.gif" 
    }
];
const produtosNaCesta = [];
 
const container = document.getElementById('container');
 
function adicionarProdutosAoContainer() {
    produtos.forEach((produto, index) => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');
        divProduto.innerHTML = `
            <img class="ps4" src="${produto.imagem}" alt="${produto.titulo}">
            <h1 class="ps4titulo">${produto.titulo}</h1>
            <h2 class="preco"><b>${produto.preco}</b></h2>
            <button class="comprar" data-index="${index}">Adquirir</button>
        `;
        container.appendChild(divProduto);
    });
 
    const botoesComprar = document.querySelectorAll('.comprar');
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            adicionarProdutoNaCesta(index);
        });
    });
}
 
function adicionarProdutoNaCesta(index) {
    const produto = produtos[index];
    produtosNaCesta.push(produto);
    atualizarListaC();
}
 
function atualizarListaC() {
    const listaC = document.querySelector('.listaC');
 
    const itensExistentes = listaC.querySelectorAll('.item-cesta');
    itensExistentes.forEach(item => item.remove());
 
    produtosNaCesta.forEach((produto, index) => {
        const item = document.createElement('div');
        item.classList.add('item-cesta');
        item.innerHTML = `
            <p><strong>${produto.titulo}</strong></p>
            <p>${produto.preco}</p>
            <button class="remover" data-index="${index}">Remover</button>
        `;
        listaC.appendChild(item);
    });

    const botoesRemover = document.querySelectorAll('.remover');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta.splice(index, 1); 
            atualizarListaC(); 
        });
    });
}
 
adicionarProdutosAoContainer();
 