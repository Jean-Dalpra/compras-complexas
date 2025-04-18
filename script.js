const preco = {
    pitufina: 499.00,
    papapitufo: 999.00,
    pitufocat: 149.00,
    lospitufos: -1.00
};
 
const produtos = [
    {
        titulo: "Pitufet",
        preco: preco.pitufina,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtSV-WaMHwQTx8NlqDaXbAJ6jCJM_MnYGUw&s"
    },
    {
        titulo: "Papa Pitufo",
        preco: preco.papapitufo,
        imagem: "https://i.pinimg.com/736x/9e/9a/db/9e9adb6ebcbc36ee8c7fbc23a57b9e1b.jpg"
    },
    {
        titulo: "Beautifull Pitufocat",
        preco: preco.pitufocat,
        imagem: "https://preview.redd.it/pfmydxl0ago41.png?auto=webp&s=20559097fcf2ad6cdb214205c9e638d4cb930198"
    },
    {
        titulo: "Los Pitufos",
        preco: preco.lospitufos,
        imagem: "https://i.pinimg.com/originals/9f/09/88/9f0988b77aad2452092d2f12081a9a31.gif"
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
        produtosNaCesta.push({ ...produto, quantidade: 1 });
    }
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
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <p>
                <button class="diminuir" data-index="${index}">-</button>
                ${produto.quantidade}
                <button class="aumentar" data-index="${index}">+</button>
            </p>
            <button class="remover" data-index="${index}">Remover</button>
        `;
        listaC.appendChild(item);
    });

    const botoesAumentar = document.querySelectorAll('.aumentar');
    botoesAumentar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta[index].quantidade += 1;
            atualizarListaC();
        });
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

    const precoTotal = produtosNaCesta.reduce((total, produto) => {
        return total + produto.preco * produto.quantidade;
    }, 0);

    let totalDiv = document.querySelector('.total-preco');
    if (!totalDiv) {
        totalDiv = document.createElement('div');
        totalDiv.classList.add('total-preco');
        listaC.appendChild(totalDiv);
    }
    totalDiv.innerHTML = `<h3 id="Total">Total: R$ ${precoTotal.toFixed(2)}</h3>`;

    const botoesRemover = document.querySelectorAll('.remover');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta.splice(index, 1);
            atualizarListaC();
        });
    });
}
 
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