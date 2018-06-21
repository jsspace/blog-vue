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
        let trans = highlight.highlightAuto(code);
        if (trans.second_best) {
            return trans.second_best.value;
        }
        return trans.value;
    }
});

module.exports = marked;