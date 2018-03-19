const marked = require('marked');
const highlight = require('highlight.js');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    highlight: (code, lang) => {
        return highlight.highlightAuto(code).second_best.value;
    }
});

function hightOption() {
    
}

module.exports = marked;