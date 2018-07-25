const input = document.querySelector('input');
const city = document.querySelector('span.city');
const button = document.querySelector('button');
const key = '4fcc9024a7896dead9f89ab34d3991d5';
const icon5 = document.querySelectorAll('img.icon5');
const divDesc = document.querySelectorAll('.desc5');
const divTemp = document.querySelectorAll('.temp5');
const divPressure = document.querySelectorAll('.pressure5');
const divHumidity = document.querySelectorAll('.humidity5');
const divWind = document.querySelectorAll('.wind5');
const days = document.querySelectorAll('.day');

function nn(words) {
    return words.replace(/ą/g, 'a').replace(/Ą/g, 'a')
        .replace(/ć/g, 'c').replace(/Ć/g, 'c')
        .replace(/ę/g, 'e').replace(/Ę/g, 'e')
        .replace(/ł/g, 'l').replace(/Ł/g, 'l')
        .replace(/ń/g, 'n').replace(/Ń/g, 'n')
        .replace(/ó/g, 'o').replace(/Ó/g, 'o')
        .replace(/ś/g, 's').replace(/Ś/g, 's')
        .replace(/ż/g, 'z').replace(/Ż/g, 'z')
        .replace(/ź/g, 'z').replace(/Ź/g, 'z');
};


input.addEventListener('keypress', function (e) {
    if (13 == e.keyCode) {
        city.textContent = 'Pogoda dla miasta: ' + input.value.charAt(0).toUpperCase() + input.value.slice(1);
        $.ajax({
            url: 'api.php',
            data: {
                address: 'http://api.openweathermap.org/data/2.5/weather?q=' + nn(input.value) + '&lang=pl&units=metric&appid=' + key
            },
            success: function (res) {

                console.log(res);
                res = JSON.parse(res);

                if (res.error) {
                    alert('Bad city');
                    return false;
                }

                $('div.desc').text(res.weather[0].description);
                $('div.temp').text('Temperatura: ' + Math.round(res.main.temp) + ' C');
                $('div.humidity').text('Wilgotność: ' + res.main.humidity + ' %');
                $('div.pressure').text('Ciśnienie:  '+ res.main.pressure + ' hPa');
                $('div.wind').text('Wiatr: ' + Math.round((res.wind.speed) * (3600 / 1000)) + ' km/h');
                $('img.currentIcon').attr('src', 'http://openweathermap.org/img/w/' + res.weather[0].icon + '.png');
            },
            error: function (err) {
                console.log(err);
            },
        });

        button.classList.remove('hidden');

    }

})


$("button").click(function () {

    const el = $('button');
    el.text(el.text() == 'Sprawdź prognozę na 5 dni' ? 'Schowaj' : 'Sprawdź prognozę na 5 dni');


    $('section').toggleClass('hidden');
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".container5").offset().top
    }, 800);

    $.ajax({
        url: 'api.php',
        data: {
            address: 'http://api.openweathermap.org/data/2.5/forecast?q=' + nn(input.value) + '&lang=pl&units=metric&appid=' + key
        },
        success: function (response) {
            
            response = JSON.parse(response);


            for (let i = 0; i < 5; i++) {
                let k = (i * 9) - i + 1;

                console.log(response);
                console.log(k);
                days[i].textContent = response.list[k].dt_txt.slice(8, 10) + '-' + response.list[k].dt_txt.slice(5, 7) + '-' + response.list[k].dt_txt.slice(0, 4);


                divDesc[i].textContent = response.list[k].weather[0].description;
                icon5[i].setAttribute('src', 'http://openweathermap.org/img/w/' + response.list[k].weather[0].icon + '.png');
                divTemp[i].textContent = Math.round(response.list[k].main.temp) + ' °C';
                divPressure[i].textContent = 'Ciśnienie: ' + Math.round(response.list[k].main.pressure) + ' hPa';
                divHumidity[i].textContent = 'Wilgotność: ' + response.list[k].main.humidity + ' %';
                divWind[i].textContent = 'Wiatr: ' + Math.round((response.list[k].wind.speed) * (3600 / 1000)) + ' km/h';


            }

        },
        error: function (err) {
            console.log(err);
        },
    });



});
