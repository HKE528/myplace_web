const closeBtn2 = document.getElementById('btnClose');
const btnAdd2 = document.getElementById('btnAdd');
const btnEdit2 = document.getElementById('btnEdit');

const defaultPin = document.getElementById('defaultPin');
const cafePin = document.getElementById('cafePin');
const conveniencePin = document.getElementById('conveniencePin');
const martPin = document.getElementById('martPin');
const otherPin = document.getElementById('otherPin');
const restaurantPin = document.getElementById('restaurantPin');
const shopPin = document.getElementById('shopPin');

const clickPosition = document.getElementById('mouse-position');
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');

const clickMarkerId = 1;

const tile = new ol.layer.Tile({ source: new ol.source.OSM() })
//markerSource = new ol.source.Vector({ wrapX: true });
//const vector =  new ol.layer.Vector({ source: markerSource });

const map = new ol.Map({
    target: 'map',
    layers: [tile],
    view: new ol.View({
        center: ol.proj.fromLonLat([127.72800919741388, 37.878953230304404]),
        zoom: 15
    })
});

const clickMarker = new ol.Overlay({
    id: clickMarkerId,
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

overlayRefresh();

//마커 오버레이 닫기
closeBtn2.onclick = function() {
    removeMarkerEvent();
    overlayRefresh();

    return false;
}

btnAdd2.onclick = function() {
    map.addEventListener('singleclick', markerOverlay);
    return false;
}

btnEdit2.onclick = function() {
    map.addEventListener('singleclick', markerOverlay);
    return false;
}

function setCenterView(lonlatString) {
    let lonlat = lonlatString.split(',');
    let coord = ol.proj.fromLonLat([lonlat[0]*1, lonlat[1]*1]);

    let view = map.getView();

    view.setCenter(coord);
    view.setZoom(18);
}

function removeMarkerEvent() {
    clickMarker.setPosition(undefined);
    map.removeEventListener('singleclick', markerOverlay);
}

function overlayRefresh() {
    map.getOverlays().clear();
    map.addOverlay(clickMarker);

    makeListMarker();
}

function makeListMarker() {
    list = document.querySelectorAll('.markerListInfo');

    list.forEach(it => {
        let address = (it.children)[0].value;
        let lonlat = ((it.children)[1].value).split(',');
        let category = (it.children)[2].value;
        let id = (it.children)[3].value;

        let coord = ol.proj.fromLonLat([lonlat[0]*1, lonlat[1]*1]);

        let container = document.createElement('div');
        container.classList.add('ol-marker-pop');

        let content = document.createElement('div');

        let clicker = document.createElement('a');
        let link = "javascript:makerClickEvent(" + id + ");";
        clicker.setAttribute("href", link);

        clicker.innerHTML = getImage(category);

        content.appendChild(clicker);

        container.appendChild(content);

        let placeMarker = new ol.Overlay({
            id: id,
            element: container,
            position: coord
        });

        map.addOverlay(placeMarker);
    })
}

function makerClickEvent(id) {
    console.log(id);
    clickListItem(id);
}

function getImage(category) {
    let src = "";

        if(category == '카페')        src = cafePin.innerHTML;
        else if(category == '음식점') src = restaurantPin.innerHTML;
        else if(category == '편의점') src = conveniencePin.innerHTML;
        else if(category == '마트')   src = martPin.innerHTML;
        else if(category == '쇼핑')   src = shopPin.innerHTML;
        else                         src = otherPin.innerHTML;

    return src;
}

function markerOverlay(evt) {
    const coordinate = evt.coordinate;
    const lonLat = ol.proj.toLonLat(coordinate);

    let address = document.getElementById('address');
    let lonlet = document.getElementById('lonlat');

    let url = '/geocode/address?point=' + lonLat

    fetch(url)
        .then(res => res.text() )
        .then(res => {
            content.innerHTML = defaultPin.innerHTML;
            clickMarker.setPosition(coordinate);

            address.value = res;
            lonlet.value = lonLat;
    });
}


