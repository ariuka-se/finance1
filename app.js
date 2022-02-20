// Хэрэглэгчийн интерфейс
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// Ð¡Ð°Ð½Ñ…Ò¯Ò¯Ñ‚ÑÐ¹ Ð°Ð¶Ð¸Ð»Ð»Ð°Ñ… ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€
var financeController = (function() {})();

// ÐŸÑ€Ð¾Ð³Ñ€Ð°Ð¼Ñ‹Ð½ Ñ…Ð¾Ð»Ð±Ð¾Ð³Ñ‡ ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    // 1. ÐžÑ€ÑƒÑƒÐ»Ð°Ñ… Ó©Ð³Ó©Ð³Ð´Ð»Ð¸Ð¹Ð³ Ð´ÑÐ»Ð³ÑÑ†ÑÑÑ Ð¾Ð»Ð¶ Ð°Ð²Ð½Ð°.
    console.log(uiController.getInput());
    // 2. ÐžÐ»Ð¶ Ð°Ð²ÑÐ°Ð½ Ó©Ð³Ó©Ð³Ð´Ð»Ò¯Ò¯Ð´ÑÑ ÑÐ°Ð½Ñ…Ò¯Ò¯Ð³Ð¸Ð¹Ð½ ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€Ñ‚ Ð´Ð°Ð¼Ð¶ÑƒÑƒÐ»Ð¶ Ñ‚ÑÐ½Ð´ Ñ…Ð°Ð´Ð³Ð°Ð»Ð½Ð°.
    // 3. ÐžÐ»Ð¶ Ð°Ð²ÑÐ°Ð½ Ó©Ð³Ó©Ð³Ð´Ð»Ò¯Ò¯Ð´ÑÑ Ð²ÑÐ± Ð´ÑÑÑ€ÑÑ Ñ‚Ð¾Ñ…Ð¸Ñ€Ð¾Ñ… Ñ…ÑÑÑÐ³Ñ‚ Ð½ÑŒ Ð³Ð°Ñ€Ð³Ð°Ð½Ð°
    // 4. Ð¢Ó©ÑÐ²Ð¸Ð¹Ð³ Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð»Ð½Ð¾
    // 5. Ð­Ñ†ÑÐ¸Ð¹Ð½ Ò¯Ð»Ð´ÑÐ³Ð´ÑÐ», Ñ‚Ð¾Ð¾Ñ†Ð¾Ð¾Ð³ Ð´ÑÐ»Ð³ÑÑ†ÑÐ½Ð´ Ð³Ð°Ñ€Ð³Ð°Ð½Ð°.
  };

  var setupEventListeners = function() {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function() {
      console.log("Application started...");
      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();