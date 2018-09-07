function getCookie(name){
    var arrCookie=document.cookie.split('; ');
    console.log(arrCookie)
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split('=');
        if(arr[0]==name){
            return decodeURIComponent(arr[1]);
        }
    }
    return false;
}