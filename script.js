// Espera todo o conteúdo da página carregar antes de executar o código
document.addEventListener('DOMContentLoaded', function() {

<<<<<<< HEAD
    // --- SELEÇÃO DOS ELEMENTOS DO DOM DO CARRINHO ---
    const carrinhoBody = document.querySelector('.carrinho-body'); // Onde os itens serão adicionados
    const subtotalInfo = document.querySelector('.subtotal-info'); // Onde o subtotal será exibido
    const productCards = document.querySelectorAll('.product-card'); // Todos os cards de produto
=======
    // --- SELEÇÃO DOS ELEMENTOS DO DOM ---
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b
    const carrinhoLateral = document.getElementById('carrinho-lateral');
    const iconeCarrinho = document.getElementById('icone-carrinho');
    const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
    const overlay = document.getElementById('overlay');
    const continuarComprandoBtn = document.getElementById('continuar-comprando');
<<<<<<< HEAD
=======
    const carrinhoBody = document.querySelector('.carrinho-body'); // Onde os itens serão adicionados
    const subtotalInfo = document.querySelector('.subtotal-info'); // Onde o subtotal será exibido
    const productCards = document.querySelectorAll('.product-card'); // Todos os cards de produto
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b

    // --- ESTADO DO CARRINHO (A "MEMÓRIA" DO CARRINHO) ---
    let itensDoCarrinho = [];

    // --- FUNÇÕES PRINCIPAIS DO CARRINHO ---

    /**
     * Pega os dados de um card de produto e adiciona ao carrinho
     */
    function adicionarAoCarrinho(event) {
<<<<<<< HEAD
        const card = event.target.closest('.product-card');
        const nome = card.querySelector('h3').innerText;
        const precoTexto = card.querySelector('.price').innerText;
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));
        const imagemSrc = card.querySelector('img').src;

        // Verifica se o item já existe no carrinho
        const itemExistente = itensDoCarrinho.find(item => item.nome === nome);
        if(itemExistente){
=======
        // Pega o card do produto inteiro, que é o 'pai' do botão clicado
        const card = event.target.closest('.product-card');

        // Extrai as informações do produto
        const nome = card.querySelector('h3').innerText;
        const precoTexto = card.querySelector('.price').innerText;
        const imagemSrc = card.querySelector('img').src;

        // Converte o preço de "R$99,99" para um número (99.99)
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));

        // Verifica se o item já existe no carrinho
        const itemExistente = itensDoCarrinho.find(item => item.nome === nome);

        if (itemExistente) {
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b
            // Se já existe, apenas aumenta a quantidade
            itemExistente.quantidade++;
        } else {
            // Se não existe, adiciona o novo item à lista
<<<<<<< HEAD
            itensDoCarrinho.push({nome, preco, imagem: imagemSrc, quantidade:1});
=======
            itensDoCarrinho.push({
                nome: nome,
                preco: preco,
                imagem: imagemSrc,
                quantidade: 1,
            });
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b
        }

        // Atualiza a exibição do carrinho na tela
        renderizarCarrinho();
        // Abre o carrinho para o usuário ver o que adicionou
        abrirCarrinho();
    }

    /**
     * Desenha os itens do carrinho na aba lateral
     */
    function renderizarCarrinho() {
<<<<<<< HEAD
        // Limpa o carrinho antes de adicionar os itens atualizados
        carrinhoBody.innerHTML = '';

        // Se o carrinho estiver vazio, exibe mensagem
        if(itensDoCarrinho.length === 0){
            carrinhoBody.innerHTML = '<p style="text-align:center;color:#666;">Seu carrinho está vazio.</p>';
            atualizarSubtotal(); // Garante que o subtotal zere
            return;
        }

        // Adiciona cada item da lista ao HTML do carrinho
=======
        // 1. Limpa o carrinho antes de adicionar os itens atualizados
        carrinhoBody.innerHTML = '';

        // 2. Verifica se o carrinho está vazio
        if (itensDoCarrinho.length === 0) {
            carrinhoBody.innerHTML = '<p style="text-align: center; color: #666;">Seu carrinho está vazio.</p>';
            atualizarSubtotal(); // Garante que o subtotal zere
            return; // Para a execução da função aqui
        }

        // 3. Adiciona cada item da lista ao HTML do carrinho
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b
        itensDoCarrinho.forEach(item => {
            const itemHTML = `
                <div class="item-carrinho" data-nome="${item.nome}">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="item-info">
                        <p class="item-nome">${item.nome}</p>
                        <div class="item-controles">
                            <input type="number" class="item-qtd" value="${item.quantidade}" min="1">
                            <p class="item-preco">R$${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                            <button class="remover-item-btn">Remover</button>
                        </div>
                    </div>
                </div>
            `;
            carrinhoBody.innerHTML += itemHTML;
        });

<<<<<<< HEAD
        // Atualiza o subtotal após adicionar os itens
        atualizarSubtotal();
    }

