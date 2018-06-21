const marked = require('marked');
const Prism = require('prismjs');


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
        if (!lang) lang = 'js';
        try {
            return Prism.highlight(code, Prism.languages[lang], lang);
        } catch (e) {
            console.log(e);
        }

    }
});

module.exports = marked;