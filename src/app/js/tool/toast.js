const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export default async function(text){
    var toast = document.createElement('div');
    toast.setAttribute('class', 'topic-toast');
    toast.innerText = text;
    document.body.appendChild(toast);

    await sleep(0);

    toast.setAttribute('on', '');

    await sleep(3000);

    toast.removeAttribute('on')

    await sleep(1000);

    toast.remove();
}