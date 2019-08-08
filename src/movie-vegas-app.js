import React from 'react';
import './movie-vegas.css';
import Control from "./control";
import Model from "./model";
import View from "./view";



/**The CORS request was attempted with the credentials flag set, but the server is configured using the wildcard ("*")
 * as the value of Access-Control-Allow-Origin, which doesn't allow the use of credentials.

 To correct this problem, simply ensure that the xhr with-credentials flag's value is set false when issuing your CORS request.
 **/


class MovieVegasApp extends React.Component{



    /**
     *  render View components
     * @function{componentWillMount,render}
     * @object {Model,View,Control}
     * @class{MenuBar,MenuItems,Menu,Footer}
     */


    componentWillMount() {

        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);


    }



    render() {



        return  (<div><MenuBar/>{<div ><div id="results" ref ="results">{this.control.updateView()}</div></div>}<Footer/></div>)


    }



}

/**
 * MenuBar class that holds menu elements
 * @function {render}
 *
 */


class MenuBar extends React.Component{

    render() {
        return (<div>


            <div id="menubar">
                <Menu/>
                <span id="company_name">MOVIE<span className="logo">     </span>VEGAS</span> <MenuItems/>



            </div>

        </div>);
    }

}

/**
 * Menu class that holds menu elements
 * @function {render}
 *
 */

class Menu extends React.Component{

    render() {
        return (  <div id="menu">
                <span id="accents"> </span>
            </div>
        );
    }
}

/**
 * MenuItem class that holds menu elements
 * @function {render,constructor,componentDidMount,
 * search,updateSearch,updateView,next,prev,accountRequest,watchList,lists,favorite,progress}
 *
 */
class MenuItems extends React.Component{

    //the constructor used to initialize MenuItems Objects
    constructor(prop){
        super(prop);

        this.state={
            account:"",
            color:"",
            query:"marvel",
            value:'',
            count:1
        };
        this.model=new Model();
        this.view=new View();

        this.control=new Control(this.view,this.model);
        this.menuList=this.menuList.bind(this);
        this.favorites=this.favorites.bind(this);
        this.lists=this.lists.bind(this);
        this.watchList=this.watchList.bind(this);
        this.accountRequest=this.accountRequest.bind(this);
        this.next=this.next.bind(this);
        this.prev= this.prev.bind(this);
        this.updateSearch= this.updateSearch.bind(this);
        this.search=this.search.bind(this);




    }
    //Inheritance of React component life cycle component componentDidMount;
    componentDidMount() {



        this.accountRequest();
    }

    /**
     * The search function allows query for movies through a Endpoint on TheMovieDB
     * @function search
     * @param event
     */
    search(event) {
        this.setState({query:event.target.value});
        if(event.target.value !==undefined){


            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page=1&query="+event.target.value+"&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();
            this.view.setIsSearch(true);
            this.view.setIsFavorite(false);
            this.view.setIsList(false);
            this.view.setIsWatchList(false);

            this.setState({query:event.target.value});
        }





    }


    /**
     * The updateSearch function allows query update through a Endpoint on TheMovieDB
     * @param event
     */
    updateSearch(event) {


        if(![""," ",undefined].includes(this.state.query)){

            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page=1&query="+this.state.query+"&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();

        }else {


            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page=1&query=hshjdfjhsdjhfjhsdjhfjskdjf&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();

        }
        this.view.setIsSearch(true);

        event.preventDefault();
        event.stopPropagation();

    }

    /**
     * The next function allows after query update through a Endpoint on TheMovieDB
     * @param event
     */
    next(event) {




        if(this.state.query  !==undefined && this.state.count>0){




            if(this.state.count>=1){



                if(this.state.count>this.view.getPages() && this.state.count!==2){

                    this.setState({count:this.state.count-1});
                }else  {

                    this.setState({count:this.state.count+1});
                }



            }


            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page="+
                this.state.count+"&query="+this.state.query +"&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();


        }
        this.view.setIsSearch(false);
        this.view.setIsFavorite(false);
        this.view.setIsList(false);
        this.view.setIsWatchList(false);
        event.preventDefault();

    }

