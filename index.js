const form = document.querySelector(".get-weather"),
    result = document.querySelector(".result"),
    nameCity = document.getElementById("city"),
    nameCountry = document.getElementById("country");



form.addEventListener("submit", e =>{
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        messageError ('ambos campos son obligatorio...');
        return;
    }

    callApi(nameCity.value, nameCountry.value);

    /*
    console.log(nameCountry.value);
    console.log(nameCity.value);
*/
});

function callApi(city, country) {
    const apiId = '62fedb78904cf88255109b71d5350244';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            
            if (dataJSON.cod === '404') {
                messageError('ciudad no encontrada...');
            }else{
                clear();
                correcto(dataJSON);
            }
        })
        .catch(messageError=>{
            console.log(messageError)
        })
}

function correcto(data) {
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degress = kelvinToCelsius(temp);
    const t_max = kelvinToCelsius(temp_max);
    const t_min = kelvinToCelsius(temp_min);


    const content = document.createElement('div');
    content.innerHTML= `
        <h2 class="city">Clima de ${name} </h2>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h3 class="climate">${degress}°C</h3>
        <h3 class="climate-max">Temp max: ${t_max}°C</h>
        <h3 class="climate-min">Temp min: ${t_min}°C</h3>
    `;
    content.classList.add('clima-date')
    result.appendChild(content);
}

function kelvinToCelsius(temp) {
    return parseInt(temp - 273.15);
}

function messageError(message) {
    console.log(message);
    const messageAlet = document.createElement('p');
    messageAlet.classList.add("message-alert");
    messageAlet.innerHTML = message;
    
    form.appendChild(messageAlet);

    setTimeout(() => {
        messageAlet.remove ();   
    }, 2000);
}
function clear (){
    result.innerHTML = '';
}

