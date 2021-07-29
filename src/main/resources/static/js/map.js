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

const selector = document.getElementById('selMap');

const clickMarkerId = 1;

const tile = new ol.layer.Tile({
    source: new ol.source.OSM(),
});
// const OSM = new ol.source.OSM();

const mapView = new ol.View({
    center: ol.proj.fromLonLat([128.10112032089046, 36.647583843349935]),
    zoom: 6
})

const map = new ol.Map({
    target: 'map',
    layers: [tile],
    view: mapView
});

function selectMap() {
    // let extent = [13560872, 3834396, 14783864, 4812790];
    let select = selector.options[selector.selectedIndex].value
    let source;

    // console.log("before extent : " + mapView.get('extent'))

    switch (select) {
        case 'osm':
            source = getOSM();
            mapView.setMinZoom(1);
            break;

        case 'v2':
            source = getVWorld('2d');
            mapView.setMinZoom(6);
            // mapView.set('extent', extent)
            break;

        case 'vs':
            source = getVWorld('s');
            mapView.setMinZoom(6);
            break;

        case 'k2':
            source = getKakao('2d');
            mapView.setMinZoom(6);
            break;

        case 'ks':
            source = getKakao('s');
            mapView.setMinZoom(6);
            break;

        case 'n2':
            source = getNaver('2d');
            mapView.setMinZoom(6);
            break;

        case 'ns':
            source = getNaver('s');
            mapView.setMinZoom(6);
            break;
    }

    // console.log("after extent : " + mapView.get('extent'))

    tile.setSource(source);
}

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
    let coord = ol.proj.fromLonLat([lonlat[0] * 1 + 0.001, lonlat[1] * 1]);

    let view = map.getView();

    view.animate({
        center: coord,
        duration: 200,
        zoom: 18
    });

    //    view.setCenter(coord);
    //    view.setZoom(18);
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

        let coord = ol.proj.fromLonLat([lonlat[0] * 1, lonlat[1] * 1]);

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
    clickListItem(id);
}

function getImage(category) {
    let src = "";

    if (category == '카페') src = cafePin.innerHTML;
    else if (category == '음식점') src = restaurantPin.innerHTML;
    else if (category == '편의점') src = conveniencePin.innerHTML;
    else if (category == '마트') src = martPin.innerHTML;
    else if (category == '쇼핑') src = shopPin.innerHTML;
    else src = otherPin.innerHTML;

    return src;
}

function markerOverlay(evt) {
    const coordinate = evt.coordinate;
    const lonLat = ol.proj.toLonLat(coordinate);

    let address = document.getElementById('address');
    let lonlet = document.getElementById('lonlat');

    let url = '/geocode/address?point=' + lonLat

    fetch(url)
        .then(res => res.text())
        .then(res => {
            content.innerHTML = defaultPin.innerHTML;
            clickMarker.setPosition(coordinate);

            address.value = res;
            lonlet.value = lonLat;
        });
}

function overlayHighlight(id) {
    removeOverlayHighlight()

    getOverlayInfo(id);
}

function removeOverlayHighlight() {
    let allOverlay = map.getOverlays();

    allOverlay.forEach(it => {
        it.getElement().classList.remove('ol-marker-highlight');
    });
}

function getOverlayInfo(id) {
    let marker = map.getOverlayById(id);
    let markerContent = marker.getElement();
    markerContent.classList.add('ol-marker-highlight');
}