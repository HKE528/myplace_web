defineEPSG();

function getOSM() {
    let OSM = new ol.source.OSM();

    return OSM;
}

function getVWorld(type) {
    let url;

    if (type == '2d') {
        url = 'http://api.vworld.kr/req/wmts/1.0.0/5F043B4C-BC18-31D0-B652-0151881CD4C3/Base/{z}/{y}/{x}.png'
    } else {
        url = 'http://api.vworld.kr/req/wmts/1.0.0/5F043B4C-BC18-31D0-B652-0151881CD4C3/Satellite/{z}/{y}/{x}.jpeg'
    }

    let vworld = new ol.source.XYZ({
        url: url,
    })

    return vworld;
}

function getNaver(type) {
    let url;

    if (type == '2d') {
        url = "https://map.pstatic.net/nrb/styles/basic/1626941278/{z}/{x}/{y}.png?mt=bg.ol.ts.lko";
    } else {
        url = "https://map.pstatic.net/nrb/styles/satellite/1626941278/{z}/{x}/{y}.png?mt=bg.ol.ts.lko";
    }

    let naver = new ol.source.XYZ({
        url: url,
    })

    return naver;
}

function getKakao(type) {
    let daumResolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
    let url;

    if (type == '2d') {
        url = "https://map{0-3}.daumcdn.net/map_2d/2106wof/L{z}/{y}/{x}.png";
    } else {
        url = 'https://map{0-3}.daumcdn.net/map_skyview/L{z}/{y}/{x}.jpg' //?v=160114'
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

            return url.replace('{0-3}', s)
                .replace('{z}', level.toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1).toString());
        },
    })

    return kakaoMap;
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