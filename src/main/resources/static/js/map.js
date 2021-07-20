const closeBtn2 = document.getElementById('btnClose');
const btnAdd2 = document.getElementById('btnAdd');

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

const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([127.72800919741388, 37.878953230304404]),
        zoom: 15
    })
});

//마커 오버레이 생성
const clickMarker = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

map.addOverlay(clickMarker);



//마커 오버레이 닫기
closeBtn2.onclick = function() {
    clickMarker.setPosition(undefined);
    map.removeEventListener('singleclick', markerOverlay);
    return false;
};

btnAdd2.onclick = function() {
    //클릭시 마커 표시
    map.addEventListener('singleclick', markerOverlay);
    return false;
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