    /**
     * The next function allows before query update through a Endpoint on TheMovieDB
     * @param event
     */
    prev(event) {



        if(this.state.query  !==undefined && this.state.count>0){






                if( this.state.count >=2){

                    this.setState({count:this.state.count-1});
                }else {
                    this.setState({count:this.state.count+1});
                }




            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page="+
                this.state.count+"&query="+this.state.query +"&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();


        }
        this.view.setIsSearch(false);
        this.view.setIsFavorite(false);
        this.view.setIsList(false);
        this.view.setIsWatchList(false);
        event.preventDefault();

    }

    /**
     * The function  accountRequest fetches account token from the  Endpoint on TheMovieDB
     */
    accountRequest(){
        let control=this.control;
        let model=control.model;
        let key="&api_key=a8ac0ce418f28d6ec56424ebad76ed12&";
        let session_id="968092a83b4016a49c3ddde1cc030d149fc6ba0b";

        control.setXHRequest("GET", "/account?session_id="+session_id ,key,false);
        control.setIsXhrInProgress(true);

        let xhr=model.getXHR();
        let data = JSON.stringify("{}");
        let state=this.state;
        let isProgress=false;

        xhr.addEventListener("readystatechange", function () {

            if (this.readyState === 4 && [200,201,202.203].includes(this.status) && window.navigator.onLine) {

                control.setAccount(this.responseText);
                control.view.setIsLoaded(true);
                state.account=this.responseText;




                let url="/search/movie?";
                let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page=1&query=marvel&event.target.value&language=en-US";
                control.setXHRequest("GET",url,key,false);
                control.updateView ();







            }else {

                if(this.readyState === 4){
                    alert("Hmm. We’re having trouble finding that Query.\n" +
                        "\n" +
                        "We can’t connect to the server at " + navigator.appName +
                        "\n" +
                        "If that address is correct, here are three other things you can try:\n" +
                        "\n" +
                        "    Try again later.\n" +
                        "    Check your network connection.\n" +
                        "    If you are connected but behind a firewall," + navigator.appName +
                        " check that " + navigator.appName + "has permission to access the Web.");

                }

                if([1,2,3].includes(this.readyState)){
                    isProgress=true;


                }





            }
        });

        if(isProgress){
            this.progress();
        }
        xhr.responseType="text";
        xhr.send(data);






    }
    /**
     * The function  list fetches list  items from the  Endpoint on TheMovieDB
     */
    lists(){
        let control=this.control;

        if(![""," ",undefined].includes(this.state.account) && window.navigator.onLine){


            control.setXHRequest("GET", "/account/8408193/lists?api_key=a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&page=1","",false);
            control.updateView();

            this.view.setIsFavorite(false);
            this.view.setIsWatchList(false);
            this.view.setIsList(true);
            this.view.setIsSearch(false);



        }else {


            alert("Hmm. We’re having trouble finding that Query.\n" +
                "\n" +
                "We can’t connect to the server at " + navigator.appName +
                "\n" +
                "If that address is correct, here are three other things you can try:\n" +
                "\n" +
                "    Try again later.\n" +
                "    Try refreshing the browser.\n" +
                "    Check your network connection.\n" +
                "    If you are connected but behind a firewall," + navigator.appName +
                " check that " + navigator.appName + "has permission to access the Web.");

            this.accountRequest();
            this.progress()



        }


    }

