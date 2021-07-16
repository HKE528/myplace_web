const col = document.getElementById('colInfoAdd');
const addLayout = document.getElementById('addLayout');
const infoLayout = document.getElementById('infoLayout');

function clickAdd() {
    setVisible(col);
    setInvisible(infoLayout);
    setVisible(addLayout);
}

function clickClose() {
    setInvisible(col)
}

function clickListItem() {
        setVisible(col);
        setInvisible(addLayout);
        setVisible(infoLayout);
}

function setVisible(div){
    if(div.style.display === 'none')  {
        div.style.display = 'block';
    }
}

function setInvisible(div) {
    if(div.style.display === 'block')  {
            div.style.display = 'none';
    }
}