export default function getScript(url, callback) {
    callback = typeof callback === 'function' ? callback : function() {};
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.type = 'text/javascript';

    script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
            callback();
            script.onload = script.onreadystatechange = null;
        }
    };

    script.src = url;

    head.appendChild(script);
}