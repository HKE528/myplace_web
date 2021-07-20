const closeBtn2 = document.getElementById('btnClose');

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
const marker = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

//마커 오버레이 닫기
closeBtn2.onclick = function() {
    marker.setPosition(undefined);
    return false;
};

map.addOverlay(marker);

//클릭시 오버레이 표시
map.on('singleclick', function(evt) {
    const coordinate = evt.coordinate;
    const lonLat = ol.proj.toLonLat(coordinate);

    let url = '/geocode/address?point=' + lonLat

    fetch(url)
        .then(res => res.text() )
        .then(res => {
            console.log(res);
            content.innerHTML = defaultPin.innerHTML;
//            content.innerHTML = '<p>You clicked here:</p><code>' + res + '</code>';

            marker.setPosition(coordinate);
    });
});

function markerOverlay(evt) {
    const coordinate = evt.coordinate;
        const lonLat = ol.proj.toLonLat(coordinate);

        let url = '/geocode/address?point=' + lonLat

        fetch(url)
            .then(res => res.text() )
            .then(res => {
                clickPosition.innerHTML = '<p>You clicked here:</p><code>' + lonLat + '</code>';
                content.innerHTML = '<p>You clicked here:</p><code>' + res + '</code>';
                overlay.setPosition(coordinate);
        });
}

