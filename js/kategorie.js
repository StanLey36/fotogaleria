document.addEventListener('DOMContentLoaded', function() {


    // zavri overlay po stlaceni x
    let closeOverlay = document.querySelector('.closeOverlay');
    closeOverlay.style.cursor = 'pointer';
    closeOverlay.onclick = function() {
        document.getElementById('overlay').style.display = 'none';
        document.querySelector('.create-card').style.display = 'flex';
    };

    // nastav link na homepage namiesto predosleho textu
    const subbGrid = document.querySelector('.grid-container');
    const styles = window.getComputedStyle(subbGrid, null);
    const displayValue = styles.getPropertyValue("display");

    if (displayValue === 'grid') {
        document.getElementById("link-or-title").innerHTML = `<img src="/img/Frame-3.png" width="16" height="16" style="transform: rotateY(180deg);" /><a href="index.html" style="color:balck;text-decoration:none;">  Architektúra</a>`;
    }

    //vytvor novy item gridu - novy obrazok

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

    document.getElementById('submitButton').onclick = function() {
        document.getElementById('overlay').style.display = 'none';
        document.querySelector('.create-card').style.display = 'flex';
        let newDiv = document.createElement('div');
        newDiv.classList.add('card');
        newDiv.classList.add('image');
        newDiv.innerHTML = `<img id="category-image-item" src="${imgLink}" alt="obrázok">`; // Opravený riadok s imgLink
        newDiv.style.cursor = "pointer";
        let createCard = document.querySelector('.create-card');
        createCard.parentNode.insertBefore(newDiv, createCard);
    };

    dropArea.addEventListener("dragover", function(e) {
        e.preventDefault();
    });

    dropArea.addEventListener("drop", function(e) {
        e.preventDefault();
        inputFile.files = e.dataTransfer.files;
        uploadImage();
    });


    // zobrazenie obrázkov v lightboxe
    const gallery = document.querySelectorAll(".image:not(:last-child)"),
        previewBox = document.querySelector(".preview-box"),
        previewImg = previewBox.querySelector("img"),
        closeIcon = previewBox.querySelector(".icon"),
        shadow = document.querySelector(".shadow");


    for (let i = 0; i < gallery.length - 1; i++) {
        console.log(gallery.length);
        let newIndex = i; //passing i value to newIndex variable
        let clickedImgIndex; //creating new variable

        gallery[i].onclick = () => {
            clickedImgIndex = i; //passing cliked image index to created variable (clickedImgIndex)
            function preview() {
                let imageURL = gallery[newIndex].querySelector("img").src; //getting user clicked img url
                previewImg.src = imageURL; //passing user clicked img url in previewImg src
            }
            preview(); //calling above function

            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");
            if (newIndex == 0) { //if index value is equal to 0 then hide prevBtn
                prevBtn.style.display = "none";
            }
            if (newIndex >= gallery.length - 1) { //if index value is greater and equal to gallery length by -1 then hide nextBtn
                nextBtn.style.display = "none";
            }
            prevBtn.onclick = () => {
                newIndex--; //decrement index
                if (newIndex == 0) {
                    preview();
                    prevBtn.style.display = "none";
                } else {
                    preview();
                    nextBtn.style.display = "block";
                }
            }
            nextBtn.onclick = () => {
                newIndex++; //increment index
                if (newIndex >= gallery.length - 1) {
                    preview();
                    nextBtn.style.display = "none";
                } else {
                    preview();
                    prevBtn.style.display = "block";
                }
            }
            document.querySelector("body").style.overflow = "hidden";
            previewBox.classList.add("show");
            shadow.style.display = "block";
            closeIcon.onclick = () => {
                newIndex = clickedImgIndex; //assigning user first clicked img index to newIndex
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
                previewBox.classList.remove("show");
                shadow.style.display = "none";
                document.querySelector("body").style.overflow = "scroll";
            }
        }

    }

    document.querySelector(".closeImageView").onclick = function() {
        previewBox.style.display = "none", shadow.style.display = "none";
    };


});