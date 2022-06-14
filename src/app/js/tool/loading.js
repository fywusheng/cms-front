var loading = document.createElement('div');
loading.setAttribute('class', 'topic-loading');
loading.innerHTML = '<div class="topic-loading-main"><i></i></div>';
document.body.appendChild(loading);

export default {
    open(){
        loading.setAttribute('on', '');
    },
    close(){
        loading.removeAttribute('on')
    }
}