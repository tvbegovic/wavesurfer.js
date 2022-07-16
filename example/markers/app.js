'use strict';

// Create an instance
var wavesurfer; // eslint-disable-line no-var
var markers = { eom: 21.773, cout: 21.773 };
var arrMarkers = [
    {
        id: 'cuein',
        time: 0,
        label: 'cue in',
        position: 'top',
        draggable: false
    },
    {
        id: 'intro',
        time: 0,
        label: 'intro',
        position: 'bottom',
        draggable : true
    },
    {
        id: 'eom',
        time: 21.773875,
        label: 'cue out',
        color: '#00ffcc',
        position: 'bottom',
        textPosition: 'left',
        draggable: true,
        upperLimit: 21.773785
    },
    {
        id: 'cout',
        time: 21.773875,
        label: "cue out",
        color: '#00ffcc',
        position: 'top',
        textPosition: 'left',
        draggable: true,
        upperLimit: 21.773785
    }
];

function onBtnclick(op, marker) {
    let value = markers[marker];
    if (op == '+') {
        value += 0.05;
    } else {
        value -= 0.05;
    }
    if (op == '+') {
        value = Math.min(wavesurfer.getDuration(), value);
    }

    markers[marker] = value;
    document.getElementById(marker).innerText = value.toFixed(3).toString();
    const markerOptions = arrMarkers.find(a => a.id == marker);
    if (markerOptions) {
        markerOptions.time = value;
        wavesurfer.markers.update(markerOptions);
    }
}

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init

    document.getElementById('eom').innerText = markers['eom'].toFixed(2).toString();
    document.getElementById('cout').innerText = markers['cout'].toFixed(2).toString();
    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        backend: 'MediaElement',
        plugins: [
            WaveSurfer.markers.create({})
        ]
    });

    for (const m of arrMarkers) {
        wavesurfer.markers.add(m);
    }

    /*var img = new Image(40, 40);
    img.src = "./settings_icon.png";
    img.onload = () => {
        wavesurfer.markers.add({
            time: 12,
            position: "bottom",
            markerElement: img,
            draggable: true
        });
    };*/

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
    setTimeout(() => console.log(wavesurfer.getDuration()), 2000);

});
