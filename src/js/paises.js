
const body = document.getElementsByTagName("body");
const buttonInput = document.getElementById("sendCountry");



function insertInfo(nativeNameCommon, independent, population, continent, currencyName, capital){
    document.getElementById('nome_pais_portugues').innerText = nativeNameCommon;
    document.getElementById('independente').innerText = independent; 
    document.getElementById('populacao').innerText = population;
    document.getElementById('continente').innerText = continent;
    document.getElementById('moeda').innerText = currencyName;
    document.getElementById('capital').innerText = capital;

}

function fetchCountryData(country){
    const url = `https://restcountries.com/v3.1/name/${country}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let nativeNameCommon;
        let isIndependent = data[0].independent ? "Sim" : "Não";
        let population = data[0].population.toLocaleString('pt-BR');
        let continent = data[0].continents;
        let currencyName;
        let capital = data[0].capital[0];
        for(const key in data[0].currencies){
            if(data[0]?.currencies[key]?.name){
                currencyName = data[0]?.currencies[key]?.name;
            }
        }
        for(const key in data[0]?.name?.nativeName){
            if(data[0]?.name?.nativeName[key]?.common){
                nativeNameCommon = data[0]?.name?.nativeName[key]?.common;
            }
        }
        insertInfo(nativeNameCommon, isIndependent, population, continent, currencyName, capital);
    })
}

buttonInput.onclick = function insertCountry(){
    const countryName = document.getElementById('inputCountry').value;
    fetchCountryData(countryName);
}


body[0].onload = fetchCountryData("brasil");
