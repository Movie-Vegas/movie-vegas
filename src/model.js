
/**The CORS request was attempted with the credentials flag set, but the server is configured using the wildcard ("*")
 * as the value of Access-Control-Allow-Origin, which doesn't allow the use of credentials.

 To correct this problem, simply ensure that the xhr with-credentials flag's value is set false when issuing your CORS request.
 **/
class Model {


    /**
     *
     * setIsXhrInProgress function check if XMLHTTP is initialize
     * function setIsXhrInProgress
     * @param isXhrInProgress
     */
    setIsXhrInProgress(isXhrInProgress){
        this.isXhrInProgress=isXhrInProgress;
    }

    getIsXhrInProgress(){
        return this.isXhrInProgress;
    }

    /**
     *
     * @param account
     */
    setAccount(account){
        this.account=account;
    }

    /**
     * The function XHRequest is used to initialized XMLHttpRequest
     * @param method
     * @param url
     * @param key
     * @param flag
     * @constructor
     */
    XHRequest(method, url, key, flag) {


        let request=new XMLHttpRequest();
        request.withCredentials = flag;
        let loading=document.querySelector("#loading");
        request.addEventListener('progress', function () {
            let color=0;
            let  timer=setInterval(function () {



                if(color<=800){


                    loading.style.background="rgba(100%,"+color+color+"%,1%,2.8)";


                }


                if(color===800){
                    clearInterval(timer)

                }
                color++;
            }, 100);




        });


        request.open(method, "https://api.themoviedb.org/3" + url + key, true);
        this.request= request;


    }

    /**
     * Return initialized XMLHttpRequest
     * @returns {XMLHttpRequest}
     */
    getXHR(){

        return this.request;

    }


}

export  default  Model;