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


    /*


    //      Pokus o vytvorenie SPA bez frameworku, :/



    //      CONSTS FOR GRIDS
    const mainGridItems = document.querySelectorAll('.grid-container .card:not(:last-child)');
    const subGrid = document.querySelector('.sub-grid');

    //      CLICKING ON ITEM IN MAIN GRID - HOME PAGE
    mainGridItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const gridContainer = document.querySelector('.grid-container').style.display = 'none';
            const subbGrid = document.querySelector('.sub-grid');
            subbGrid.style.display = 'grid';
            const styles = window.getComputedStyle(subbGrid, null);
            const displayValue = styles.getPropertyValue("display");

            // TODO: vloženie časti HTML kódu do novej mriežky
            let newHTML = `
                <div class="card">
                    <img src="/pexels-raychel-sanner-4870641.jpg" alt=" " />
                    <div class="card_body">
                        <h6 class="card_title">Storm</h6>
                    </div>
                </div>
                <div class="card create-card">
                    <div class="card_body">
                        <div class="create-category-tile" id="default">
                            <button id="openButton">+</button>
                            <p>Pridať kategóriu</p>
                        </div>
                    </div>
                </div>
            `;
            subbGrid.innerHTML = newHTML;

            if (displayValue === 'grid') {
                document.getElementById("link-or-title").innerHTML = `<a href="daco2-2.html" style="color:balck;text-decoration:none;">Naspäť</a>`;
            }
        });
    });
    */

