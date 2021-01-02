const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');
var webdriver2 = require('selenium-webdriver');
var driver2 = new webdriver2.Builder()
  .forBrowser('chrome')
  .build();


async function sleep(timems) {
    await new Promise(resolve => setTimeout(resolve, timems));
}

module.exports = function (username, paswd) {

    var module = {};
    type = "submit"
    module.login = async function () {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://instagram.com/accounts/login');
            var usernQ = await driver.wait(until.elementLocated(By.name('username')));
            await usernQ.sendKeys(username);
            var paswdq = await driver.wait(until.elementLocated(By.name('password')));
            await paswdq.sendKeys(paswd);


            var loginbtn = await driver.wait(until.elementLocated(By.xpath(`//*[@id="loginForm"]/div/div[3]/button`)));
            await loginbtn.click();
            await driver.wait(until.titleIs('Instagram'), 5000);
            console.log('Login Complete!')

            // var link = `window.location.href = ('http://instagram.com/the_engineer_bro');`; 
            // (driver).executeScript(link);
            return driver;

        } finally {
            // await driver.quit(); 
        }
    }




    module.likePost = async function (driverLoggedIn, username, postId) {
        let driver = driverLoggedIn;

        (driver).executeScript(`window.location.href = (' https://www.instagram.com/p/${postId}');`);
        await driver.wait(until.titleContains("Instagram"), 5000);
        // console.log('loded Post') 
        let search = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section[1]/span[1]/button'), 5000));
        await search.click()
        // console.log('liked Post')

    }


    return module;
}
