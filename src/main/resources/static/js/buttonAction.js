const col = document.getElementById('colInfoAdd');
const addLayout = document.getElementById('addLayout');
const infoLayout = document.getElementById('infoLayout');
const closeBtn = document.getElementById('btnClose');
const editBtn = document.getElementById('btnEdit');
const deleteBtn = document.getElementById('btnDelete');

const addForm = document.getElementById("addForm");

addForm.addEventListener('submit', clickClose())

function clickAdd() {
    setVisible(col);
    setInvisible(infoLayout);
    setVisible(addLayout);
    setVisible(closeBtn);

    console.log("clockAdd()")
}

function clickClose() {
    setInvisible(col)
    setInvisible(infoLayout);
    setInvisible(addLayout);
    setInvisible(closeBtn);
    setInvisible(editBtn);
    setInvisible(deleteBtn);
}

function clickListItem() {
        setVisible(col);
        setInvisible(addLayout);
        setVisible(infoLayout);

        setVisible(btnClose);
        setVisible(btnEdit);
        setVisible(btnDelete);
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
