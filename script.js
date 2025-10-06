document.addEventListener('DOMContentLoaded', function () {

    // =============================================== //
    // --- LÓGICA DO CARRINHO (COM LOCALSTORAGE) --- //
    // =============================================== //

    const carrinhoLateral = document.getElementById('carrinho-lateral');
    const iconeCarrinho = document.getElementById('icone-carrinho');
    const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
    const overlay = document.getElementById('overlay');
    const productCards = document.querySelectorAll('.product-card, .product-card-2');

    let itensDoCarrinho = JSON.parse(localStorage.getItem('beatwearCarrinho')) || [];
    let itensDosDesejos = JSON.parse(localStorage.getItem('beatwearDesejos')) || [];

    function salvarCarrinho() {
        localStorage.setItem('beatwearCarrinho', JSON.stringify(itensDoCarrinho));
    }

    function adicionarAoCarrinho(event) {
        const card = event.target.closest('.product-card, .product-card-2');
        if (!card) return;

        const nome = card.querySelector('h3').innerText;
        const precoTexto = card.querySelector('.price').innerText;
        const imagemSrc = card.querySelector('img').src;
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));
        const itemExistente = itensDoCarrinho.find(item => item.nome === nome);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            itensDoCarrinho.push({ nome, preco, imagem: imagemSrc, quantidade: 1 });
        }
        salvarCarrinho();
        renderizarCarrinhoLateral();
        abrirCarrinho();
    }

    function manipularCarrinho(event, origem) {
        const target = event.target;

        const botaoRemover = target.closest('.remover-item-btn');
        const itemElemento = target.closest('.item-carrinho');

        if (!itemElemento) return;

        const nomeDoItem = itemElemento.dataset.nome;
        const itemParaAtualizar = itensDoCarrinho.find(item => item.nome === nomeDoItem);

        if (botaoRemover) {
            itensDoCarrinho = itensDoCarrinho.filter(item => item.nome !== nomeDoItem);
        }

        if (target.classList.contains('item-qtd')) {
            const novaQuantidade = parseInt(target.value);
            if (itemParaAtualizar && novaQuantidade > 0) {
                itemParaAtualizar.quantidade = novaQuantidade;
            } else {
                itensDoCarrinho = itensDoCarrinho.filter(item => item.nome !== nomeDoItem);
            }
        }

        salvarCarrinho();

        if (origem === 'paginaCarrinho') {
            renderizarPaginaCarrinho();
        } else {
            renderizarCarrinhoLateral();
        }
    }

    function renderizarCarrinhoLateral() {
        const carrinhoBody = document.querySelector('#carrinho-lateral .carrinho-body');
        const subtotalInfo = document.querySelector('#carrinho-lateral .subtotal-info');
        if (!carrinhoBody) return;

        carrinhoBody.innerHTML = '';
        if (itensDoCarrinho.length === 0) {
            carrinhoBody.innerHTML = '<p style="text-align: center; color: #666;">Seu carrinho está vazio.</p>';
        } else {
            itensDoCarrinho.forEach(item => {
                carrinhoBody.innerHTML += `
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
                    </div>`;
            });
        }
        const total = itensDoCarrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
        if (subtotalInfo) {
            subtotalInfo.innerHTML = `<span>Subtotal</span><span>R$${total.toFixed(2).replace('.', ',')}</span>`;
        }
    }

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

    // =============================================== //
    // --- NOVA LÓGICA DA LISTA DE DESEJOS --- //
    // =============================================== //

    function salvarDesejos() {
        localStorage.setItem('beatwearDesejos', JSON.stringify(itensDosDesejos));
    }

    function manipularDesejo(event) {
        const card = event.target.closest('.product-card, .product-card-2');
        if (!card) return;

        const nome = card.querySelector('h3').innerText;
        const itemExistente = itensDosDesejos.find(item => item.nome === nome);

        if (itemExistente) {
            itensDosDesejos = itensDosDesejos.filter(item => item.nome !== nome);
        } else {
            const precoTexto = card.querySelector('.price')?.innerText || '';
            const noPriceTexto = card.querySelector('.noprice')?.innerText || '';
            const priceDescTexto = card.querySelector('.pricedesc')?.innerText || '';
            const imagemSrc = card.querySelector('img').src;
            itensDosDesejos.push({ nome, precoTexto, noPriceTexto, priceDescTexto, imagem: imagemSrc });
        }

        salvarDesejos();
        atualizarBotoesDesejo();
        if (document.body.classList.contains('CorpoDesejos')) {
            renderizarPaginaDesejos();
        }
    }

    function atualizarBotoesDesejo() {
        document.querySelectorAll('.add-to-wishlist-btn').forEach(button => {
            const card = button.closest('.product-card, .product-card-2');
            if (!card) return;
            const nome = card.querySelector('h3').innerText;
            const itemExistente = itensDosDesejos.find(item => item.nome === nome);

            if (itemExistente) {
                button.classList.add('active');
                button.innerHTML = '<i class="ph-fill ph-heart"></i>';
            } else {
                button.classList.remove('active');
                button.innerHTML = '<i class="ph ph-heart"></i>';
            }
        });
    }

    // --- Seção de "Ouvintes" de Eventos (Event Listeners) ---

    document.querySelectorAll('.add-to-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', manipularDesejo);
    });

    if (iconeCarrinho) iconeCarrinho.addEventListener('click', (e) => { e.preventDefault(); abrirCarrinho(); });
    if (fecharCarrinhoBtn) fecharCarrinhoBtn.addEventListener('click', fecharCarrinho);
    if (overlay) overlay.addEventListener('click', fecharCarrinho);

    productCards.forEach(card => {
        const addButton = card.querySelector('.add-to-cart-btn');
        if (addButton) addButton.addEventListener('click', adicionarAoCarrinho);
    });

    const carrinhoBodyLateral = document.querySelector('#carrinho-lateral .carrinho-body');
    if (carrinhoBodyLateral) {
        carrinhoBodyLateral.addEventListener('change', (e) => manipularCarrinho(e, 'lateral'));
        carrinhoBodyLateral.addEventListener('click', (e) => manipularCarrinho(e, 'lateral'));
    }

    // --- LÓGICA PARA A PÁGINA carrinho.html ---
    const containerPaginaCarrinho = document.querySelector('.carrinho-itens-lista');
    if (containerPaginaCarrinho) {
        function renderizarPaginaCarrinho() {
            containerPaginaCarrinho.innerHTML = '';
            if (itensDoCarrinho.length === 0) {
                containerPaginaCarrinho.innerHTML = '<h3 style="text-align: center; color: #666;">Seu carrinho está vazio.</h3>';
            } else {
                itensDoCarrinho.forEach(item => {
                    containerPaginaCarrinho.innerHTML += `
                        <div class="item-carrinho item-pagina" data-nome="${item.nome}">
                            <img src="${item.imagem}" alt="${item.nome}">
                            <div class="item-info">
                                <p class="item-nome">${item.nome}</p>
                                <p class="item-preco-unitario">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                            </div>
                            <div class="item-controles-pagina">
                                <input type="number" class="item-qtd" value="${item.quantidade}" min="1">
                                <p class="item-preco">R$${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                                <button class="remover-item-btn"><i class="ph ph-trash"></i></button>
                            </div>
                        </div>`;
                });
            }
            const total = itensDoCarrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
            document.getElementById('subtotal-carrinho').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
            document.getElementById('total-carrinho').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }

        containerPaginaCarrinho.addEventListener('change', (e) => manipularCarrinho(e, 'paginaCarrinho'));
        containerPaginaCarrinho.addEventListener('click', (e) => manipularCarrinho(e, 'paginaCarrinho'));
        renderizarPaginaCarrinho();
    }

    // --- LÓGICA PARA RENDERIZAR A PÁGINA desejo.html ---
    const containerPaginaDesejos = document.querySelector('body.CorpoDesejos .product-grid-2');
    if (containerPaginaDesejos) {

        function renderizarPaginaDesejos() {
            containerPaginaDesejos.innerHTML = ''; // Limpa a área

            const contadorItensEl = document.querySelector('.divisao_itens .parts1');
            if (contadorItensEl) {
                if (itensDosDesejos.length > 0) {
                    contadorItensEl.textContent = `ITENS (${itensDosDesejos.length})`;
                } else {
                    contadorItensEl.textContent = 'ITENS';
                }
            }

            if (itensDosDesejos.length === 0) {
                containerPaginaDesejos.innerHTML = '<h3 style="text-align: center; color: #666; grid-column: 1 / -1;">Sua lista de desejos está vazia.</h3>';
                return;
            }

            itensDosDesejos.forEach(item => {
                containerPaginaDesejos.innerHTML += `
                <div class="product-card-2">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <button class="add-to-wishlist-btn active" aria-label="Remover dos Desejos"><i class="ph-fill ph-heart"></i></button>
                    <h3>${item.nome}</h3>
                    ${item.noPriceTexto ? `<p class="noprice">${item.noPriceTexto}</p>` : ''}
                    <p class="price">${item.precoTexto}</p>
                    ${item.priceDescTexto ? `<p class="pricedesc">${item.priceDescTexto}</p>` : ''}
                    <button class="add-to-cart-btn" aria-label="Adicionar ao carrinho"><i class="ph ph-shopping-cart-simple"></i></button>
                    <button class="remover-desejo-btn">Remover da Lista</button>
                </div>
            `;
            });
            containerPaginaDesejos.querySelectorAll('.add-to-cart-btn').forEach(btn => btn.addEventListener('click', adicionarAoCarrinho));
        }
        containerPaginaDesejos.addEventListener('click', function (event) {
            if (event.target.closest('.remover-desejo-btn') || event.target.closest('.add-to-wishlist-btn')) {
                const card = event.target.closest('.product-card-2');
                if (!card) return;

                const nomeParaRemover = card.querySelector('h3').innerText;

                itensDosDesejos = itensDosDesejos.filter(item => item.nome !== nomeParaRemover);
                salvarDesejos();
                renderizarPaginaDesejos();
                atualizarBotoesDesejo();
            }
        });

        renderizarPaginaDesejos();
    }

    renderizarCarrinhoLateral();
    atualizarBotoesDesejo();

    // =============================================== //
    // --- LÓGICA DO CARROSSEL DA PÁGINA INICIAL --- //
    // =============================================== //
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const slidesData = [
            { image: 'img/Camiseta Harry Styles.png', title: 'CAMISETA HARRY STYLES', subtitle: 'FINE LINE', description: 'Durante a vida temos momeentos ruins as vezes até péssimo, mas no final... Tudo vai ficar bem!', avatar: 'img/Harry Styles.jpg' },
            { image: 'img/Alex Warren camiseta.jpg', title: 'CAMISETA ALEX WARREN', subtitle: 'THE ORDINARY', description: 'They say the holy waters watered down and this towns lost its faith our colors will fade eventually so if our time is running out day after day we will make the mundane our masterpiece', avatar: 'img/Alex Warren.jpg' },
            { image: 'img/Moletom Charlie Brown Jr.jpeg.jpg', title: 'MOLETOM CHORÃO', subtitle: 'O PREÇO', description: 'Andar de skate e tocar, é corri pra ver o mar fui atrás do que quis, é sabia, só assim, podia ser feliz eu quero ser feliz quem não quer ser feliz, me diz?', avatar: 'img/chorao.jpg' },
            { image: 'img/camiseta Shawn Mendes.jpg', title: 'CAMISETA SHAWN MENDES', subtitle: 'THERE IS NOTHING HOLDIN ME BACK', description: 'Oh, I have been shaking i love it when you go crazy you take all my inhibitions baby, there is nothing holdin me back you take me places that tear up my reputation manipulate my decisions baby, there is nothing holdin me back', avatar: 'img/ShawnMendes.jpg' }
        ];
        let currentSlide = 0;
        const heroContentWrapper = heroSection.querySelector('.hero-content-wrapper');
        const heroImage = heroSection.querySelector('.hero-image img');
        const heroTitle = heroSection.querySelector('.hero-content h1');
        const heroSubtitle = heroSection.querySelector('.hero-content h2');
        const heroDescription = heroSection.querySelector('.hero-content p');
        const heroAvatar = heroSection.querySelector('.user-avatars img');
        const arrowLeft = heroSection.querySelector('.arrow.left');
        const arrowRight = heroSection.querySelector('.arrow.right');
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'hero-indicators';
        heroSection.appendChild(indicatorsContainer);
        slidesData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => showSlide(index));
            indicatorsContainer.appendChild(dot);
        });
        const dots = indicatorsContainer.querySelectorAll('.dot');
        function showSlide(index) {
            heroContentWrapper.style.opacity = '0';
            setTimeout(() => {
                const slide = slidesData[index];
                heroImage.src = slide.image;
                heroTitle.textContent = slide.title;
                heroSubtitle.textContent = slide.subtitle;
                heroDescription.textContent = slide.description;
                heroAvatar.src = slide.avatar;
                heroContentWrapper.style.opacity = '1';
                dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
                currentSlide = index;
            }, 500);
        }
        arrowRight.addEventListener('click', () => showSlide((currentSlide + 1) % slidesData.length));
        arrowLeft.addEventListener('click', () => showSlide((currentSlide - 1 + slidesData.length) % slidesData.length));
        showSlide(0);
    }

    // =============================================== //
    // --- LÓGICA DE EDITAR/SALVAR PERFIL --- //
    // =============================================== //
    const profileSection = document.querySelector('#meus-dados');
    if (profileSection) {
        const editButton = profileSection.querySelector('.btn-main');
        const inputs = profileSection.querySelectorAll('input');
        editButton.addEventListener('click', function () {
            if (editButton.textContent === 'Editar Dados') {
                inputs.forEach(input => input.disabled = false);
                editButton.textContent = 'Salvar';
                inputs[0].focus();
            } else {
                inputs.forEach(input => input.disabled = true);
                editButton.textContent = 'Editar Dados';
            }
        });
    }
});