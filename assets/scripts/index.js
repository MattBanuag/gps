'use strict';

// MARKER, OPTIONS, MAP
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGJhbnVhZyIsImEiOiJjbGJncnE5bXUwNHVsM3Budzg5NXluNzJjIn0.HXWxK3IT6MmGfuZb1_sSbw';
const overlay = document.querySelector('.overlay');
const loading = document.querySelector('.loading');
const marker = new mapboxgl.Marker({
    color: '#3898FF'
});
const options = { 
    enableHighAccuracy: true,
    maximumAge: 0
};
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 15, // starting zoom
    pitch: 40 // incline
});

// FUNCTIONS
function mapSettings() {
    map.dragPan.disable();
    map.keyboard.disable();
    map.scrollZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
}

function getLocation(position) {
    const { longitude, latitude } = position.coords;

    map.setCenter([longitude, latitude]);
    marker.setLngLat([longitude, latitude]).addTo(map);
    overlay.classList.add('hidden');
}

function errorHandler(error) {
    loading.style.animationPlayState = 'paused';
    console.log(error.message);
}

function validate() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    } else {
        console.log('Geolocation is not supported by your browser');
    }
}

validate();


