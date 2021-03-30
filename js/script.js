"use strict";

// Globale Variabelen
var txtInputs;
var btnBevestig,btnClear;
var divTrekking;
var divResponse;
const aantalNumbersInLotto = 42;

window.addEventListener('load',Initieer);

function Initieer(){
  // Linken van DOM Elementen

  BindElements();
  // EventListeners Toevoegen
  AddEventListeners();

  // Functieaanroep bij opstart of initialiseren variabelen
  ResetUi();

}

// Functies
function ResetUi()
{
    //reset the inputs
    //with arrayFrom
   // Array.from(txtInputs).map((el) => {return el.value == ''});
    //classic
    for(let i = 0;i < txtInputs.length;i++)
    {
        txtInputs[i].value = '';
    }
    //reset the divs
    divResponse.innerHTML = '';
    divTrekking.innerHTML = '';
    txtInputs[0].focus();
}

function BindElements()
{
    txtInputs = document.querySelector('div.Combinatie').querySelectorAll('input');
    btnBevestig = document.querySelector('#btnBevestig');
    divTrekking = document.querySelector('div.divTrekking');
    divResponse = document.querySelector('#divResponse');
    btnClear = document.querySelector('#btnClear');
}

function AddEventListeners()
{
    btnBevestig.addEventListener('click',DoTrekking);
    btnClear.addEventListener('click', ResetUi);   
}

function DoTrekking()
{
    let arNumbersPlayed = new Array();
    let arNumbersTrekking;
    let arNumbersCompared;
    //get input values
    txtInputs.forEach(element => { arNumbersPlayed.push(parseInt(element.value))});
    //validate
    if(!Validate(arNumbersPlayed))
    {
        OutputMessage('Gelieve correcte getallen in te geven!');
        return;  
    }
    arNumbersTrekking = GenerateLottoNumbers(6);
    //compare numbersplayed and numbers trekking
    arNumbersCompared = CompareNumbersPlayedWithTrekking(arNumbersTrekking,arNumbersPlayed);
    //showResults
    console.log(arNumbersTrekking);
    console.log(arNumbersPlayed);
    console.log(arNumbersCompared);
    ShowLottoBalls(arNumbersTrekking,arNumbersCompared);
    OutputMessage(`U heeft ${arNumbersCompared.length} getal(len) correct!`);

}

function CompareNumbersPlayedWithTrekking(arNumbersPlayed,arNumbersTrekking)
{
    let arNumbersEqual = Array();
    arNumbersPlayed.forEach((el) => {if(arNumbersTrekking.includes(el)){arNumbersEqual.push(el);}});
    return arNumbersEqual;
}


function AddBallToDiv(number,match)
{
    let newDiv = document.createElement('div');
    newDiv.className = 'cijfer';
    newDiv.innerHTML = number;
    if(match)
        newDiv.style.backgroundColor = 'red';
    divTrekking.appendChild(newDiv);
}

function OutputMessage(message)
{
  divResponse.innerHTML = message;
}

function GenerateLottoNumbers(numberOfNumbers)
{
    let arNumbers = Array();
    let randomNumber;
    for(let i = 0;i<numberOfNumbers;i++)
    {
        randomNumber = GenerateRandomNumber(aantalNumbersInLotto);
        while(arNumbers.includes(randomNumber))
        {
            randomNumber = GenerateRandomNumber(aantalNumbersInLotto);
        }
        arNumbers.push(randomNumber);
    }
    return arNumbers;
}


function GenerateRandomNumber(max)
{
    return Math.ceil(Math.random()*(max-1));
}

function Validate(arNumbers)
{
    let validated = true;
    //check voor Nans
    if(arNumbers.some((el) => {return isNaN(el)}))
      validated = false;
    //check getallen binnen de range
    if(arNumbers.some((el) => {return (el <=0 || el >aantalNumbersInLotto);}))
    validated = false;
    //check op unieke gespeelde getallen
    arNumbers.forEach(el => 
        {
            if(arNumbers.indexOf(el) !== arNumbers.lastIndexOf(el))
            validated = false;
        });
    return validated;
}

function ShowLottoBalls(arNumbersPlayed,arNumbersCompared)
{
    divTrekking.innerHTML = '';
    arNumbersPlayed.forEach((el)=>{AddBallToDiv(el,arNumbersCompared.includes(el));});
}