=======
        // 4. Atualiza o valor do subtotal
        atualizarSubtotal();
    }
    
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b
    /**
     * Calcula e exibe o preço total dos itens no carrinho
     */
    function atualizarSubtotal() {
        // Calcula o total somando (preço * quantidade) de cada item
        const total = itensDoCarrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
<<<<<<< HEAD

=======
        
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b
        // Formata o número para o padrão brasileiro (R$ 123,45)
        const totalFormatado = total.toFixed(2).replace('.', ',');

        // Exibe no HTML
<<<<<<< HEAD
        subtotalInfo.innerHTML = `<span>Subtotal</span><span>R$${totalFormatado}</span>`;
    }

    /**
     * Lida com cliques dentro do corpo do carrinho (remover item, mudar quantidade)
     */
    function manipularCarrinho(event){
        const target = event.target;
        const itemElemento = target.closest('.item-carrinho');
        if(!itemElemento) return;
=======
        subtotalInfo.innerHTML = `
            <span>Subtotal</span>
            <span>R$${totalFormatado}</span>
        `;
    }

    /**
     * Lida com cliques dentro do corpo do carrinho (remover item, mudar qtd)
     */
    function manipularCarrinho(event) {
        const target = event.target;
        const itemElemento = target.closest('.item-carrinho');
        if (!itemElemento) return;
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b

        const nomeDoItem = itemElemento.dataset.nome;

        // Se clicou no botão de remover
<<<<<<< HEAD
        if(target.classList.contains('remover-item-btn')){
            itensDoCarrinho = itensDoCarrinho.filter(item => item.nome !== nomeDoItem);
        }

        // Se mudou a quantidade no input
        if(target.classList.contains('item-qtd')){
            const novaQtd = parseInt(target.value);
            const itemParaAtualizar = itensDoCarrinho.find(item => item.nome === nomeDoItem);
            if(itemParaAtualizar && novaQtd > 0){
                itemParaAtualizar.quantidade = novaQtd;
            } else {
                // Se a quantidade for inválida, remove o item
                itensDoCarrinho = itensDoCarrinho.filter(item => item.nome !== nomeDoItem);
            }
        }

=======
        if (target.classList.contains('remover-item-btn')) {
            // Filtra o array, mantendo apenas os itens que NÃO são o que queremos remover
            itensDoCarrinho = itensDoCarrinho.filter(item => item.nome !== nomeDoItem);
        }
        
        // Se mudou a quantidade no input
        if (target.classList.contains('item-qtd')) {
            const novaQuantidade = parseInt(target.value);
            const itemParaAtualizar = itensDoCarrinho.find(item => item.nome === nomeDoItem);

            if (itemParaAtualizar && novaQuantidade > 0) {
                itemParaAtualizar.quantidade = novaQuantidade;
            } else {
                // Se a quantidade for inválida, remove o item
                 itensDoCarrinho = itensDoCarrinho.filter(item => item.nome !== nomeDoItem);
            }
        }
        
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b
        // Redesenha o carrinho com os dados atualizados
        renderizarCarrinho();
    }

