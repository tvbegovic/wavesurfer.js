'use strict';

// Create an instance
var wavesurfer; // eslint-disable-line no-var

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init

    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        backend: 'MediaElement',
        plugins: [
            WaveSurfer.markers.create({})
        ]
    });

    const markers = [
        {
            time: 0,
            label: "BEGIN",
            color: '#ff990a'
        },
        {
            id: 'second',
            time: 10,
            label: "V1",
            color: '#ff990a',
            draggable: true,
            position: 'top',
            lowerLimit: 3
        },

        {
            id: 'third',
            time: 10,
            label: "END",
            color: '#00ffcc',
            position: 'bottom',
            textPosition: 'left',
            draggable: true
        }
    ];
    for (const m of markers) {
        wavesurfer.markers.add(m);
    }

    var img = new Image(40, 40);
    img.src = "./settings_icon.png";
    img.onload = () => {
        wavesurfer.markers.add({
            time: 12,
            position: "bottom",
            markerElement: img,
            draggable: true
        });
    };

    /*const newMarker = Object.assign({}, markers[1]);
    newMarker.time = 7;
    setTimeout(() => {
        wavesurfer.markers.update(newMarker, 1);
        newMarker.time = 8;
        setTimeout(() => wavesurfer.markers.update(newMarker), 3000);
    }, 3000);*/

    wavesurfer.on('error', function(e) {
        console.warn(e);
    });

    wavesurfer.on('marker-drag', function(marker) {
        console.log("marker drag", marker.label, marker.time);
    });

    wavesurfer.on('marker-drop', function(marker) {
        console.log("marker drop", marker.label);
    });

    // Load audio from URL
    wavesurfer.load('../media/demo.wav');
});
