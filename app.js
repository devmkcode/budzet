// Variables
let earn = document.querySelector("#earn");
let earnForm = document.querySelector(".earnHandler");
let result = document.querySelector(".result");
let container = document.querySelector(".container");
let outgoForm = document.querySelector(".outgoHandler");
let outgoName = document.querySelector(".outgoName");
let outgoLimit = document.querySelector(".outgoLimit");
let restCost = document.querySelector('.rest-cost');
// LocalStorage
let money = parseInt(JSON.parse(window.localStorage.getItem("money")));
const outgo = JSON.parse(window.localStorage.getItem("outgo"));

if(window.localStorage.getItem("money") == undefined){
  money = 0;
  window.localStorage.setItem("money", JSON.stringify(money));
}
if(window.localStorage.getItem("outgo") == undefined){
  const outgo = [];
  window.localStorage.setItem("outgo", JSON.stringify(outgo));
}

// Class
class item{
	constructor(name, limit, cost){
		this.createItem(name, limit, cost);
	}
    createItem(name, limit, cost){

    	const itemBox = document.createElement('div');
      itemBox.classList.add('cost');

      const inputsWrap = document.createElement('div');
      inputsWrap.classList.add('inputs-wrap');

      const buttonsWrap = document.createElement('div');
      buttonsWrap.classList.add('buttons-wrap');

      const input = document.createElement('input');
    	input.type = "text";
      input.disabled = true;
      input.classList.add('outgo-title');
    	input.value = name;

      const currencyCost = document.createElement('div');
      currencyCost.classList.add('outgo-currency');

      const currencyLimit = document.createElement('div');
      currencyLimit.classList.add('outgo-currency');

      const restPerCost = document.createElement('div');
      restPerCost.classList.add('rest-per-cost');
      restPerCost.textContent = "Reszta z " + name.toLowerCase() + ": ";
      restPerCost.textContent += limit - cost;
      restPerCost.textContent += "zł";

      const inputNumber = document.createElement('input');
    	inputNumber.type = "number";
      inputNumber.disabled = true;
    	inputNumber.value = limit;

      const inputCost = document.createElement('input');
    	inputCost.type = "number";
      inputCost.disabled = true;
    	inputCost.placeholder = cost;

    	const edit = document.createElement('button');
    	edit.classList.add('edit-btn');
    	edit.innerHTML = '<i class="fas fa-pencil-alt"></i>'; 
    	edit.addEventListener('click', (e) => {
        e.preventDefault();
        this.edit(inputCost, name);
        inputCost.focus();
        window.addEventListener('keyup', (e) => {
        if(e.keyCode == 13){
            edit.click();
        }});
      });

    	const remove = document.createElement('button');
    	remove.classList.add('remove-btn');
    	remove.innerHTML = '<i class="far fa-trash-alt"></i>';
    	remove.addEventListener('click', () => this.remove(itemBox, name));

    	container.appendChild(itemBox);
        itemBox.appendChild(inputsWrap);
        itemBox.appendChild(buttonsWrap);
        itemBox.appendChild(restPerCost);
        inputsWrap.appendChild(input);
        inputsWrap.appendChild(currencyLimit);
        inputsWrap.appendChild(currencyCost);
        currencyCost.appendChild(inputCost);
        currencyLimit.appendChild(inputNumber)
        buttonsWrap.appendChild(edit);
        buttonsWrap.appendChild(remove);

    }

  edit(inputCost, name){
    if(inputCost.disabled == true){
      inputCost.disabled = !inputCost.disabled;
    }
  else{
    inputCost.disabled = !inputCost.disabled;
        for(let i = 0; i < outgo.length; i++) {
          if(outgo[i].name === name) {
            if(inputCost.value !== ""){
              outgo[i].cost = parseInt(inputCost.value) + outgo[i].cost ;
              window.localStorage.setItem("outgo", JSON.stringify(outgo));
              window.location.reload();
            }else{
              window.location.reload();
            }
          }
   }}}

  remove(itemBox, name){
    itemBox.parentNode.removeChild(itemBox);
    for(let i=0; i<outgo.length; i++){
      if(outgo[i].name === name){
        outgo.splice(i, 1);
        window.localStorage.setItem("outgo", JSON.stringify(outgo));
        window.location.reload();
      }
    }
  }
}

// Events 
earnForm.addEventListener('submit', (e) => {
  let calc = parseInt(earn.value);
  e.preventDefault();
  money += calc;
  console.log(money);
  result.innerHTML = "<h2>Pieniądze " + money + "zł</h2>";
  window.localStorage.setItem("money", JSON.stringify(money));
  earn.value = "";
  displayMoney();
});

outgoForm.addEventListener('submit', () => {
  if(outgoName.value != "" && outgoLimit.value != ""){
      if(outgoLimit.value > money){
          alert('Nie masz już tyle pieniędzy');
          outgoName.value = "";
          outgoLimit.value = "";
      }
      else{
      new item(outgoName.value, outgoLimit.value);
        let obj = {
          name: outgoName.value,
          limit: outgoLimit.value,
          cost: 0,
        }
        outgo.push(obj);
        money -= outgoLimit.value;
        window.localStorage.setItem("money", JSON.stringify(money));
        window.localStorage.setItem("outgo", JSON.stringify(outgo));
        outgoName.value = "";
        outgoLimit.value = "";
        displayMoney();
      }}});


// Display localstorage

const displayMoney = () => {
  if(localStorage.getItem("money") === null){
    result.textContent = "0";
  }else{
    result.innerHTML = "<h2>Pieniądze " + money + "zł</h2>";
  }
}
displayMoney();

let rest = 0;

for (let v = 0 ; v < outgo.length ; v++){
  new item(outgo[v].name, outgo[v].limit, outgo[v].cost); 
  if(outgo[0].name !== '' ){
    rest += outgo[v].limit - outgo[v].cost;
  }
}
if(rest > 0){
  restCost.textContent = "Reszta z planów: " + rest + "zł.";
}
