// delgets
var uiController = (function() {
  var DOMnames = {
    inputType: '.add__type',
    inputDesc: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn',
    incomeList: '.income__list',
    expenseList:'.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    expensePer: '.budget__expenses--percentage',
    container: '.container',
    expPer: '.item__percentage',
    dateLabel: '.budget__title--month'
  };
  var nodeListFor =  function(list, callback){
    for(var i = 0; i < list.length; i++){
      callback(list[i], i);
    }
  };
  var formatMoney = function(num, type){
    num = "" + num;
    var a = num.split("").reverse().join("");
    var b = "";
    var c = 1;
    for(var i = 0; i < a.length; i++){
      b = b + a[i];
    if(c % 3 === 0) {b = b + ",";}
      c++;
    }
    var d = b.split("").reverse().join("");
    if(d[0] === ",") d = d.substring(1, d.length-1);
    if(type === "inc")  d = " + " + d;
    else d = " - " +d;
    return d;
  }
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMnames.inputType).value,
        description: document.querySelector(DOMnames.inputDesc).value,
        value: parseInt(document.querySelector(DOMnames.inputValue).value)
      };
    },
    displayDates: function(){
      var today = new Date();
      document.querySelector(DOMnames.dateLabel).textContent = today.getFullYear() + " оны "+ today.getMonth()+" сарын ";
    },
    getDOMname: function(){
      return DOMnames;
    },
    clearFields: function(){
      console.log("clear fields duudagdlaa");
      var fields = document.querySelectorAll(DOMnames.inputDesc + ', ' + DOMnames.inputValue);
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(el, index, array) {
        el.value= '';
      })
      fieldsArr[0].focus();
      // for(var i = 0; i < fieldsArr.length; i++){
      //   fieldsArr[i].value = '';
      // }
    },
    displayBudget: function(finance){
      console.log(finance.budget)
      var type;
      if(finance.budget > 0){
        type = 'inc';
      }else type = 'exp'
      document.querySelector(DOMnames.budgetLabel).textContent = formatMoney(finance.budget, type);
      document.querySelector(DOMnames.incomeLabel).textContent = formatMoney(finance.inc, 'inc');
      document.querySelector(DOMnames.expenseLabel).textContent = formatMoney(finance.exp, 'exp');
      document.querySelector(DOMnames.expensePer).textContent = finance.per + "%";
    },
    deleteItemUI: function(id){
      var child = document.getElementById(id);
      child.parentNode.removeChild(child);
    },
    displayPerc: function(all){
      var elm = document.querySelectorAll(DOMnames.expPer);
      // console.log(elm);
      nodeListFor(elm, function(el, index){
        el.textContent = all[index]+"%";
      })
    },
    changeColor: function(){
      var changeEls = document.querySelectorAll(DOMnames.inputType + ', ' + DOMnames.inputDesc + ', ' + DOMnames.inputValue);
      var changeBtn = document.querySelector(DOMnames.addBtn);
      nodeListFor(changeEls, function(el){
        el.classList.toggle('red-focus');
      })
      changeBtn.classList.toggle('red');
    },
    addItemUI: function(item, type){
      //orlogo, zarlaga hevleh html beldeh
      var html, list;
      if(type === 'inc'){
        list = DOMnames.incomeList;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>'
      }else {
        list = DOMnames.expenseList;
        html =  '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div>      <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //orlogo zarlaga replace hiine
      html = html.replace("%id%", item.id);
      html = html.replace("%desc%", item.desc);
      html = html.replace("%value%", formatMoney(item.value, type));
      //beltgesen htmleee DOMruu hiine
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    }
  };
})();

// sanhuu
var financeController = (function() {
  var InCome = function(id, desc, value){
    this.id = id;
    this.desc = desc;
    this.value = value;
  };
  var Expense = function(id, desc, value){
    this.id = id;
    this.desc = desc;
    this.value = value;
    this.percentage = -1;

  };
  Expense.prototype.calPer = function(totalInc){
    if(totalInc > 0) this.percentage = Math.round((this.value / totalInc) * 100);
    else this.percentage = 0;
  },
  Expense.prototype.getPer = function(id){
    return this.percentage;
  }
  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    },
    budget: 0,
    percent: 0
  }
  var calculateTotal = function(type){
    var sum = 0;
    data.items[type].forEach(function(el){
      sum = sum + el.value;
    })
    data.totals[type] = sum;
  }

  return {
    addItemFinance: function(type, desc, value){ 
      var info, id;
      if(data.items[type].length === 0){id = 1}
      else {id = data.items[type][data.items[type].length-1].id+1}
      if(type === "inc"){
        info = new InCome(id, desc, value);
      } else {
        info = new Expense(id, desc, value);
      }
      data.items[type].push(info);
      return info;
    },
    calculateBudget: function(){
      calculateTotal("inc");
      calculateTotal("exp");
      data.budget = data.totals["inc"]-data.totals["exp"];
      if(data.totals.exp !== 0) data.percent = Math.round(data.totals.exp / data.totals.inc * 100)
      else data.percent = 0;
    },
    calculatePerc: function(){
      data.items.exp.forEach(function(el){
        el.calPer(data.totals.inc);
      })
    },
    getPerc: function(){
      var allPerc = data.items.exp.map(function(el){
        return el.getPer();
      })
      return allPerc;
    },
    seeData: function(){
      return {inc: data.items.inc, exp: data.items.exp};
    },
    getFinance: function(){
      return {
        budget: data.budget,
        per: data.percent,
        inc: data.totals.inc,
        exp: data.totals.exp
      }
    },
    deleteItem: function(type, id){
      
      var idxs = data.items[type].map(function(el){
        return el.id;
      })
      var idx = idxs.indexOf(id);
      if(idx !== -1){
        data.items[type].splice(idx,1);
      }
    }
  } 

})();

// holbogch
var appController = (function(uiController, financeController) {
  
  var addItem = function() {
    var inputInfo = uiController.getInput();
    if(inputInfo.value !== "" && inputInfo.description !==""){
      var info = financeController.addItemFinance(inputInfo.type, inputInfo.description, inputInfo.value);
      uiController.addItemUI(info, inputInfo.type);
      uiController.clearFields();
      updateBudget();
    } else {
      console.log("hooson baina");
      alert("Хоосон утга оруулсан байна. Дахин оролдоно уу")};
    
  };
  var updateBudget = function(){
    financeController.calculateBudget();
      var budget = financeController.getFinance();
      uiController.displayBudget(budget);
      console.log(budget);
      financeController.calculatePerc();
      var perc = financeController.getPerc();
      console.log(perc);
      uiController.displayPerc(perc);
  }

  var setUpEventListeners = function(){
    var DOMnames = uiController.getDOMname();
    document.querySelector(DOMnames.addBtn).addEventListener('click', function() {
      addItem();
      // Additional code for further actions
    });
  
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13) {
        addItem();
      }
    });
    document.querySelector(DOMnames.inputType).addEventListener("change", uiController.changeColor);
    document.querySelector(DOMnames.container).addEventListener("click", function(event){
      
      var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
      // console.log(id);
      var arr = id.split('-');
      financeController.deleteItem(arr[0], parseInt(arr[1]));
      uiController.deleteItemUI(id);
      updateBudget();
    })
  }
  return {
    init: function(){
      uiController.displayDates();
      uiController.displayBudget(
        {budget: 0,
        per: 0,
        inc: 0,
        exp: 0});
      setUpEventListeners();
    }
  }

})(uiController, financeController);

appController.init();