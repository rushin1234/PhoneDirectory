// Node class for Trie
class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  // Trie class
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    // Insert a word into the Trie
    insert(word) {
      let node = this.root;
      for (const char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
    }
  
    // Search for a word in the Trie
    search(word) {
      let node = this.root;
      for (const char of word) {
        if (!node.children[char]) {
          return false;
        }
        node = node.children[char];
      }
      return node.isEndOfWord;
    }
  
    // Check if a given word is a prefix of any word in the Trie
    startsWith(prefix) {
      let node = this.root;
      for (const char of prefix) {
        if (!node.children[char]) {
          return false;
        }
        node = node.children[char];
      }
      return true;
    }
    phoneDirectory(key) {
        let f = 0;
        let prev = this.root;
        let curr;
        for(let i=0; i<key.length; i++) {
            curr = prev.children[key.charAt(i)];
            if(!curr) {
                f = 1;
                break;
            }
            prev = curr;
        }
        if(f == 0) this.printSuggestion(prev,key);
    }
    printSuggestion(curr, key) {
        if(curr.isEndOfWord) {
            add_to_do(key)
            console.log(key);
            return;
        }
        for(let ch='a'; ch<='z'; ch=String.fromCharCode(ch.charCodeAt(0) + 1)) {
            if(!curr.children[ch]) {
                continue;
            }
            key = key + ch;
            this.printSuggestion(curr.children[ch], key);
            key = key.slice(0,-1)
        }
    }
    printAllWords() {
        const words = [];

        function dfs(node, currentWord) {
          if (node.isEndOfWord) {
            words.push(currentWord);
          }

          for (const [char, child] of Object.entries(node.children)) {
            dfs(child, currentWord + char);
          }
        }

        dfs(this.root, '');
        return words;
    }
  }
 
const trie = new Trie();

let item = document.querySelector('#item')
let to_do_box = document.querySelector('#to-do-box')
item.addEventListener('keyup',function(event){
    if(event.key=="Enter"){
        // insert word in trie and print all words of trie
        trie.insert(this.value)
        const words = trie.printAllWords()
        for(let i=0; i<words.length; i++) {
            add_to_do(words[i])
        }
        this.value=""
    }else {
        // 1st remove all childs and implement phone directory
        const removeableElements = document.querySelectorAll('.removeable');
        const box = document.getElementById('to-do-box');
        removeableElements.forEach((element) => {
          box.removeChild(element);
        });
        trie.phoneDirectory(this.value)
    }
})

const add_to_do=(item)=>{
    const listitem=document.createElement('li')
    listitem.innerHTML=`
    ${item}
    <button id="btn">remove</button>
    `
    listitem.classList.add("removeable")
    listitem.addEventListener('click',function(){
        this.classList.toggle('done')
    })
    
    listitem.querySelector('button').addEventListener('click',function(){
        listitem.remove()
    })

    to_do_box.appendChild(listitem)
}





  
  