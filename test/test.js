// tests/myTest.js

module.exports = {
    'My Nightwatch Test': function (browser) {
      browser
        .url('/login')
        .waitForElementVisible('body', 1000)
        browser.element.findByText('Iniciar Sesion').doubleClick();
    },
  };

  //no funciona, se han intentado las pruebas con cypress y protractor, no se ha logrado hacer las pruebas e2e.