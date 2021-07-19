const col = document.getElementById('colInfoAdd');
const addLayout = document.getElementById('addLayout');
const infoLayout = document.getElementById('infoLayout');
const closeBtn = document.getElementById('btnClose');
const editBtn = document.getElementById('btnEdit');
const deleteBtn = document.getElementById('btnDelete');

const addForm = document.getElementById("addForm");

var curId = -1;

async function clickAddSubmit() {
    let csrfToken = document.querySelector("meta[name='_csrf']").content;

    await fetch('/api/place/add', {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            "X-CSRF-Token": csrfToken
          },
        body: new URLSearchParams(new FormData(addForm))
        //body: new URLSearchParams(form)
    }) .then(res => {
            if(res.ok) {
                alert("추가 완료!")

                addForm.reset();

                clickClose();

            } else {
                //로그인 화면으로!
                alert("..")
            }
        });

    $("#placeListDiv").load(location.href + ' #placeListDiv');
}

function clickAdd() {
    setVisible(col);
    setInvisible(infoLayout);
    setVisible(addLayout);
    setVisible(closeBtn);
}

function clickClose() {
    setInvisible(col)
    setInvisible(infoLayout);
    setInvisible(addLayout);
    setInvisible(closeBtn);
    setInvisible(editBtn);
    setInvisible(deleteBtn);

    curId = -1;
}

const placeInfoName = document.getElementById('placeInfoName');
const placeInfoCategory = document.getElementById('placeInfoCategory');
const placeInfoRating = document.getElementById('placeInfoRating');
const placeInfoAddress = document.getElementById('placeInfoAddress');
const placeInfoPhone = document.getElementById('placeInfoPhone');
const placeInfoComment = document.getElementById('placeInfoComment');

function clickListItem(id) {
        curId = id;

        setVisible(col);
        setInvisible(addLayout);
        setVisible(infoLayout);

        setVisible(btnClose);
        setVisible(btnEdit);
        setVisible(btnDelete);

        fetch('/api/place/view/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                placeInfoName.innerText = data.name;
                placeInfoCategory.innerText = data.category;
                placeInfoAddress.innerText = data.address;
                placeInfoPhone.innerText = data.phone;
                placeInfoComment.innerText = data.comment
        });
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