<<<<<<< HEAD
    // --- FUNÇÕES PARA ABRIR/FECHAR O CARRINHO ---
    function abrirCarrinho(){
        overlay.classList.remove('hidden');
        carrinhoLateral.classList.remove('hidden');
    }

    function fecharCarrinho(){
        overlay.classList.add('hidden');
        carrinhoLateral.classList.add('hidden');
    }

    // --- "OUVINTES" DE EVENTOS (EVENT LISTENERS) ---
=======

    // --- FUNÇÕES PARA ABRIR/FECHAR O CARRINHO ---
    function abrirCarrinho() {
        if (carrinhoLateral && overlay) {
            overlay.classList.remove('hidden');
            carrinhoLateral.classList.remove('hidden');
        }
    }

    function fecharCarrinho() {
        if (carrinhoLateral && overlay) {
            overlay.classList.add('hidden');
            carrinhoLateral.classList.add('hidden');
        }
    }

    // --- "OUVINTES" DE EVENTOS (EVENT LISTENERS) ---

    // Adicionar item ao carrinho
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b
    productCards.forEach(card => {
        const addButton = card.querySelector('.add-to-cart-btn');
        addButton.addEventListener('click', adicionarAoCarrinho);
    });

<<<<<<< HEAD
    carrinhoBody.addEventListener('change', manipularCarrinho); // Para inputs de quantidade
    carrinhoBody.addEventListener('click', manipularCarrinho);  // Para botões de remover

    iconeCarrinho.addEventListener('click', (e)=>{ e.preventDefault(); abrirCarrinho(); });
    fecharCarrinhoBtn.addEventListener('click', fecharCarrinho);
    overlay.addEventListener('click', fecharCarrinho);
    continuarComprandoBtn.addEventListener('click', (e)=>{ e.preventDefault(); fecharCarrinho(); });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && !carrinhoLateral.classList.contains('hidden')) fecharCarrinho(); });

    // Renderiza o carrinho vazio ao iniciar
    renderizarCarrinho();


    // --- PLAYLIST ---
    const playlistLateral = document.getElementById("playlist-lateral");
    const playlistOverlay = document.getElementById("playlist-overlay");
    const iconePlaylist = document.getElementById("icone-playlist");
    const fecharPlaylist = document.getElementById("fechar-playlist");
    const addPlaylistBtn = document.getElementById("addPlaylistBtn");
    const playlistInput = document.getElementById("playlistInput");
    const playlistContainer = document.getElementById("playlistContainer");

    // Abre playlist
    iconePlaylist.addEventListener('click', (e)=>{
        e.preventDefault();
        carrinhoLateral.classList.add('hidden'); // Fecha carrinho se estiver aberto
        playlistLateral.classList.add('active');
        playlistOverlay.classList.remove('hidden');
    });

    // Fecha playlist clicando no X ou overlay
    fecharPlaylist.addEventListener('click', ()=>{
        playlistLateral.classList.remove('active');
        playlistOverlay.classList.add('hidden');
    });
    playlistOverlay.addEventListener('click', ()=>{
        playlistLateral.classList.remove('active');
        playlistOverlay.classList.add('hidden');
    });

    // Adiciona links à playlist
    addPlaylistBtn.addEventListener('click', function() {
        const link = playlistInput.value.trim();
        if(link){
            let embedLink = "";
            if(link.includes("spotify.com")){
                embedLink = link.replace("open.spotify.com","open.spotify.com/embed").split("?")[0];
            } else if(link.includes("deezer.com")){
                const parts = link.split("/");
                const trackId = parts[parts.length - 1].split("?")[0];
                embedLink = `https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=false&width=100%&height=300&color=007FEB&layout=dark&size=medium&type=tracks&id=${trackId}&app_id=1`;
            }

            if(embedLink){
                const iframe = document.createElement("iframe");
                iframe.src = embedLink;
                iframe.width = "100%";
                iframe.height = "300";
                iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
                iframe.style.border = "none";
                iframe.style.borderRadius = "12px";
                playlistContainer.appendChild(iframe);
                playlistInput.value = "";
            } else {
                alert("Link não suportado. Cole um link do Spotify ou Deezer.");
            }
        } else {
            alert("Cole o link da playlist antes de adicionar!");
        }
    });


    // --- CÂMBIO ---
    const cambioLateral = document.getElementById('cambio-lateral');
    const iconeCambio = document.getElementById('icone-cambio');
    const fecharCambio = document.getElementById('fechar-cambio');
    const moedaSelect = document.getElementById('moedaSelect');
    const valorConvertido = document.getElementById('valorConvertido');

    const precoProduto = 99.99; // exemplo — depois dá pra pegar do produto clicado

    iconeCambio.addEventListener('click', ()=>{
        carrinhoLateral.classList.add('hidden');  // Fecha carrinho se estiver aberto
        playlistLateral.classList.remove('active'); // Fecha playlist se estiver aberto
        playlistOverlay.classList.add('hidden'); // Oculta overlay
        cambioLateral.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });

    fecharCambio.addEventListener('click', ()=>{
        cambioLateral.classList.add('hidden');
        overlay.classList.add('hidden');
    });

    moedaSelect.addEventListener('change', async ()=>{
        const moeda = moedaSelect.value;
        try {
            const response = await fetch(`https://api.exchangerate.host/latest?base=BRL&symbols=${moeda}`);
            const data = await response.json();
            const taxa = data.rates[moeda];
            const convertido = (precoProduto * taxa).toFixed(2);
            valorConvertido.innerHTML = `<p>💰 Valor em ${moeda}: <strong>${convertido} ${moeda}</strong></p><p>(Baseado em R$ ${precoProduto})</p>`;
        } catch (err) {
            valorConvertido.innerHTML = `<p>Erro ao carregar a cotação 😕</p>`;
        }
    });

});
=======
    // Manipular itens já no carrinho (remover, alterar quantidade)
    carrinhoBody.addEventListener('change', manipularCarrinho); // Para inputs de quantidade
    carrinhoBody.addEventListener('click', manipularCarrinho);    // Para botões de remover

    // Abrir e Fechar a aba do carrinho
    iconeCarrinho.addEventListener('click', (e) => { e.preventDefault(); abrirCarrinho(); });
    fecharCarrinhoBtn.addEventListener('click', fecharCarrinho);
    overlay.addEventListener('click', fecharCarrinho);
    continuarComprandoBtn.addEventListener('click', (e) => { e.preventDefault(); fecharCarrinho(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !carrinhoLateral.classList.contains('hidden')) {
            fecharCarrinho();
        }
    });

    // Inicia a renderização para mostrar "carrinho vazio" ao carregar a página
    renderizarCarrinho();

    // Espera todo o conteúdo da página carregar antes de executar o código
document.addEventListener('DOMContentLoaded', function() {

    // ... (todo o seu código JS existente do carrinho vai aqui) ...
    
    // --- "OUVINTES" DE EVENTOS (EVENT LISTENERS) ---
    
    // ... (os event listeners do seu carrinho vão aqui) ...

    // Inicia a renderização para mostrar "carrinho vazio" ao carregar a página
    renderizarCarrinho();


    /* =================================================== */
    /* ADICIONE O NOVO CÓDIGO PARA AS CATEGORIAS AQUI    */
    /* =================================================== */
    
    // Seleciona todos os itens de categoria
    const categoryItems = document.querySelectorAll('.category-item');

    // Para cada item de categoria, adiciona um "ouvinte" de clique
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Pega o nome da categoria que está dentro do elemento <span>
            const categoryName = item.querySelector('span').innerText;

            // Mostra um alerta com o nome da categoria clicada
            // No futuro, você pode trocar este alerta por uma função de filtro de produtos!
            alert(`Você clicou na categoria: ${categoryName}`);
        });
    });

}); // <-- Esta é a chave de fechamento final do seu addEventListener
});
>>>>>>> 61796aee0cf2ad56b17042612613328bedc7261b
