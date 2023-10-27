document.addEventListener('DOMContentLoaded', function() {

    const dropArea = document.getElementById("drop-area");
    const inputFile = document.getElementById("input-file");
    const imageView = document.getElementById("img-view");
    let imgLink = '';

    inputFile.addEventListener("change", uploadImage);

    function uploadImage() {
        imgLink = URL.createObjectURL(inputFile.files[0]);
        imageView.style.backgroundImage = `url(${imgLink})`;
        imageView.textContent = "";
        imageView.style.border = "none";
    }

    document.getElementById('submitButton').onclick = function () {
        document.getElementById('overlay').style.display = 'none';
        document.querySelector('.create-card').style.display = 'flex';
        let newDiv = document.createElement('div');
        newDiv.classList.add('card');
        newDiv.innerHTML = `<img id="category-image-item" src="${imgLink}" alt="obrázok">`; // Opravený riadok s imgLink
        let createCard = document.querySelector('.create-card');
        createCard.parentNode.insertBefore(newDiv, createCard);
    };

    dropArea.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    dropArea.addEventListener("drop", function (e) {
        e.preventDefault();
        inputFile.files = e.dataTransfer.files;
        uploadImage();
    });

    

    let closeOverlay = document.querySelector('.closeOverlay');
    closeOverlay.style.cursor = 'pointer';
    closeOverlay.onclick = function() {
        document.getElementById('overlay').style.display = 'none';
        document.querySelector('.create-card').style.display = 'flex';
    };

    const subbGrid = document.querySelector('.grid-container');
    const styles = window.getComputedStyle(subbGrid, null);
    const displayValue = styles.getPropertyValue("display");

    if (displayValue === 'grid') {
        document.getElementById("link-or-title").innerHTML = `<a href="index.html" style="color:balck;text-decoration:none;">Naspäť</a>`;
    }
    

    //      OPEN OVERLAY WITH BIG IMAGE
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
        let closeOverlay = document.querySelector('.closeOverlay');
        closeOverlay.style.cursor = 'pointer';
        closeOverlay.onclick = function() {
            document.getElementById('overlay').style.display = 'none';
            document.querySelector('.create-card').style.display = 'flex';
        };
    };
    
    let cards = document.querySelectorAll('.grid-container .card');
    let imagesArray = [];
    cards.forEach(card => {
        let images = card.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            imagesArray.push(images[i].src);
        }
    });
    console.log(imagesArray);
    localStorage.setItem("imagesCount", imagesArray.length);
        
});


