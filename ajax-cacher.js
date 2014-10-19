var ajaxCacher = {
    get : function(url, cb){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4){
                if (xhr.status == 200){
                    cb({
                        data: xhr.responseText
                    });
                    localStorage.setItem(url, JSON.stringify({
                        data: xhr.responseText,
                        timestamp: new Date()
                    }));
                }
                else if (xhr.status == 304){
                    cb({
                        data: JSON.parse(localStorage.getItem('url')).data
                    });
                }
                else{
                    cb({
                        error: "Unable to retrieve data"
                    });
                }
            }
        };
        xhr.open('GET', url, true);
        if (url in localStorage){
            xhr.setRequestHeader('If-Modified-Since', JSON.parse(localStorage.getItem('url')).timestamp);
        }
        xhr.send();
    };
};
