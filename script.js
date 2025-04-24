const preco = {
    tralalaro: 499.00,
    bomba: 1.00,
    thung: 299.00,
    crispy: 299.00
};

const produtos = [
    {
        titulo: "Tralalero Tralala",
        preco: preco.tralalaro,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaR7QmihHSl9366g0tO7v7Eax1VjmBZHPjZg&s"
    },
    {
        titulo: "Papa Pitufo",
        preco: preco.papapitufo,
        imagem: "https://media.tenor.com/N38xUIkuVXUAAAAM/zesty-smurf.gif"
    },
    {
        titulo: "Thung Thung Thung Sahur",
        preco: preco.thung,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi91db9lFwCinFYxZmouTGBMqfUtLDdKDVJw&s"
    },
    {
        titulo: "Tralalero Crispy Snack",
        preco: preco.crispy, // Corrigido: apenas uma definição
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXorRjVCoarsm23KvjF7U2n7m7j_tTic-evQ&s"
    }
];

const produtosNaCesta = [];
const container = document.getElementById('container');
const listaC = document.querySelector('.listaC');
const overlay = document.querySelector('.overlay');

function mostrarCarrinho() {
    listaC.classList.add('mostrar');
    overlay.classList.add('mostrar');
}
function ocultarCarrinho() {
    listaC.classList.remove('mostrar');
    overlay.classList.remove('mostrar');
}
function adicionarProdutosAoContainer() {
    produtos.forEach((produto, index) => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');
        divProduto.innerHTML = `
            <img class="ps4" src="${produto.imagem}" alt="${produto.titulo}">
            <h1 class="ps4titulo">${produto.titulo}</h1>
            <h2 class="preco"><b>R$ ${produto.preco.toFixed(2)}</b></h2>
            <button class="comprar" data-index="${index}">Comprar</button>
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
    const produtoExistente = produtosNaCesta.find(p => p.titulo === produto.titulo);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        produtosNaCesta.push({ ...produto, quantidade: 1 }); // Adiciona o produto com quantidade inicial 1
    }
    atualizarListaC();
}

function atualizarListaC() {
    const itensExistentes = listaC.querySelectorAll('.item-cesta');
    itensExistentes.forEach(item => item.remove());

    produtosNaCesta.forEach((produto, index) => {
        const item = document.createElement('div');
        item.classList.add('item-cesta');
        item.innerHTML = `
            <p><strong>${produto.titulo}</strong></p>
            <p>R$ ${produto.preco.toFixed()}</p>
            <p><button class="diminuir" data-index="${index}">-</button>
                ${produto.quantidade}
                <button class="aumentar" data-index="${index}">+</button>
            </p><button class="remover" data-index="${index}">Remover</button>
        `;
        listaC.appendChild(item);
    });
    const botoesDiminuir = document.querySelectorAll('.diminuir');
    botoesDiminuir.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (produtosNaCesta[index].quantidade > 1) {
                produtosNaCesta[index].quantidade -= 1;
            } else {
                produtosNaCesta.splice(index, 1);
            }
            atualizarListaC();
        });
    });

    const botoesAumentar = document.querySelectorAll('.aumentar');
    botoesAumentar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta[index].quantidade += 1;
            atualizarListaC();
        });
    })

 
    const botoesRemover = document.querySelectorAll('.remover');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta.splice(index, 1);
            atualizarListaC();
        });
    });
}
const precoTotal = produtosNaCesta.reduce((total, produto) => {
    return total + produto.preco * produto.quantidade;
}, 0);

let totalDiv = document.querySelector('.total-preco');
if (!totalDiv) {
    totalDiv = document.createElement('div');
    totalDiv.classList.add('total-preco');
    listaC.appendChild(totalDiv);
}
totalDiv.innerHTML = `<h3 id="Total">Total: R$ ${precoTotal.toFixed()}</h3>`;

function adicionarEventosComprar() {
    const botoesComprar = document.querySelectorAll('.comprar');
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            adicionarProdutoNaCesta(index);
            mostrarCarrinho();
        });
    });
}

document.querySelector('.excluir').addEventListener('click', ocultarCarrinho);
overlay.addEventListener('click', ocultarCarrinho);

adicionarProdutosAoContainer();
adicionarEventosComprar();
 