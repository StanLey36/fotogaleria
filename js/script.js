document.addEventListener('DOMContentLoaded', function() {

    

    //      LINK TO CATEGORIES GRID (PAGE)
    let items = document.querySelectorAll('.card:not(:last-child)');
    items.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            navigateToPage('kategoria.html');
        });
    });

    function navigateToPage(url) {
        window.location.href = url;
    }


    //      OVERLAY TO ADD CATEGORY
    document.getElementById('openButton').onclick = function() {
        document.getElementById('overlay').style.display = 'flex';
        document.querySelector('.create-card').style.display = 'none';
        document.getElementById('overlay').style.zIndex = 5;
        let closeOverlay = document.querySelector('.closeOverlay');
        closeOverlay.style.cursor = 'pointer';
        closeOverlay.onclick = function() {
            document.getElementById('overlay').style.display = 'none';
            document.querySelector('.create-card').style.display = 'flex';
        };
    };
    
    //      CREATE CATEGORY WITH ADDED NAME
    document.getElementById('submitButton').onclick = function() {
        let categoryName = document.getElementById('categoryName').value;
        if(categoryName !== '') {
            document.getElementById('overlay').style.display = 'none';
            document.querySelector('.create-card').style.display = 'flex';
            let newDiv = document.createElement('div');
            newDiv.classList.add('card');
            newDiv.innerHTML = '<img src="/img/pexels-city.jpg" alt="obrázok"><span>0 fotiek</span><div class="card_body"><h6 class="card_title">' + categoryName + '</h6></div>';
            let createCard = document.querySelector('.create-card');
            createCard.parentNode.insertBefore(newDiv, createCard);
            categoryName.value = '';
        }
    };

    var imagesCount = localStorage.getItem("imagesCount");
    console.log(imagesCount);
    var spans = document.querySelectorAll(".card span");

    // Prejdite cez každý element a nastavte text pomocou vlastnosti innerText
    spans.forEach(function(span) {
        if (imagesCount == 1) {
            span.innerText = imagesCount + " fotka";
        }
        else if (imagesCount == 2 || imagesCount == 3 || imagesCount == 4 ) {
            span.innerText = imagesCount + " fotky";
        }
        else{
            span.innerText = imagesCount + " fotiek";
        }
        
    });

});


(function($) {

	// spustime slider, bude spraveny tak, ze tam mozeme poslat selektor
	// aby keby v html mame covery v inom elemente alebo v elemente s inym classom, stale to fungovalo
	Slider.init({
		selector: '.cover'
	});


	// ikona vlavo zobrazi predosly
	$('.prev').on('click', function() {
		Slider.prev();
	});

	// ikona vpravo zobrazi nasledovny
	$('.next').on('click', function() {
		Slider.next();
	});

	
	// mozeme spravit aj ovladanie sipkami na klavesnici
	$(document).on('keydown', function(event) {
		
		// to || znamena "alebo", cize pouzije sa keyCode alebo which, podla toho, co existuje
		var keyCode = event.keyCode || event.which, 
      		arrow = {left: 37,right: 39};

		switch(event.which) {
			case arrow.left: 
				Slider.prev();
				break;
			case arrow.right:
				Slider.next();
				break;
		}

	});

})(jQuery);


