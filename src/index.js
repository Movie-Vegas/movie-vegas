import Control from "./control";
import Model from "./model";
import View from "./view";
import icon from './icon.GIF';
import movie_vegas from "./movie_vegas.css"
import React from "react";
import ReactDom from "react-dom"
import search_glass from "./search_glass.png";




class Main extends React.Component{



    /**
     *
     * @type {Model}
     */


    componentWillMount() {
        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);


    }



    render() {



        return  (<div>    <MenuBar/>{<div ><div id="results" ref ="results">{this.control.updateView()}</div></div>}<Footer/></div>)


    }



}


class MenuBar extends React.Component{

    render() {
        return (<div>


            <div id="menubar">
                <Menu/>
               <span id="company_name">MOVIE<span className="logo"> </span>VEGAS</span> <MenuItems/><SearchBar/>



            </div>

        </div>);
    }

}
class SearchBar extends React.Component{


    constructor(prop){
        super(prop) ;
        this.state={
            query:"",
            value:'',
            count:1
        };
        this.model=new Model();
        this.view=new View(prop);
        this.control=new Control(this.view,this.model);
        this.next=this.next.bind(this);
        this.prev= this.prev.bind(this);
        this.updateSearch= this.updateSearch.bind(this);
        this.search=this.search.bind(this);






    }


    search(event) {
        this.setState({query:event.target.value});
        if(event.target.value !==undefined){

            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page=1&query="+event.target.value+"&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();
            this.setState({query:event.target.value});
        }


        event.preventDefault();


    }



    updateSearch(event) {


        if(![""," ",undefined].includes(this.state.query)){

            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page="+this.state.count+"&query="+this.state.query+"&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();

        }else {


            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page=1&query=hshjdfjhsdjhfjhsdjhfjskdjf&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();

        }


           event.preventDefault();
           event.stopPropagation();

    }

    next(event) {




        if(this.state.query  !==undefined && this.state.count>0){


            if(this.state.count>=0 ){



                if(this.state.count>this.view.getTotalPages()){

                    this.setState({count:--this.state.count});
                }else {

                    this.setState({count:++this.state.count});
                }



            }
            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page="+
                this.state.count+"&query="+this.state.query +"&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();


        }
        event.preventDefault();

    }
    prev(event) {



        if(this.state.query  !==undefined && this.state.count>0){


            if(this.state.count>1){

                this.setState({count:--this.state.count});





            }
            let url="/search/movie?";
            let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&include_adult=false&page="+this.state.count+"&query="+this.state.query+"&event.target.value&language=en-US";
            this.control.setXHRequest("GET",url,key,false);
            this.control.updateView ();







        }




        event.preventDefault();

    }



    render() {
        return (<div id="search_box">
            <div className="search_box" placeholder="Search...">

                <input type="search"  ref="search_text_field" placeholder="Search.." onKeyUp={this.search}   id="search_text_field"/>
                <span id="progress"><span id="loading"> </span></span>
                <span id="prev" onTouchStart={this.prev} onClick={this.prev} className="nav"> </span>
                <span id="next" onClick={this.next} onTouchStart={this.next} className="nav"> </span> <span id='search_glass'  onClick={this.updateSearch} onTouchStart={this.updateSearch} >
                <span  className="search-glass"  onClick={this.updateSearch} onTouchStart={this.updateSearch}> </span></span>

            </div>



        </div>);
    }

}
class Menu extends React.Component{

    render() {
        return (  <div id="menu">
                <span id="accents"> </span>
               </div>
        );
    }
}

class MenuItems extends React.Component{




