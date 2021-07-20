const closeBtn2 = document.getElementById('btnClose');
const btnAdd2 = document.getElementById('btnAdd');
const addSubmitBtn = document.getElementById('addSubmitBtn');

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

const clickMarker = new ol.Overlay({
    id: clickMarkerId,
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

showListMarker();

//마커 오버레이 닫기
closeBtn2.onclick = function() { removeMarkerEvent(); }

btnAdd2.onclick = function() {
    map.addEventListener('singleclick', markerOverlay);
    return false;
}

function removeMarkerEvent() {
        clickMarker.setPosition(undefined);
        map.removeEventListener('singleclick', markerOverlay);

        showListMarker();

        return false;
}

function overlayRefresh() {
    map.getOverlays().clear();
    map.addOverlay(clickMarker);
}

function showListMarker() {
    overlayRefresh();

    list = document.querySelectorAll('.markerListInfo');

    list.forEach(it => {
        let address = (it.children)[0].value;
        let lonlat = ((it.children)[1].value).split(',');
        let category = (it.children)[2].value;

        let coord = ol.proj.fromLonLat([lonlat[0]*1, lonlat[1]*1]);

        let container = document.createElement('div');
        container.classList.add('ol-marker-pop');

        let content = document.createElement('div');

        if(category == '카페')        content.innerHTML = cafePin.innerHTML;
        else if(category == '음식점') content.innerHTML = restaurantPin.innerHTML;
        else if(category == '편의점') content.innerHTML = conveniencePin.innerHTML;
        else if(category == '마트')   content.innerHTML = martPin.innerHTML;
        else if(category == '쇼핑')   content.innerHTML = shopPin.innerHTML;
        else                         content.innerHTML = otherPin.innerHTML;

        container.appendChild(content);

        let placeMarker = new ol.Overlay({
            element: container,
            position: coord
        });

        map.addOverlay(placeMarker);
    })
}

function makeClickMarker() {
    //마커 오버레이 생성

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


