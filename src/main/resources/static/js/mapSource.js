defineEPSG();

function getOSM() {
    let OSM = new ol.source.OSM();
    let layer = new ol.source.XYZ();

    return [OSM, layer];
}

function getVWorld(type) {
    let mapUrl;
    let layerUrl = '';

    if (type == '2d') {
        mapUrl = 'http://api.vworld.kr/req/wmts/1.0.0/5F043B4C-BC18-31D0-B652-0151881CD4C3/Base/{z}/{y}/{x}.png'
    } else {
        mapUrl = 'http://api.vworld.kr/req/wmts/1.0.0/5F043B4C-BC18-31D0-B652-0151881CD4C3/Satellite/{z}/{y}/{x}.jpeg'
        layerUrl = 'http://api.vworld.kr/req/wmts/1.0.0/5F043B4C-BC18-31D0-B652-0151881CD4C3/Hybrid/{z}/{y}/{x}.png';
    }

    let map = new ol.source.XYZ({
        url: mapUrl,
    })

    let layer = new ol.source.XYZ({
        url: layerUrl,
    })

    return [map, layer];
}

function getNaver(type) {
    let mapUrl;

    if (type == '2d') {
        mapUrl = "https://map.pstatic.net/nrb/styles/basic/1626941278/{z}/{x}/{y}.png?mt=bg.ol.ts.lko";
    } else {
        mapUrl = "https://map.pstatic.net/nrb/styles/satellite/1626941278/{z}/{x}/{y}.png?mt=bg.ol.ts.lko";
    }

    let naver = new ol.source.XYZ({
        url: mapUrl,
    });

    let layer = new ol.source.XYZ();

    return [naver, layer];
}

function getKakao(type) {
    let daumResolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];

    let mapUrl;
    let layerUrl = '';

    if (type == '2d') {
        mapUrl = "https://map{0-3}.daumcdn.net/map_2d/2106wof/L{z}/{y}/{x}.png";
    } else {
        mapUrl = 'https://map{0-3}.daumcdn.net/map_skyview/L{z}/{y}/{x}.jpg?v=160114';
        layerUrl = 'https://map{0-3}.daumcdn.net/map_hybrid/2106wof/L{z}/{y}/{x}.png';
    }

    let kakaoMap = new ol.source.XYZ({
        projection: 'EPSG:5181',
        tileSize: 256,

        tileGrid: new ol.tilegrid.TileGrid({
            origin: [-30000, -60000],
            resolutions: daumResolutions,
        }),

        tileUrlFunction: function(tileCoord) {
            let s = Math.floor(Math.random() * 4); // 0 ~ 3

            let level = daumResolutions.length - tileCoord[0];

            return mapUrl.replace('{0-3}', s)
                .replace('{z}', level.toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1).toString());
        },
    })

    let layer = new ol.source.XYZ({
        projection: 'EPSG:5181',
        tileSize: 256,

        tileGrid: new ol.tilegrid.TileGrid({
            origin: [-30000, -60000],
            resolutions: daumResolutions,
        }),

        tileUrlFunction: function(tileCoord) {
            let s = Math.floor(Math.random() * 4); // 0 ~ 3

            let level = daumResolutions.length - tileCoord[0];

            return layerUrl.replace('{0-3}', s)
                .replace('{z}', level.toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1).toString());
        },
    })

    return [kakaoMap, layer];
}

function defineEPSG() {
    proj4.defs(
        "EPSG:5179",
        "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
    );

    proj4.defs(
        "EPSG:5181",
        "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"
    );

    ol.proj.proj4.register(proj4);
}