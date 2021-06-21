/*global data, fetch, Reveal*/
(function () {
    var page = 0;
    init();
    function addPagesSection(page, theme, pages) {
        for(var i = 0; i < pages; i++) {
            document.getElementById('section-' + theme).innerHTML +=
		    '<section data-file="' + theme + '_' + i + '" id="tema-' + theme + '-pagina-' + i + '"></section>';
        }
    }
    function addThemeSection(page, theme) {
    	document.getElementById('slideid').innerHTML += '<section id="section-' + theme + '"></section>';
    }
    function addTitleSection(page, theme, title) {
        if(title == '') {
            title = 'Tema ' + theme;
        } else {
            title = theme + '. ' + title;
        }
        title = '<h2>' + title + '</h2>';
    	document.getElementById('section-' + theme).innerHTML += '<section id="tema-' + theme + '">' + title + '</section>';
    }
    function addPages(json) {
        for(var i = 0; i < json.temas.length; i++) {
            addThemeSection(i + 1, json.temas[i].tema);
            addTitleSection(i + 1, json.temas[i].tema, json.temas[i].titulo);
            addPagesSection(i + 1, json.temas[i].tema, json.temas[i].archivos);
        }
        Reveal.initialize();
        Reveal.addEventListener('slidechanged', function( event ) {
            var state = Reveal.getState();
            var id = event.currentSlide.id;
            var element = document.getElementById(id);
            var content = element.innerHTML;
            if(content=='') {
        	var dataFile = element.getAttribute('data-file');
        	load(dataFile, id);
            }
        });
    }
    function init() {
        addPages(data);
    }
    function load(page, id) {
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = 'text';
    	xhttp.onreadystatechange = function() {
    	    if (xhttp.readyState == 4 && xhttp.status == 200) {
		document.getElementById(id).innerHTML = xhttp.responseText;
		var state = Reveal.getState();
                Reveal.setState(state);
    	    }
    	};
    	xhttp.open("GET", 'data/' + page + '?r=' + new Date().getTime(), true);
    	xhttp.send();
    }
})();
