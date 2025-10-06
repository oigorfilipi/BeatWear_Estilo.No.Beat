// =============================================== //
// --- LÓGICA DO MODAL DE PLAYLIST --- //
// =============================================== //

// 1. Seleção dos Elementos
const iconePlaylist = document.getElementById("icone-playlist"); // Certifique-se que o ícone do fone tem este ID
const playlistOverlay = document.getElementById("playlist-overlay");
const playlistLateral = document.getElementById("playlist-lateral");
const fecharPlaylistBtn = document.getElementById("fechar-playlist");

// Botões e containers do MODAL
const addPlaylistBtnModal = document.getElementById('addPlaylistBtnModal');
const playlistInputModal = document.getElementById('playlistInputModal');
const playlistContainerModal = document.getElementById('playlistContainerModal');

// Botões e containers da PÁGINA playlist.html
const addPlaylistBtnPagina = document.getElementById('addPlaylistBtn');
const playlistInputPagina = document.getElementById('playlistInput');
const playlistContainerPagina = document.getElementById('playlistContainer');

// 2. Funções Principais

/**
 * Abre o modal lateral da playlist.
 */
function abrirPlaylist() {
    if (playlistLateral && playlistOverlay) {
        playlistOverlay.classList.remove("hidden");
        playlistLateral.classList.remove("hidden");
        // Ao abrir, já tenta renderizar a playlist que estiver salva
        renderizarPlaylist();
    }
}

/**
 * Fecha o modal lateral da playlist.
 */
function fecharPlaylist() {
    if (playlistLateral && playlistOverlay) {
        playlistOverlay.classList.add("hidden");
        playlistLateral.classList.add("hidden");
    }
}

/**
 * Gera o código do iframe a partir de um link do Spotify ou Deezer.
 * @param {string} link - A URL da playlist.
 * @returns {string|null} - O código do iframe ou null se o link for inválido.
 */
function gerarEmbedCode(link) {
    let embedCode = '';

    // Corrigido para a URL correta do Spotify
    if (link.includes('spotify.com/playlist/')) {
        const playlistId = link.split('/playlist/')[1].split('?')[0];
        embedCode = `
            <iframe style="border-radius:12px"
                    src="https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator"
                    width="100%" height="380" frameborder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
    }
    else if (link.includes('deezer.com/playlist/')) {
        const playlistId = link.split('/playlist/')[1].split('?')[0];
        embedCode = `
            <iframe scrolling="no" frameborder="0" allowtransparency="true"
                    src="https://widget.deezer.com/widget/dark/playlist/${playlistId}"
                    width="100%" height="380"></iframe>`;
    }
    else {
        alert('Por favor, insira um link válido do Spotify ou Deezer!');
        return null; // Retorna nulo se o link for inválido
    }
    return embedCode;
}

/**
 * Salva o código do iframe da playlist no localStorage.
 * @param {string} embedCode - O código HTML do iframe.
 */
function salvarPlaylist(embedCode) {
    localStorage.setItem('beatwearPlaylist', embedCode);
}

/**
 * Renderiza a playlist salva tanto no modal quanto na página dedicada, se existirem.
 */
function renderizarPlaylist() {
    const embedCodeSalvo = localStorage.getItem('beatwearPlaylist');

    if (embedCodeSalvo) {
        // Se o container do MODAL existir nesta página, preenche ele
        if (playlistContainerModal) {
            playlistContainerModal.innerHTML = embedCodeSalvo;
        }
        // Se o container da PÁGINA DEDICADA existir, preenche ele
        if (playlistContainerPagina) {
            playlistContainerPagina.innerHTML = embedCodeSalvo;
        }
    }
}

// 3. "Ouvintes" de Eventos (Event Listeners)

// Abrir e fechar o modal
if (iconePlaylist) {
    iconePlaylist.addEventListener("click", abrirPlaylist);
}
if (fecharPlaylistBtn) {
    fecharPlaylistBtn.addEventListener("click", fecharPlaylist);
}
if (playlistOverlay) {
    playlistOverlay.addEventListener("click", fecharPlaylist);
}

// Adicionar playlist a partir do MODAL
if (addPlaylistBtnModal) {
    addPlaylistBtnModal.addEventListener('click', function () {
        const link = playlistInputModal.value.trim();
        const embedCode = gerarEmbedCode(link);

        if (embedCode) {
            salvarPlaylist(embedCode);
            renderizarPlaylist(); // Re-renderiza para mostrar imediatamente
            playlistInputModal.value = ''; // Limpa o campo
        }
    });
}

// Adicionar playlist a partir da PÁGINA DEDICADA
if (addPlaylistBtnPagina) {
    addPlaylistBtnPagina.addEventListener('click', function () {
        const link = playlistInputPagina.value.trim();
        const embedCode = gerarEmbedCode(link);

        if (embedCode) {
            salvarPlaylist(embedCode);
            renderizarPlaylist(); // Re-renderiza para mostrar imediatamente
            playlistInputPagina.value = ''; // Limpa o campo
        }
    });
}

// --- Chamada inicial ---
// Renderiza a playlist salva assim que a página carrega
renderizarPlaylist();