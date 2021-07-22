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
    let formData = new FormData(addForm);
    let lonlat = formData.get('lonlat')

//    for (var pair of formData.entries()) { console.log(pair[0]+ ', ' + pair[1]); }

    await fetch('/api/place/add', {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            "X-CSRF-Token": csrfToken,
        },
        body: formData
    }).then(res => {
        if (res.ok) {
            refreshList();
            refreshRating();

            addForm.reset();

            clickClose();

            setCenterView(lonlat);
        } else {
            //로그인 화면으로!
            alert("지도에 위치를 나타내 주세요")
        }
    });

    setTimeout(function(){
        removeMarkerEvent();
        overlayRefresh();
    }, 150);
}

function clickAdd() {
    clickClose();

    placeLayoutTitle.innerText = "장소 추가";
    addForm.reset();

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

    refreshRating();

    curId = -1;
}

const placeInfoName = document.getElementById('placeInfoName');
const placeInfoCategory = document.getElementById('placeInfoCategory');
const placeInfoRating = document.getElementById('placeInfoRating');
const placeInfoAddress = document.getElementById('placeInfoAddress');
const placeInfoPhone = document.getElementById('placeInfoPhone');
const placeInfoComment = document.getElementById('placeInfoComment');

const placeLayoutTitle = document.getElementById('title');

async function clickListItem(id) {
    curId = id;

    setVisible(col);
    setInvisible(addLayout);
    setVisible(infoLayout);

    setVisible(btnClose);
    setVisible(btnEdit);
    setVisible(btnDelete);

    await fetch('/api/place/view/' + id)
        .then(res => res.json())
        .then(data => {
            setImageView(data.imageCount ,data.imagePath)

            placeInfoName.innerText = data.name;
            placeInfoCategory.innerText = data.category;
            placeInfoAddress.innerText = data.address;
            placeInfoPhone.innerText = data.phone;
            placeInfoComment.innerText = data.comment

            showRating(data.rating);

            setCenterView(data.lonlat);

            overlayHighlight(id);
        });
}

async function clickDelete() {
    let csrfToken = document.querySelector("meta[name='_csrf']").content;

    let resp = confirm("정말로 삭제할까요?");

    if (resp && curId != -1) {
        await fetch('/api/place/delete/' + curId, {
                method: 'delete',
                credentials: 'same-origin',
                headers: { "X-CSRF-Token": csrfToken }
            })
            .then(res => {
                if (res.ok) {
                    refreshList();
                    clickClose();
                } else {
                    alert("..")
                }
            });

            setTimeout(function(){
                removeMarkerEvent();
                overlayRefresh();
            }, 150);
    }
}

//addForm
async function clickUpdate() {
    placeLayoutTitle.innerText = "장소 수정";

    setVisible(col);
    setInvisible(infoLayout);
    setVisible(addLayout);
    setVisible(closeBtn);

    document.getElementById('id').value = curId;
    document.getElementById('name').value = placeInfoName.innerText;
    setCategorySelect(placeInfoCategory.innerText);
    document.getElementById('address').value = placeInfoAddress.innerText;
    document.getElementById('phone').value = placeInfoPhone.innerText;
    document.getElementById('comment').value = placeInfoComment.innerText;
}

function setCategorySelect(selValue) {
    let selBox = document.getElementById('categorySelect')
    let size = selBox.length;

    for(i = 0; i < size; i++) {
        if(selBox.options[i].value == selValue){
            selBox.options[i].selected = true;
            break;
        }
    }
}

function refreshList() {
    $("#placeListDiv").load(location.href + ' #placeListDiv');
    curId = -1;
}

function setVisible(div) {
    if (div.style.display === 'none') {
        div.style.display = 'block';
    }
}

function setInvisible(div) {
    if (div.style.display === 'block') {
        div.style.display = 'none';
    }
}