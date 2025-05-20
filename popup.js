const input = document.getElementById('wordInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('wordList');

function updateList() {
    chrome.storage.sync.get(["blockedWords"], function(result) {
        const words = result.blockedWords || [];
        list.innerHTML = '';
        words.forEach((w, idx) => {
            const li = document.createElement('li');
            li.textContent = w;
            const rm = document.createElement("button");
            rm.textContent = "❌";
            rm.onclick = () => {
                words.splice(idx,1);
                chrome.storage.sync.set({blockedWords: words}, updateList);
            };
            li.appendChild(rm);
            list.appendChild(li);
        });
    });
}

addBtn.onclick = function() {
    const word = input.value.trim();
    if (!word) return;
    chrome.storage.sync.get(["blockedWords"], function(result) {
        let words = result.blockedWords || [];
        if (!words.includes(word)) {
            words.push(word);
            chrome.storage.sync.set({blockedWords: words}, updateList);
        }
        input.value = '';
    });
};

updateList();