require("tools-for-instagram");
const fetch = require('node-fetch');

var ig;
var info;
(async () => {

    ig = await login();
    info = await getUserInfo(ig, "Instagram");
    console.log("User information, username: " + info.username);

})();



async function getUserRecentPostsAll(ig, username) {
    let info = await getUserInfo(ig, username);
    let feed = await ig.feed.user(info.pk);
    let list = await feed.items();
    //To keep getting content, maybe on a future function:
    do {
        moreList = await feed.items();
        Array.prototype.push.apply(list, moreList);
        console.log(list[list.length - 1]);
        console.log(list.length);

    } while (feed.moreAvailable == true);

    return list;
}


module.exports = function () {
    var module = {};

    module.likeAllPosts = async function (username, res) {

        var posts = await getUserRecentPostsAll(ig, username)
        console.log('retreived ', posts.length, ' posts')
        let noPostsLiked = 0;
        let post = {};

        var prot = require('../test/prot')(process.env.IG_USERNAME, process.env.IG_PASSWORD)
        var driver = await prot.login();

        for (var i = 0; i < posts.length; i++) {
            post = posts[i];
            // likePost(ig, post);
            await prot.likePost(driver, post.user.username, post.code);
            // console.log(post);
            noPostsLiked++;
            // if (post.caption)
            //     res.write(`liked ${post.caption.text}<br>\n`)
            // else
            res.write(`liked ${post.code} ${i+1}/${posts.length}\n`)

        }
        console.log('liked ', noPostsLiked, ' posts')
        driver.quit();
        res.write('Liked ' + noPostsLiked + ' posts');
        res.end();
    }


    module.getIg = function getIg() {
        return ig;
    };

    return module;
}