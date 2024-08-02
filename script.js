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
    fetch(`${api}`)                                 //summon request terhadap api           || panggil api
        .then(currency => {                         //menerima respon API dan mengoper ke fungsi callback dengan parameter currency
            return currency.json();                 //panggil metode JSON() pada object currency untuk mengurai respon JSON menjadi object JawaScript
        }).then(displayResult);                     //menerima object JSON yang telah diurai menjadi argumen dan memanggil fungsi display result    || tampilkan dengan fungsi display result
}

//fungsi display sesudah di konversi
function displayResult(currency) {                  //buat fungsi  dengan argumen currency
    let fromRate = currency.rates[resultFrom];      //inisiasi dengan rates currency yang diindex dari resultFrom
    let toRate = currency.rates[resultTo];          //inisiasi dengan rates currency yang diindex dari resultTo
    finalValue.innerHTML =                          //atur elemen html finalValue dengan
        ((toRate / fromRate) * searchValue).toFixed(2); //(toRate / fromRate) * searchValue. kemudian atur perhitungan menjadi string yang memiliki 2 angka desimal
    finalAmount.style.display = "block";
}

//fungsi reset btn
function clearVal() {                               //buat fungsi
    window.location.reload();                       //memuat ulang halaman / refresh
    document.getElementsByClassName("finalValue").innerHTML = ""; //mengkosongkan finalValue
}
