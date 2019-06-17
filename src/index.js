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


        //let element = React.createElement("div",null,this.control.updateView());

        return  (<div>    <MenuBar/>{<div ><div id="results" ref ="results">{this.control.updateView()}</div></div>}<Footer/></div>)
       // return  (<div><MenuBar/><Footer/>{<div>{this.control.updateView()}</div>}</div>)

    }



}


class MenuBar extends React.Component{

    render() {
        return (<div>


            <div id="heading_background">
                <Menu/>
               <span id="company_name">MOVIE<span className="logo"> </span>VEGAS</span> <MenuItems/><SearchBar/>



            </div>

        </div>);
    }

}
class SearchBar extends React.Component{


    constructor(){
        super() ;
        this.state={
            query:"",
            value:'',
            count:1
        };
        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);
        this.updateNext=this.updateNext.bind(this);
        this.updatePrev= this.updatePrev.bind(this);
        this.updateSearch= this.updateSearch.bind(this);
        this.search=this.search.bind(this);






    }


    search(event) {

        if(event.target.value !==undefined){

            this.setState({query:event.target.value,});
            let query="/search/movie?include_adult=false&page=1&query="+event.target.value+"&language=en-US";
            let key="a8ac0ce418f28d6ec56424ebad76ed12";
            this.control.setXHRequest("GET",query,key,false);



                this.control.updateView ();
        }




    }

    updateNext() {


        if(this.state.query  !==undefined && this.state.count>0){
            console.log("next " +this.state.count);


            this.setState({count:++this.state.count,});
            this.control.setCounter(this.state.count);
            console.log("next " +this.state.count);

            let query="/search/movie?include_adult=false&page="+this.state.count+"&query="+this.state.query+"&language=en-US";
            this.control.setXHRequest("GET",query,"a8ac0ce418f28d6ec56424ebad76ed12",false);
            this.control.updateView ();

        }



    }

    updateSearch() {


        if(![""," ",undefined].includes(this.state.query)){

            let query="/search/movie?include_adult=false&page=1&query="+this.state.query +"&language=en-US";
            let key="a8ac0ce418f28d6ec56424ebad76ed12";
            this.control.setXHRequest("GET",query,key,false);
            this.control.updateView ();
        }else {

            let query="/search/movie?include_adult=false&page=1&query=hshjdfjhsdjhfjhsdjhfjskdjf&language=en-US";
            let key="a8ac0ce418f28d6ec56424ebad76ed12";
            this.control.setXHRequest("GET",query,key,false);
            this.control.updateView ();
        }




    }

    updatePrev() {



        if(this.state.query !==undefined && this.state.count >=1){


            this.setState({count:--this.state.count,});
            this.control.setCounter(this.state.count);
            let query="/search/movie?include_adult=false&page="+this.state.count+"&query="+this.state.query+"&language=en-US";
            this.control.setXHRequest("GET",query,"a8ac0ce418f28d6ec56424ebad76ed12",false);
            this.control.updateView ();
            if([-1,0].includes(this.state.count)){
                this.setState({count:++this.state.count,});
            }
            console.log("prev " +this.state.count);
        }



    }



    render() {
        return (<div id="search_box">
            <div className="search_box" placeholder="Search...">

                <input type="search"  ref="search_text_field" placeholder="Search.." onKeyUp={this.search}   id="search_text_field"/>
                <span id="progress"><span id="loading"> </span></span>
                <span id="prev" onTouchStart={this.updatePrev} onClick={this.updatePrev} className="nav"> </span>
                <span id="next" onClick={this.updateNext} onTouchStart={this.updateNext} className="nav"> </span> <span id='search_glass'  onClick={this. updateSearch} onTouchStart={this.updateSearch} >
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
            color:""
        };
        this.model=new Model();
        this.view=new View();
        this.control=new Control(this.view,this.model);
        this.menuList=this.menuList.bind(this);
        this.favorites=this.favorites.bind(this);
        this.lists=this.lists.bind(this);
        this.watchLater=this.watchLater.bind(this);
        this.likes=this.likes.bind(this);
        this.accountRequest=this.accountRequest.bind(this);


    }
    componentDidMount() {

        this.accountRequest();
    }

    accountRequest(){
        let control=this.control;
        let model=control.model.services;
        let key="a8ac0ce418f28d6ec56424ebad76ed12&";
        let session_id="968092a83b4016a49c3ddde1cc030d149fc6ba0b";
        let favorites=document.querySelector("#favorite-menu");


        control.setXHRequest("GET", "/account?session_id="+session_id ,key,false);
        control.setIsXhrInProgress(true);

        let xhr=model.getXHR();
        let data = "{}";
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
   lists(event){

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



             }else if( menuList.textContent==="WatchLater"){
                  menuList.style.cssText=borderBottom;


             }else if( menuList.textContent==="Likes"){
                 menuList.style.cssText=borderBottom;


             }




    }
    likes(event){

    }
    favorites() {


        let control=this.control;

        if(![""," ",undefined].includes(this.state.account) && window.navigator.onLine){

        let account="/account/"+JSON.parse(this.state.account).id+"/";
        let session_id="968092a83b4016a49c3ddde1cc030d149fc6ba0b";
        let apiKey="a8ac0ce418f28d6ec56424ebad76ed12";


        control.setXHRequest("GET", account+"favorite/movies?page=1&sort_by=created_at.asc&language=en-US&session_id="+session_id,apiKey,false);
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


    watchLater(event){

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
            <span  className="menu_list" onTouchStart={this.menuList} onClick={this.menuList}>WatchLater</span>
            <span className="menu_list"  onTouchStart={this.menuList} onClick={this.menuList}>Likes</span>
        </div>);
    }



}
class Footer extends React.Component{

    render() {
        return   (<footer id="footer"> Dan Technologies © Inc {new Date().getFullYear()} </footer>);
    }
}


 ReactDom.render(<Main/>,document.getElementById("root"));







