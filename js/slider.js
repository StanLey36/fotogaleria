var Slider = {

	images: null,   // sem si ulozime vsetky obrazky
	current: null,  // sem si ulozime aktualne zobrazeny obrazok
	selector: null, // ulozime si selektor, keby ho bolo treba v dalsich funkciach

	init: function(data) {
		
		// najdeme si vsetky obrazky
		this.images = $(data.selector);

		// nech mame ten selektor pristupny pre dalsie funkcie Slidera
		this.selector = data.selector;

		// skryjeme vsetky, okrem posledneho
		this.images.not(':last').hide();

	},

	prev: function() {
		
		// pomocou :visible najdeme aktualne zobrazeny element 
		// filter je nieco podobne ako find, akurat ze to nevybera elementy, ale hlada v uz vybranych
		this.current = this.images.filter(':visible');

		// najdeme od neho predosly [.cover] element
		var prev = this.current.prev( this.selector );


		// ak sme na prvom obrazku, predosly neexistuje
		// takze vyberieme posledny. po prvom obrazku zobrazime posledny.
		if ( ! prev.length ) {
			prev = this.images.filter(':last');
		}
		
		// vymenime obrazky
		this.change( this.current, prev );

	},

	next: function() {
		
		// najdeme zobrazeny 
		this.current = this.images.filter(':visible');

		// najdeme nasledovny [.cover] element 
		var next = this.current.next( this.selector );

		// ak sme na poslednom, ziaden nasledovny neexistuje
		// tak vyberieme prvy, aby sme chodili stale dokola
		if ( ! next.length ) {
			next = this.images.filter(':first');
		}
		
		// vymenime
		this.change( this.current, next );

	},

	change: function( currentElement, newElement ) {
		
		// toto je kontrola, ze ci medzi obrazkami existuju take, ktore su prave animovane
		// ak existuju, tak spravime return, cize funkcia sa nedstane dalej 
		// to znamena, ze budeme animovat iba vtedy, ked ziadna animacia neprebieha
		// pretoze inac be sme mohli 50x rychlo stlacit sipku a cakat, kym sa skonci 50 animacii
		if ( this.images.filter(':animated').length > 0 ) {
			return;
		}

		// zobrazime novy element
		newElement.fadeIn();
		
		// nechame zmiznut aktualny element
		currentElement.fadeOut();
		
	}

}