    constructor(){
        super();

        this.state={
            account:"",
            color:"",
            count:1,
        };
        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);
        this.menuList=this.menuList.bind(this);
        this.favorites=this.favorites.bind(this);
        this.lists=this.lists.bind(this);
        this.watchList=this.watchList.bind(this);
        this.accountRequest=this.accountRequest.bind(this);


    }
    componentDidMount() {

        this.accountRequest();
    }

    accountRequest(){
        let control=this.control;
        let model=control.model;
        let key="&api_key=a8ac0ce418f28d6ec56424ebad76ed12&";
        let session_id="968092a83b4016a49c3ddde1cc030d149fc6ba0b";
        let favorites=document.querySelector("#favorite-menu");


        control.setXHRequest("GET", "/account?session_id="+session_id ,key,false);
        control.setIsXhrInProgress(true);

        let xhr=model.getXHR();
        let data = JSON.stringify("{}");
        let state=this.state;
        let isProgress=false;

        xhr.addEventListener("readystatechange", function () {

            if (this.readyState === 4 && [200,201,202.203].includes(this.status) && window.navigator.onLine) {

                control.setAccount(this.responseText);
                state.account=this.responseText;
                favorites.click();





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
    lists(){
        let control=this.control;
        let model=control.model;

        let key="api_key=a8ac0ce418f28d6ec56424ebad76ed12&sort_by=created_at.desc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&page="+1+"";





        if(![""," ",undefined].includes(this.state.account) && window.navigator.onLine){


             control.setXHRequest("GET", "/account/8408193/lists?api_key=a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&page=1","",false);
             control.updateView();

            this.view.setIsFavorite(false);
            this.view.setIsWatchList(false);
            this.view.setIsList(true);



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


    menuList(event){

        let menuList=event.target;
        let borderBottom="border-bottom: 6px solid  crimson";
        let menu=document.querySelectorAll('.menu_list');

              menu.forEach(function (value, index, array) {
                  value.style.cssText="background: none; border-bottom:none;";

              }) ;


             if( menuList.textContent==="Favorites" && event.type==="click"){
                 menuList.style.cssText=borderBottom;
                 this.progress();
                 this.favorites()




             }else if( menuList.textContent==="Lists"){
                 menuList.style.cssText=borderBottom;
                 this.lists();



             }else if( menuList.textContent==="Watch-List"){
                  menuList.style.cssText=borderBottom;
                  this.  watchList();


             }else if( menuList.textContent==="Likes"){
                 menuList.style.cssText=borderBottom;


             }


             event.preventDefault();

    }
    watchList(){

        let control=this.control;
        if(![""," ",undefined].includes(this.state.account) && window.navigator.onLine){

            let account=JSON.parse(this.state.account).id;
            let session_id="session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=created_at.asc&page="+this.state.count;
            let apiKey="a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&";

            this.view.setIsFavorite(false);
            this.view.setIsWatchList(true);
            this.view.setIsList(false);
            control.setXHRequest("GET", "/account/"+account+"/watchlist/movies?api_key=",apiKey+session_id,false);
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
    favorites() {


        let control=this.control;

        if(![""," ",undefined].includes(this.state.account) && window.navigator.onLine){

        let account="/account/"+JSON.parse(this.state.account).id+"/";
        let session_id="968092a83b4016a49c3ddde1cc030d149fc6ba0b";
        let apiKey="&api_key=a8ac0ce418f28d6ec56424ebad76ed12";

            this.view.setIsFavorite(true);
            this.view.setIsWatchList(false);
            this.view.setIsList(false);
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

        },50);

    }


    render() {
        return (< div   id="menus_list">
            <span id="favorite-menu"  onTouchStart={this.menuList} onClick={this.menuList} className="menu_list">Favorites</span>
            <span className="menu_list"  onTouchStart={this.menuList} onClick={this.menuList}>Lists</span>
            <span  className="menu_list" onTouchStart={this.menuList} onClick={this.menuList}>Watch-List</span>

        </div>);
    }



}
class Footer extends React.Component{

    render() {
        return   (<footer id="footer"> Dan Technologies © Inc {new Date().getFullYear()} </footer>);
    }
}


 ReactDom.render(<Main/>,document.getElementById("root"));







