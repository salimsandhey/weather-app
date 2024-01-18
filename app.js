let input=document.querySelector('.input');
let addBtn=document.querySelector('.add');
let locationHeading=document.querySelector('.location')
let searchBtn=document.querySelector('.search');
let dim=document.querySelectorAll('.dim');
let menuBtn=document.querySelector('.menu');
let closeBtn=document.querySelector('.close');
let city=document.querySelector('.city');
let temp=document.querySelector('.temp');
let desc=document.querySelector('.desc');
let visibility=document.querySelector('.visibility');
let humidity=document.querySelector('.humidity');
let windSpeed=document.querySelector('.wind-speed');
let img=document.querySelector('img');

let cityInput;
let weatherData;
date();

addBtn.addEventListener('click',function(){
    locationHeading.style.display="none";
    input.style.display="flex";
    addBtn.style.display="none"
    searchBtn.style.display="block";
    menuBtn.style.display="none";
    closeBtn.style.display="block";
    
    dim.forEach(function(element){
        element.style.opacity="70%";
    })
})

closeBtn.addEventListener('click',function(){
    close();
})
searchBtn.addEventListener('click',async function(){
    cityInput=input.value;
    city.innerText=cityInput.charAt(0).toUpperCase()+cityInput.slice(1);
    apiCall();
    close();
})

//close search bar
function close(){
    locationHeading.style.display="flex";
    input.style.display="none";
    addBtn.style.display="block"
    searchBtn.style.display="none";
    menuBtn.style.display="block";
    closeBtn.style.display="none";
    dim.forEach(function(element){
        element.style.opacity="100%";
    })
}

async function apiCall(){
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=515982719a79392aa91e952aed66ef53&units=metric`;
    weatherData=await axios.get(url);
    let tempData=Math.floor(weatherData.data.main.temp);
    temp.innerText=`${tempData}°`;
    let descData=weatherData.data.weather[0].main;
    desc.innerText=descData;
    let visibilityData=weatherData.data.visibility;
    let vDP=persentage(visibilityData);
    visibility.innerText=`${vDP}%`;
    let humidityData=weatherData.data.main.humidity;
    humidity.innerText=`${humidityData}%`;
    let windData=weatherData.data.wind.speed;
    windSpeed.innerText=`${windData}Km/H`;
    weatherImg(descData);
}

function persentage(value){
    let ans=value*100/10000;
    return ans;
}

function date(){
    let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    let date=new Date();
    let currDate=(date.getDate());
    let currDay=dayNames[(date.getDay())];
    let currMonth=monthNames[(date.getMonth())];
    let currHour=(date.getHours());
    let currMin=(date.getMinutes());
    let time=`${currHour}:${currMin}`;

    document.querySelector('.date').innerText=currDate;
    document.querySelector('.day').innerText=currDay;
    document.querySelector('.month').innerText=currMonth;
    document.querySelector('.time').innerText=time;
}

function weatherImg(main){
    switch(main){
        case "Thunderstorm":
            img.src="images/drizzle.png";
            break;
        case "Rain":
            img.src="images/rain.png";
            break;
        case "Snow":
            img.src="images/snow.png";
            break;
        case "Clear":
            img.src="images/clear.png";
            break;
        case "Clouds":
            img.src="images/clouds.png";
            break;
        default:
            img.src="images/mist.png";
    }
}