//delgets
var uiController = (function(){

})();
//sanhuu
var financeController = (function(){

})();
//holbogch
var appConroller = (function(uiController, financeController){
  var addItem = function(){
    console.log("event created");
  }
  document.querySelector(".add__btn").addEventListener("click", function(){
    addItem();
    //ugugduluu delgetsees olj avah
    //sanhuugin controllert damjulan hadgalah
    //web deree tohiroh hesegt gargah
    //tusuv tootsoh
    //tootsoog delgetsend haruulah
  });
  document.addEventListener('keypress',function(event){
    if(event.keyCode === 13){
     addItem();
    }

  })
})(uiController, financeController)