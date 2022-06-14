import Bridge from './Bridge'

export default async function (link) {
    console.log('link:', JSON.stringify(link))
    if(!ENV.IS_APP && window.top != window.self){
        window.top.postMessage(link, '*');
        return false;
    }
    switch (link.type) {
        case 'item':
            Bridge.goItem(link.id)
            break;
        case 'brand':
            Bridge.goBrand(link.id)
            break;
        case 'topic':
            Bridge.goTopic(link.id);
            break;
        case 'group':
            Bridge.goGroup(link.id);
            break;
        case 'home':
            Bridge.goHome();
            break;
        case 'category':
            Bridge.goCategory(link.id)
            break;
        case 'cart':
            Bridge.goCart();
            break;
        case 'userCenter':
            Bridge.goUserCenter();
            break;
        case 'url':
            Bridge.goURL(link.url);
            break;
    }
}
