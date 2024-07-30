// masukan api ke js
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// inisiasi & deklarasi variabel untuk komunikasi elemen dokumen dll
let search = document.querySelector('.searchBox');        //akses class searchBox || remember querySelector memilih selector css di dokuman. bisa dengan class(.), id(#), elemen (div)
let convert = document.querySelector('.convert');
let formCurrecy = document.querySelector('.from');
let toCurrecy = document.querySelector('.to');
let finalValue = document.querySelector('.finalValue');
let finalAmount = document.getElementById('finalAmount');
// deklarasi
let resultFrom;
let resultTo;
let searchValue;

//event listener saat currency berubah
formCurrecy.addEventListener('change', (event) => {             //buat event handler 'change' kemudian buat fungsi event
    resultFrom = `${event.target.value}`;           //bagian ini menginisiasi ketika event handler dari fromCurrecy berubah makan nilai akan disimpan
});

//event listener saat currency berubah 2
toCurrecy.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
});

search.addEventListener('input', updateValue);

//fungsi update value
function updateValue(e) {
    searchValue = e.target.value; 
}

//event listener untuk summon getResult
convert.addEventListener("click", getresult);

//fungsi getResult
function getResult() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(displayResult);
}

//fungsi display sesudah di konversi
function displayResult(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    finalValue.innerHTML = 
        ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}

//fungsi reset btn
function clearVal() {
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
}