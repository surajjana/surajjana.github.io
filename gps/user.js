$(document).ready(function(){

/*setTimeout(function(){*/


var map
  , you
  , pos
  , t_0
  , log = ''
  , url1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sBHxAxMpOb3XcAAAOBSURBVDjLfZRNa1xlGIav877nY2bOzJnMR77TNIkJpSpBW4qiGGJAECpSEFz0D/gDKrp9wVVBXPkLXLkrqBtBZKJFQaqghbZp09SkTUwyH5mvMzPnvHPOcZEUumj6wL17nmvz3PdtcMoopQRg27btdpYvXQSS7N9/3NZaB0BHKTV83p3xHJAFzFQWVj4bdPjonGsXisIwm35Iy2C40dON0VHrxurD9evAvlKqfypQKeW15l9d/enI+9qr+2fWXplmcbpA0UtT6wx48OSIu4/r3Nqqkjs3tvN+/uiat31vHagppRIA8xnYBPnShRub1reiUU0vX5gnPTlKfjzPzEiKIBPg4GDFNrlmwJ2bW7O981PfXM1mP7b73T+B/wDECSwTRdHi9/L8V9t399Le3BSMT0B+BDIukWkTp1ySfIF4bJzk7ByMlfn3zl76x/RrXwohlpRSRQCplDKAs9uzF6/+/Oveh1GpyOjSAsWJUUbyOTK2hU4EDS05HNocxDYHkaQRG9Dr03hULU8vz9e9o92ttbW1ugA8YGrTz7wT6JhkbJJBdoSelaMTSGoD2O1DLYB2CD1t03dKUJyAyUmCgWbTz6w4jlMA0ibgSim9Wms4S2EEcnk6Ikd7KKkDMoaUgC5QF9CS0MWEdB68IhQK1FrRDIICkDUBUwhh+M3Aw3XBcakmKUoGuAZEBlgG9CVUTWiY0JaAnYFUBtwsfifwyJMAlglorXXsOk6bSGbBJLIk94cwAM5YYNvQT6CewKEFiQNoEwwbTBs3JduABnwT8E3T9MuOfLzRjaeIYpAJ2jJ4aMC2AVb62FrBEGILsAGRQJxAklB2zZ1EJwOgJ4DOcDjcfSnT+8XRIQwGEA6ODWXAUELfPlZsnkRBAFpDEOBEmsW0fzMMwyqgZaVSYXV1NSyFh61mbumtvX5SJpuBnAupp04FQqAHBIAP1Jqwf8DreePepc5v16WU95VSwdN1P47jB5ed29fmDO1TrUOtDZ0TSPNEPU7e3YVagzmh/feSW58KITaUUl0ACVCpVKhUKv67b7+xP1/K/NXxs282+kEhiQEtIBTQS+BIw2ELeVDl5V536wNv+xPXf/K7Uqr+oraxgdF19/Lnjyz3is6mygeYaQwYJ+5b3aC2EHa+W/F/+AJoKKX0C+vrGbABpCzLyvqzK8uJIaPcTuWfMAw10D+tD/8H7d6IDx2EfHUAAAAASUVORK5CYII='
  , head = '["latitude","longitude","precision","time"]'
  , zoom = 12
  , time
  , from
  ;

var url = ''

google.maps.event.addDomListener(window, 'load', init);

function init() {
  map = new google.maps.Map( document.getElementById('map')
                           , { zoom: zoom
                             , mapTypeId: google.maps.MapTypeId.ROADMAP
                             });

  gotPosition();

}

function gotPosition() {
  
    /*console.log(body)*/
    /*while(1){*/
    /*url = 'img/'*/

    $.get('https://fleet-py-server.herokuapp.com/get', function(err, res, body){
        var data = JSON.parse(body.responseText)

        console.log(data.res.lat + ' , ' + data.res.lng + ' , ' + data.res.time_stamp)
        console.log('Acc X : ' + data.res.acc_x + ' , Acc Y : ' + data.res.acc_y)

        pos = ll(data.res.lat, data.res.lng);

        /*url = url + data.status*/

        console.log('Dot Color : ' + data.status)

        if (you) you.setPosition(pos); else {
          t_0 = Math.round(+new Date / 1000);
          you = new google.maps.Marker({ map: map
                                       , position: pos
                                       , icon: marker(data.status, s(20, 17), p(10, 8))
                                       });
          google.maps.event.addListener(you, 'click', function() {
            location = 'mailto:?subject=GPS%20Track&body='
                     + encodeURIComponent(log + ' ]\n}\n');
          });
        }
        if (!zoom) map.setCenter(pos);

        map.panTo(pos);

    })

    setTimeout(gotPosition, 500)
  /*}*/
      

}

function noGeolocation(message) {
  var opts = { map: map
             , position: ll(60, 105)
             , content: message
             }
    , info = new google.maps.InfoWindow(opts);
  map.setCenter(opts.position);
}

function s(w, h) { return new google.maps.Size(w, h); }
function p(x, y) { return new google.maps.Point(x, y); }
function ll(y, x) { return new google.maps.LatLng(y, x); }
function marker(url, size, hotspot, origin) {
  return new google.maps.MarkerImage(url, size, origin || p(0, 0), hotspot);
}

})



/*})*/