    /**
     * The function  menuList fetches list  items from the  Endpoint on TheMovieDB
     * @param event
     */
    menuList(event){

        let menuList=event.target;
        let borderBottom="border-bottom: 6px solid  crimson";
        let menu=document.querySelectorAll('.menu_list');

        menu.forEach(function (value) {
            value.style.cssText="background: none; border-bottom:none;";

        }) ;


        if( menuList.textContent==="Favorites" && event.type==="click"){
            menuList.style.cssText=borderBottom;
            this.progress();
            this.favorites()




        }else if( menuList.textContent==="Lists"){
            menuList.style.cssText=borderBottom;
            this.lists();



        }else if( menuList.textContent==="Watch-Later"){
            menuList.style.cssText=borderBottom;
            this.watchList();



        }else if( menuList.textContent==="Likes"){
            menuList.style.cssText=borderBottom;


        }


        event.preventDefault();

    }
    /**
     * The function  watchList fetches list  items from the  Endpoint on TheMovieDB
     *
     */
    watchList(){

        let control=this.control;
        if(![""," ",undefined].includes(this.state.account) && window.navigator.onLine){

            let account=JSON.parse(this.state.account).id;
            let session_id="session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=created_at.asc&page=1";
            let apiKey="a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&";


            control.setXHRequest("GET", "/account/"+account+"/watchlist/movies?api_key=",apiKey+session_id,false);
            control.updateView();
            this.progress();
            this.view.setIsFavorite(false);
            this.view.setIsWatchList(true);
            this.view.setIsList(false);
            this.view.setIsSearch(false);


        }else {


            alert("Hmm. We’re having trouble finding that Query.\n" +
                "\n" +
                "We can’t connect to the server at " + navigator.appName +
                "\n" +
                "If that address is correct, here are three other things you can try:\n" +
                "\n" +
                "    Try again later.\n" +
                "    Try refreshing the browser.\n" +
                "    Check your network connection.\n" +
                "    If you are connected but behind a firewall," + navigator.appName +
                " check that " + navigator.appName + "has permission to access the Web.");

            this.accountRequest();
            this.progress()



        }

    }
    /**
     * The function  favorites fetches favorite  items from the  Endpoint on TheMovieDB
     *
     */
    favorites() {


        let control=this.control;

        if(![""," ",undefined].includes(this.state.account) && window.navigator.onLine){

            let account="/account/"+JSON.parse(this.state.account).id+"/";
            let session_id="968092a83b4016a49c3ddde1cc030d149fc6ba0b";
            let apiKey="&api_key=a8ac0ce418f28d6ec56424ebad76ed12";

            this.view.setIsFavorite(true);
            this.view.setIsWatchList(false);
            this.view.setIsList(false);
            this.view.setIsSearch(false);
            control.setXHRequest("GET", account+"favorite/movies?page=1&sort_by=created_at.desc&language=en-US&session_id="+session_id,apiKey,false);
            control.updateView();
            this.progress()


        }else {


            alert("Hmm. We’re having trouble finding that Query.\n" +
                "\n" +
                "We can’t connect to the server at " + navigator.appName +
                "\n" +
                "If that address is correct, here are three other things you can try:\n" +
                "\n" +
                "    Try again later.\n" +
                "    Try refreshing the browser.\n" +
                "    Check your network connection.\n" +
                "    If you are connected but behind a firewall," + navigator.appName +
                " check that " + navigator.appName + "has permission to access the Web.");

            this.accountRequest();
            this.progress()



        }
    }



    /**
     * The function progress indicate the progress of the XMLHTTP-request
     *
     */
    progress(){
        let color=0;
        let  timer=setInterval(function () {
            let loading=document.getElementById("loading");
            color++;
            if(color<=100){


                loading.style.background="rgba(100%,"+color+color+"%,1%,2.8)";


            }


            if(color===100){
                clearInterval(timer)

            }

        },1000);

    }

    /**
     * The function render is inherit from React that render HTML elements
     *
     */
    render() {
        return (< div   id="menus_list">
            <span id="favorite-menu"  onTouchStart={this.menuList} onClick={this.menuList} className="menu_list">Favorites</span>
            <span className="menu_list"  onTouchStart={this.menuList} onClick={this.menuList}>Lists</span>
            <span  className="menu_list" onTouchStart={this.menuList} onClick={this.menuList}>Watch-Later</span>

            <div id="search_box">
                <div className="search_box" placeholder="Search...">

                    <input type="search"  ref="search_text_field" placeholder="Search.." onKeyUp={this.search}   id="search_text_field"/>
                    <span id="progress"><span id="loading"> </span></span>
                    <span id="prev_index" onTouchStart={this.prev} onClick={this.prev} className="nav"> </span>
                    <span id="next_index" onClick={this.next} onTouchStart={this.next} className="nav"> </span> <span id='search_glass'  onClick={this.updateSearch} onTouchStart={this.updateSearch} >
                <span  className="search-glass"  onClick={this.updateSearch} onTouchStart={this.updateSearch}> </span></span>

                </div>



            </div>

        </div>);
    }



}

/**
 * Footer class that holds  elements
 * @function {render}
 *
 */
class Footer extends React.Component{

    render() {
        return   (<footer id="footer"> Dan Technologies © Inc {new Date().getFullYear()} </footer>);
    }
}




export default MovieVegasApp;
