import React from "react";


/**The CORS request was attempted with the credentials flag set, but the server is configured using the wildcard ("*")
 * as the value of Access-Control-Allow-Origin, which doesn't allow the use of credentials.

 To correct this problem, simply ensure that the xhr with-credentials flag's value is set false when issuing your CORS request.
 **/
class Control extends React.Component{


    /**
     * The Control constructor used to instantiate View and Model
     * @param view
     * @param model
     */
    constructor(view, model){
        super(view, model);

        this.model=model;
        this.view=view;


    }


    /**  setIsXhrInProgress function check if XMLHTTP is initiated
     *  @function setIsXhrInProgress
     * @param IsXhrInProgress
     */
    setIsXhrInProgress(IsXhrInProgress) {
        this.model.setIsXhrInProgress(IsXhrInProgress);
    }


    /**
     * setXHRequest is used to initialize XHRequest
     * @param method
     * @param url
     * @param key
     * @param flag
     */
    setXHRequest(method, url, key, flag) {
        this.model.XHRequest(method,url,key,flag);
    }

    /**
     * setAccount is used to set account
     * @param account
     */
    setAccount(account) {
        this.model.setAccount(account);


    }


    /**
     * updateView
     * @returns {*}
     */
    updateView() {


        let data=JSON.stringify('{}');
        if(this.model.getIsXhrInProgress()){

            return (<div id="view_ready">{this.view.renderMovieDetails(this.model.getXHR(),data)}</div>);


        }else {

            return (<div id="view_ready">{this.view.renderMovieDetails(this.model.getXHR(),data)}</div>);


        }


    }


}


export default Control;
