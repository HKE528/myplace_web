const noImage = document.getElementById('nonImage');
const imageViewerDiv = document.getElementById('isImage');

const viewerIndex = document.getElementById('viewerIndex');
const viewerItem = document.getElementById('viewerItem');

function setImageView(count, path) {
    noImage.classList.remove("hideDiv");
    imageViewerDiv.classList.remove("hideDiv");

    if(count == 0) {
        imageViewerDiv.classList.add("hideDiv"); // 노 이미지 표시
    } else {
        noImage.classList.add("hideDiv"); // 이미지 뷰어 표시

        setCarousel(count, path);
    }
}

function setCarousel(count, path) {
    removeAllChild(viewerIndex);
    removeAllChild(viewerItem);

    for(var i = 0; i < count; i++) {
        let itemDiv = document.createElement('div');
        let indexBtn = '';

        itemDiv.classList.add('carousel-item');
        itemDiv.classList.add('h-100');
        if(i == 0) {
            itemDiv.classList.add('active');
            indexBtn = '<button type="button" data-bs-target="#carouselImageViewer" data-bs-slide-to="' + i + '" class="active" aria-current="true" aria-label="Slide ' + i + '"></button>'
        } else {
            indexBtn = '<button type="button" data-bs-target="#carouselImageViewer" data-bs-slide-to="' + i + '" aria-label="Slide ' + i + '"></button>'
        }

        let image = '<img src="' + path[i] + '" class="d-block w-100" alt="..." width="100%" height="100%">';

        viewerIndex.innerHTML += indexBtn;
        itemDiv.innerHTML = image;

        viewerItem.appendChild(itemDiv);
    }
}

function removeAllChild(div) {
    while ( div.hasChildNodes() ) {
        div.removeChild( div.firstChild );
    }
}

