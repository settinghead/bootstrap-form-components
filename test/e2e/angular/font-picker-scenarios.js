(function() {

  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  var fs = require("fs");

  browser.driver.manage().window().setSize(1024, 768);


  describe("font picker", function() {
    beforeEach(function (){
      browser.get("/test/e2e/angular/font-picker-scenarios.html");
    });

    //a scenario where two products are added to the shopping cart
    describe("font list", function() {
    });
  });
})();
