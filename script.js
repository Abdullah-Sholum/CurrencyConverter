// masukan api ke js
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// inisiasi & deklarasi variabel untuk komunikasi elemen dokumen dll
let search = document.querySelector('.searchBox');        //akses class searchBox || remember querySelector memilih selector css di dokuman. bisa dengan class(.), id(#), elemen (div)
let convert = document.querySelector(".convert");
let fromCurrecy = document.querySelector(".from");
let toCurrecy = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let finalAmount = document.getElementById("finalAmount");
// deklarasi
let resultFrom;
let resultTo;
let searchValue;

//event listener saat currency berubah
fromCurrecy.addEventListener('change', (event) => {             //buat event handler 'change' untuk dropdown kemudian buat fungsi event. || event change mendeteksi perubahaan nilai pada input tertentu. pada kasus disini dropdown
    resultFrom = `${event.target.value}`;                       //bagian ini menginisiasi ketika event handler dari fromCurrecy berubah makan nilai akan disimpan
});

//event listener saat currency berubah 2
toCurrecy.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
});

search.addEventListener('input', updateValue);                  //beri event handler input untuk search dengan memanggil fungsi updateValue

//fungsi update value
function updateValue(e) {                                       //buat fungsi dengan argumen e
    searchValue = e.target.value;                               //inisiasi atau memperbarui variabel searchValue dengan nilai (value) dari elemen yang memicu event (e.target), yaitu elemen input dalam konteks ini.
}

//event listener untuk summon getResult
convert.addEventListener("click", getResults);                  //tambah event handler click pada convert dengan memanggil fungsi getResult

//fungsi getResult
function getResults() {                             //buat fungsi 
    fetch(`${api}`)                                 //summon request terhadap api
        .then(currency => {                         //menerima fungsi callback dengan parameter curency yang merupakan respon API
            return currency.json();                 //metode JSON() dipanggil untuk object currency, disini di respon json dirubah menjadi object
        }).then(displayResult);                     //menerima object JSON yang telah diurai menjadi argumen dan memanggil fungsi display result
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
