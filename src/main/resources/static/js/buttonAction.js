const col = document.getElementById('colInfoAdd');
const addLayout = document.getElementById('addLayout');
const infoLayout = document.getElementById('infoLayout');
const closeBtn = document.getElementById('btnClose');
const editBtn = document.getElementById('btnEdit');
const deleteBtn = document.getElementById('btnDelete');

const addForm = document.getElementById("addForm");

//function addCsrfHeader(form) {
//    let csrfToken = document.querySelector("meta[name='_csrf']").content;
//    let csrfHeader = document.querySelector("meta[name='_csrf_header']").content;
//
//    form.append(csrfHeader, csrfToken);
//
//    return form;
//}

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
}

function clickListItem(id) {
        setVisible(col);
        setInvisible(addLayout);
        setVisible(infoLayout);

        setVisible(btnClose);
        setVisible(btnEdit);
        setVisible(btnDelete);

        console.log('Content ID : ' + id);
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
