function getWords(callback) {
    chrome.storage.sync.get(["blockedWords"], function(result) {
        callback(result.blockedWords || []);
    });
}

function hidePosts(words) {
    // Seleciona posts do feed do LinkedIn
    const posts = document.querySelectorAll('[data-urn^="urn:li:activity:"]');
    posts.forEach(post => {
        const text = post.innerText.toLowerCase();
        for (let w of words) {
            if (text.includes(w.toLowerCase())) {
                post.style.display = "none";
                break;
            }
        }
    });
}

function runFilter() {
    getWords(hidePosts);
}

// Executa ao carregar a página e a cada 2 segundos (posts dinâmicos)
runFilter();
setInterval(runFilter, 2000);

// Ouça atualizações da lista de palavras
chrome.storage.onChanged.addListener(runFilter);