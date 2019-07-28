import React from "react";
import ReactDOM from "react-dom";


/**The CORS request was attempted with the credentials flag set, but the server is configured using the wildcard ("*")
 * as the value of Access-Control-Allow-Origin, which doesn't allow the use of credentials.

 To correct this problem, simply ensure that the xhr with-credentials flag's value is set false when issuing your CORS request.
 **/

class View  extends React.Component{


    /**
     * View for Movie-vegas
     * declare class variables/attributes as private (local var and Accessor as a object literal);
     * @
     */



    /**
     * The Control constructor used to instantiate View and Model
     *
     */

    constructor(props) {
        super(props);

        this.state={
            query:"",
            value:'',
            url: "",
            page:0,
            count:1,

        };
        this.temp = {
            count: 1,
        };
        this.listId=[];
        this.favoriteDetails=[];
        this.ratingResults=[];
        this.watchLaterResults=[];
        this.listResults=[];


    }


    /**
     * The function setIsLoaded is used to check if the request process has finished loading
     * @param flag
     */
    setIsLoaded(flag){
        this.loaded=flag;
    }

    /**
     *
     * @returns {*}
     */
    getIsLoaded(){
        return this.loaded;
    }


    /**
     * The function setIsSearch is used to check if the the in coming request is search
     * @param flag
     */
    setIsSearch(flag){
        this.search=flag;
    }


    /**
     * The function readyModeWatchLater makes list of movies ready for later use
     * @param classInst
     */
    readyModeWatchLater(classInst) {
        let count = 1;
        let url = "https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
            "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort" +
            "_by=created_at.asc&page=1";

        fetch(url, {
            method: 'GET',

        }).then(function (response) {

            return response.json();

            // extract token from JSON response
            // return token
        }).then(function (token) {
            // endpoint where file will be uploaded

            let results = token.total_pages;
            classInst.setPages(results);
            classInst.setWatchLaterResults(count, token.results);

            // file that has been selected in the form

            for (let x = 2; x <= results; x++) {


                fetch("https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
                    "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort" +
                    "_by=created_at.asc&page=" + x, {
                    method: 'GET',

                }).then(function (response) {
                    return response.json();

                }).then(function (token) {


                    classInst.setWatchLaterResults(x, token.results);


                });


            }


        }).catch(function (error) {
            console.log(error)
            // handle error
        });


    }

    /**
     * The function readyModeFavorite makes list of movies ready for later use
     * @param classInst
     */
    readyModeFavorite(classInst) {

        let count = 1;

        let url = "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite/movies?page=1&sort_by=" +
            "created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=" +
            "a8ac0ce418f28d6ec56424ebad76ed12";


        fetch(url, {
            method: 'GET',

        }).then(function (response) {

            return response.json();

            // extract token from JSON response
            // return token
        }).then(function (token) {
            // endpoint where file will be uploaded

            let results = token.total_pages;
            classInst.setPages(results);
            classInst.setFavoriteResults(count, token.results);

            // file that has been selected in the form

            for (let x = 2; x <= results; x++) {


                fetch("https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite/movies?page=" + x + "&sort_by=" +
                    "created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=" +
                    "a8ac0ce418f28d6ec56424ebad76ed12", {
                    method: 'GET',

                }).then(function (response) {
                    return response.json();
                }).then(function (token) {


                    classInst.setFavoriteResults(x, token.results);


                });


            }

        }).catch(function (error) {
            console.log(error)
            // handle error
        });

    }

    /**
     * The function readyModeListResults makes list of movies ready for later use
     * @param classInst
     */
    readyModeListResults(classInst) {

        let count=1;

        let url="https://api.themoviedb.org/3/account/a8ac0ce418f28d6ec56424ebad76ed12/lists?api_key=" +
            "a8ac0ce418f28d6ec56424ebad76ed12&sort_by=created_at.desc&language=en-US&session_id=" +
            "968092a83b4016a49c3ddde1cc030d149fc6ba0b&page=1";


        fetch(url, {
            method: 'GET',

        }).then(function(response){

            return response.json();


        }).then(function(token) {
            let results=token.total_pages;
            classInst.setListResults(count, token.results);
            classInst.setPages(results);


            for (let x = 2; x <= results; x++)


                fetch("https://api.themoviedb.org/3/account/a8ac0ce418f28d6ec56424ebad76ed12/lists?api_key=" +
                    "a8ac0ce418f28d6ec56424ebad76ed12&sort_by=created_at.desc&language=en-US&session_id=" +
                    "968092a83b4016a49c3ddde1cc030d149fc6ba0b&page="+x,{
                    method: 'GET',

                }).then(function (response) {
                    return response.json();
                }).then(function (token) {


                    classInst.setListResults(x, token.results);






                });


        }).catch(function(error) {
            console.log(error)
            // handle error
        });

    }

    /**
     * The function readyModeRatings  makes list of rating ready for later use
     * @param classInst
     */
    readyModeRatings(classInst) {


        let count = 1;

        let url = "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/rated/movies?api_key=" +
            "a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=" +
            "created_at.desc&page=1&append_to_response=content_ratings";


        fetch(url, {
            method: 'GET',

        }).then(function (response) {

            return response.json();


        }).then(function (token) {


            let results = token.total_pages;

            classInst.setRatingResults(count, token.results);
            classInst.setPages(results);


            for (let x = 2; x <= results; x++) {


                fetch("https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/rated/movies?" +
                    "api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by" +
                    "=created_at.desc&page=" + x + "&append_to_response=content_ratings", {
                    method: 'GET',

                }).then(function (response) {
                    return response.json();
                }).then(function (token) {

                    classInst.setRatingResults(x, token.results);


                });

            }


        }).catch(function (error) {
            console.log(error)
            // handle error
        });


    }

    /**
     * The function addMovie adds movies to the endpoint
     * @param xhr
     * @param element
     * @param page
     * @param response
     * @param title
     */
    addMovie(xhr, element, page, response, title) {


        let classInstance=this;
        let createContentConfirm = document.querySelector("#create_content_confirm");
        let listed = document.querySelector("#created_list");
        let data = JSON.stringify({});

        let resultsId = "";
        xhr = new XMLHttpRequest();
        xhr.withCredentials=false;
        let isResult=false;

        if(![""," ",undefined].includes(listed.value)){

            xhr.addEventListener("readystatechange", function () {

                if (xhr.readyState === xhr.DONE && [200, 201, 202].includes(xhr.status)) {


                    let results = JSON.parse(xhr.responseText).results;
                    classInstance.setPages(JSON.parse(this.responseText).total_pages);
                    let media = JSON.stringify({
                        "media_id": response,
                    });
                    classInstance.setPages(JSON.parse(this.responseText).total_pages);

                    results.forEach(function (results) {


                        let createdList = document.querySelector("#created_list" );

                        if (results.name === createdList.value) {

                            isResult = true;
                            resultsId = results.id;

                            return false;

                        }


                    });
                    if (isResult) {


                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;



                        xhr.addEventListener("readystatechange", function () {

                            if (xhr.readyState === 4 && [200,201,202.203].includes(xhr.status) ){


                                classInstance.listMessage(createContentConfirm ,"The movie "+title.value+" was created successfully");

                            }

                            if ([400,401,402,403,404].includes(xhr.status) ){

                                classInstance.listMessage(createContentConfirm ,"The movie "+title.value+" already in the list");
                            }

                        });

                        xhr.open("POST", "https://api.themoviedb.org/3/list/" + resultsId + "/add_item?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b", true);
                        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                        xhr.send(media);


                    }


                }

                if ([400,401,402,403.404].includes(this.status) ){


                    classInstance.listMessage(createContentConfirm ,"The movie "+title.value+" already in the list");
                }

            });
            xhr.open("GET", "https://api.themoviedb.org/3/account/a8ac0ce418f28d6ec56424ebad76ed12/lists?api_key=" +
                "a8ac0ce418f28d6ec56424ebad76ed12&sort_by=created_at.desc&language=en-US&session_id=" +
                "968092a83b4016a49c3ddde1cc030d149fc6ba0b&page=" + classInstance.temp.count, true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
            xhr.responseType="text";

            xhr.send(data);


        }else {

            classInstance.listMessage(createContentConfirm ,"Select a list to add movie or create new list ");
        }


    }

    /**
     *  The function watchTrailer allows you to watch trailer
     * @param xhr
     * @param index
     * @param element
     * @param movieId
     */
    watchTrailer(xhr, index, element, movieId) {


        let data = JSON.stringify({});

        xhr = new XMLHttpRequest();
        xhr.withCredentials=false;

        let name=document.querySelector("#movie_title_iframe");

        xhr.addEventListener("readystatechange", function () {

            if (xhr.readyState === xhr.DONE && [200,201,203].includes(xhr.status)) {

                let results=JSON.parse(xhr.responseText).results;

                let selectedListContent = document.querySelectorAll(".create_list" );
                selectedListContent[0].style.display="none";

                element.forEach(function (el) {


                    if(![undefined].includes(results)){
                        if(results.length===0){
                            name.textContent="An error occurred. Please try again later";
                            el.src="https://www.youtube.com/embed/"+movieId+"?controls=1&autoplay=1";

                            return false;
                        }

                        results.forEach(function (val) {

                            name.textContent=val.name.substr(0,34);
                            if(val.hasOwnProperty('key')){
                                el.src="https://www.youtube.com/embed/"+val.key+"?controls=1&autoplay=1";


                            }
                            return false;
                        })

                    }


                });


            }

        });



        xhr.open("GET", "http://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key=a8ac0ce418f28d6ec56424ebad76ed12&append_to_response=videos",true);
        xhr.responseType="text";

        xhr.send(data);


    }

    /**
     *  The function favorite adds  favorite movies to the endpoint
     * @param xhr
     * @param movieId
     * @param index
     * @param flag
     * @param element
     * @param classInstance
     */
    makeFavorite(xhr, movieId, index, flag, element, classInstance) {

        let count = 0;
        if(![" ","",null,undefined].includes(movieId.id)){


            let data = JSON.stringify({
                "media_type": "movie",
                "media_id": movieId.id,
                "favorite": flag
            });


            xhr = new XMLHttpRequest();
            xhr.withCredentials=false;
            xhr.addEventListener("readystatechange", function () {



                if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                    let message=JSON.parse(xhr.responseText);
                    classInstance.confirmation(index, message.status_message);
                    element.innerHTML = '&times;';
                    element.style.background="#a32897";
                    element.style.color="white";
                    element.title = "Remove favorite";
                    let timer = setInterval(function () {
                        ++count;
                        if (count > 0) {
                            classInstance.readyModeFavorite(classInstance);
                            clearInterval(timer)
                        }
                    }, 1000);


                }

            });


            xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12",true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

            xhr.send(data);

        }


    }

    /**
     *  The function deleteFavorite deletes movie from the endpoint
     * @param xhr
     * @param response
     * @param element
     * @param classInstance
     * @param index
     * @param totalPages
     */

    deleteFavorite(xhr, response, element, classInstance, index, totalPages) {
        let data = JSON.stringify({
            "media_type": "movie",
            "media_id": response.id,
            "favorite": false
        });

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {


            if (xhr.readyState === xhr.DONE && [200, 201, 202].includes(xhr.status)) {

                let message = JSON.parse(xhr.responseText);
                classInstance.confirmation(index, message.status_message);
                classInstance.readyModeFavorite(classInstance);


                element.innerHTML = '&heartsuit;';
                element.style.background = "gold";
                element.style.color = "black";
                element.title = "Remove favorite";

                JSON.parse(data, function (key, value) {
                    if (value === false && classInstance.getIsFavorite()) {
                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;


                        xhr.open("GET", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/favorite/movies?page=" + totalPages + "&sort_by=" +
                            "created_at.asc&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=" +
                            "a8ac0ce418f28d6ec56424ebad76ed12", true);
                        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                        classInstance.renderMovieDetails(xhr, {});

                    }

                })


            }



        });
        xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/" +
            "favorite?session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce" +
            "418f28d6ec56424ebad76ed12", true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

        xhr.send(data);

    }

    /**
     *   The function getFavorite allows you get movies from the endpoint
     * @param xhr
     * @param response
     * @param index
     * @param element
     * @param event
     * @param classInstance
     * @returns {boolean}
     */
    getFavorite(xhr, response, index, element, event, classInstance) {


        let movieCount = document.querySelector("#movie_count");
        let results = classInstance.getFavoriteResults();
        let isResults = true;

        if (![undefined, 0].includes(results.length)) {


            for (let x = 1; x < results.length; x++) {

                if (![undefined].includes(results[x])) {

                    if (results[x].hasOwnProperty('0')) {

                        if (event.type === "mouseleave") {
                            element.innerHTML = '&heartsuit;';
                            element.title = "Favorite"
                        }

                        for (let result of results[x]) {


                            if (result.hasOwnProperty("id")) {

                                if (![undefined].includes(result.id)) {


                                    if (result.id === response.id) {
                                        isResults = false;

                                        if (event.type === "click") {


                                            classInstance.deleteFavorite(xhr, response, element, classInstance, index, x);


                                            event.stopImmediatePropagation();
                                            event.preventDefault();
                                            event.stopPropagation();


                                        }


                                        if (event.type === "mouseleave") {


                                            element.innerHTML = '&heartsuit;';
                                            element.style.background = "gold";
                                            element.style.color = "black";
                                            element.title = "Remove favorite";

                                            return false;
                                        }
                                        if (event.type === "mouseover") {

                                            classInstance.confirmation(index, "Remove favorite");

                                            element.innerHTML = '&times';
                                            element.style.background = "gold";
                                            element.style.color = "gray";
                                            element.title = "Remove favorite";

                                            return false;
                                        }

                                        return false;

                                    }


                                }


                            }


                        }


                    }

                }


            }

        }else {

            let items = document.querySelectorAll('.item');

            items.forEach(function (v, k) {
                if (k === index) {


                    isResults = true;

                    return false;
                }
            });





        }
        if(isResults){



            let items = document.querySelectorAll('.item');
            items.forEach(function (v, k) {

                if (k === index) {


                    classInstance.confirmation(index, "Make rating");

                    if (event.type === "click") {

                        movieCount.textContent = "" + Number(movieCount.textContent) - 1;

                        classInstance.makeFavorite(xhr, response, index, true, element, classInstance);

                        return false;

                    }
                }
            })
        }



    }

    /**
     * The function deleteRating delete rating from the endpoint
     * @param xhr
     * @param index
     * @param response
     * @param event
     * @param element
     * @param classInstance
     */
    deleteRating(xhr, index, response, event, element, classInstance) {


        let count = 0;
        let movie_count = document.querySelector("#movie_count");


        if (["mouseenter", "click"].includes(event.type)) {


            if (event.type === "click") {


                let data = JSON.stringify({});
                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;

                xhr.addEventListener("readystatechange", function () {
                    if (xhr.readyState === xhr.DONE && [200, 201, 202].includes(xhr.status)) {


                        movie_count.textContent = "" + Number(movie_count.textContent) - 1;
                        element.innerHTML = '&star;';
                        element.title = "Rating";


                        let message = JSON.parse(xhr.responseText);
                        classInstance.confirmation(index, message.status_message);


                        let timer = setInterval(function () {
                            ++count;
                            if (count > 1) {
                                classInstance.readyModeRatings(classInstance);
                                clearInterval(timer)
                            }
                        }, 1000);


                        return false;

                    }

                });

                xhr.open("DELETE", "https://api.themoviedb.org/3/movie/" + response + "/rating?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b", true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

                xhr.send(data);


            }


        }






    }

    /**
     *  The function getRating get rating from the endpoint
     * @param xhr
     * @param response
     * @param index
     * @param element
     * @param event
     * @param value
     * @param isMakeRating
     * @param classInstance
     */
    getRating(xhr, response, index, element, event, value, isMakeRating, classInstance) {

        let isResults = true;


        let results = classInstance.getRatingResult();


        if (![undefined, 0].includes(results.length)) {


            for (let x = 0; x < results.length; x++) {

                if (![undefined].includes(results[x])) {

                    if (results[x].hasOwnProperty('0')) {

                        if (event.type === "mouseleave") {

                            element.innerHTML = '&star;';
                            element.title = "Rating"
                        }


                        if (["mouseover", "click"].includes(event.type))

                            for (let result of results[x]) {


                                if (result.hasOwnProperty("id")) {

                                    if (![undefined].includes(result.id)) {

                                        if (result.id === response && isMakeRating) {

                                            classInstance.confirmation(index, "Remove rating " + result.rating);
                                            element.innerHTML = '&times';
                                            element.style.background = "gold";
                                            element.style.color = "gray";
                                            element.title = "Remove rating";

                                            isResults = false;

                                            if (event.type === "click") {


                                                classInstance.deleteRating(xhr, index, response, event, element, classInstance);
                                                isMakeRating = false;


                                            }

                                            break;


                                        }


                                    }


                                }


                            }


                    }

                }



            }

        } else {

            let items = document.querySelectorAll('.item');

            element.innerHTML = '&star;';
            element.style.background = "gold";
            element.style.color = "black";
            element.title = "Remove rating";
            items.forEach(function (v, k) {
                if (k === index) {


                    isResults = true;

                    return false;
                }
            });


        }

        if (isResults) {


            let items = document.querySelectorAll('.item');
            items.forEach(function (v, k) {

                if (k === index) {


                    element.innerHTML = '&star;';
                    element.style.background = "gold";
                    element.style.color = "black";
                    element.title = "make rating";
                    if (event.type === "mouseover") {
                        classInstance.confirmation(index, "Make rating");

                    }

                    if (event.type === "click") {


                        isMakeRating = true;
                        classInstance.makeRating(xhr, response, k, value, element, classInstance);
                        isResults = false;
                        return false;

                    }
                }
            })
        }


    }

    /**
     *  The function makeRating adds ratings to the endpoint
     * @param xhr
     * @param movieId
     * @param index
     * @param value
     * @param element
     * @param classInstance
     */
    makeRating(xhr, movieId, index, value, element, classInstance) {
        let count = 0;
        if (![" ", "", null, undefined].includes(movieId)) {



            let data = JSON.stringify({
                "value": value,
            });

            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.addEventListener("readystatechange", function () {


                classInstance.getRating(xhr, movieId, index, element, "", "", true, classInstance);
                if (xhr.readyState === xhr.DONE && [201].includes(xhr.status)) {

                    let message = JSON.parse(xhr.responseText);


                    let timer = setInterval(function () {
                        ++count;
                        if (count > 1) {
                            classInstance.readyModeRatings(classInstance);
                            clearInterval(timer)
                        }
                    }, 1000);



                    classInstance.confirmation(index, message.status_message);


                }


            });


            xhr.open("POST", "https://api.themoviedb.org/3/movie/" + movieId + "/rating?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b", true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

            xhr.send(data);


        }


    }

    /**
     * The function makeWatchLater adds movies to the endpoint to be watch later
     * @param xhr
     * @param movieId
     * @param index
     * @param flag
     * @param element
     * @param classInstance
     */
    makeWatchLater(xhr, movieId, index, flag, element, classInstance) {


        if(![" ","",null,undefined].includes(movieId)){


            let data = JSON.stringify({
                "media_type": "movie",
                "media_id": movieId,
                "watchlist": flag
            });


            xhr = new XMLHttpRequest();
            xhr.withCredentials=false;
            xhr.addEventListener("readystatechange", function () {



                if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)) {

                    let message=JSON.parse(xhr.responseText);
                    classInstance.confirmation(index, message.status_message);

                    classInstance.readyModeWatchLater(classInstance);

                    element.innerHTML = '&times;';

                    element.style.color="white";
                    element.title = "Remove watch later";


                }

            });


            xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/" +
                "watchlist?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
            xhr.send(data);

        }


    }

    /**
     * The function deleteWatchLater delete watch later movies from the endpoint
     * @param xhr
     * @param response
     * @param element
     * @param index
     * @param classInstance
     */
    deleteWatchLater(xhr, response, element, index, classInstance) {
        let count = 0;
        let data = JSON.stringify({
            "media_type": "movie",
            "media_id": response,
            "watchlist": false
        });


        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {


            if (xhr.readyState === xhr.DONE && [200, 201, 202].includes(xhr.status)) {

                let message = JSON.parse(xhr.responseText);
                classInstance.confirmation(index, message.status_message);

                if (xhr.readyState === xhr.DONE) {
                    let timer = setInterval(function () {
                        ++count;
                        if (count > 1) {
                            classInstance.readyModeWatchLater(classInstance);
                            clearInterval(timer)
                        }
                    }, 1000);

                }


                JSON.parse(data, function (key, value) {


                    if (value === false && classInstance.getIsWatchList()) {

                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.open("GET", "https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
                            "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=" +
                            "968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=created_at.asc&page=" + classInstance.temp.count, true);
                        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                        classInstance.renderMovieDetails(xhr, {});

                        return false;
                    }

                })



            }

        });


        xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/watchlist?api_key" +
            "=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b", true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
        xhr.send(data);
    }

    /**
     * The function getWatchLater get movies from the endpoint
     * @param xhr
     * @param response
     * @param index
     * @param element
     * @param event
     * @param classInstance
     * @returns {boolean}
     */
    getWatchLater(xhr, response, index, element, event, classInstance) {

        let movieCount = document.querySelector("#movie_count");
        let results = classInstance.getWatchLaterResults();
        let isResults = true;


        if (![undefined, 0].includes(results.length)) {


            for (let x = 1; x < results.length; x++) {

                if (![undefined].includes(results[x])) {

                    if (results[x].hasOwnProperty('0')) {

                        if (event.type === "mouseleave") {
                            element.innerHTML = '&heartsuit;';
                            element.title = "Add to watch later"
                        }

                        for (let result of results[x]) {


                            if (result.hasOwnProperty("id")) {

                                if (![undefined].includes(result.id)) {


                                    if (result.id === response) {
                                        isResults = false;
                                        element.innerHTML = '&#x2b94;';
                                        element.style.background = "gold";
                                        element.style.color = "black";
                                        element.title = "Remove watch later";
                                        if (event.type === "click") {

                                            classInstance.deleteWatchLater(xhr, response, element, index, classInstance)
                                        }


                                        if(event.type==="mouseover"){

                                            classInstance.confirmation(index, "Remove from watch later");
                                            element.innerHTML = '&times;';

                                            element.style.color = "gray";
                                            element.title = "Remove watch later";

                                            return false;
                                        }

                                        if(event.type==="mouseleave"){


                                            element.innerHTML = '&#x2b94;';
                                            element.style.background="gold";
                                            element.style.color="black";
                                            element.title = "Remove watch later";

                                            return false;
                                        }

                                    }



                                }


                            }

                        }


                    }

                }



            }

        }else {



            let items = document.querySelectorAll('.item');

            items.forEach(function (v, k) {
                if(k===index){


                    isResults=true;

                    return false;
                }
            });


        }
        if(isResults){



            let items = document.querySelectorAll('.item');
            items.forEach(function (v, k) {

                if (k === index) {


                    element.innerHTML = '&#x2b94;';
                    element.title = "Make watch later";
                    classInstance.confirmation(index,"Make watch later");

                    if(event.type==="click"){

                        movieCount.textContent=""+Number( movieCount.textContent)-1;

                        classInstance.makeWatchLater(xhr,response,index,true,element,classInstance);

                        return false;

                    }
                }
            })
        }



    }


    /**
     *
     * @returns {Array}
     */
    getRatingResult() {
        return this.ratingResults;
    }

    /**
     *The function setRatingResults set request result
     * @param index
     * @param responseText
     */
    setRatingResults(index, responseText) {
        this.ratingResults[index]=responseText;
    }

    /**
     *The function setListResults set request result
     * @param index
     * @param listResults
     */
    setListResults(index, listResults) {
        this.listResults[index]=listResults;
    }

    /**
     *
     * @returns {Array}
     */
    getListResults(){
        return this.listResults;
    }

    /**
     *
     * @param favorite
     */
    setIsFavorite(favorite){
        this.favorite=favorite;
    }

    /**
     *
     * @returns {*}
     */
    getIsFavorite(){
        return this.favorite;
    }

    /**
     *The function setFavoriteResults set request result
     * @param index
     * @param favorites
     */
    setFavoriteResults(index, favorites) {
        this.favoriteDetails[index]=favorites;
    }

    /**
     *
     * @returns {Array}
     */
    getFavoriteResults(){
        return this.favoriteDetails;
    }

    /**
     * The function setWatchLater sets request result
     * @param index
     * @param watchLaterResults
     */
    setWatchLaterResults(index, watchLaterResults) {
        this.watchLaterResults[index]=watchLaterResults;
    }

    /**
     *
     * @returns {Array}
     */
    getWatchLaterResults(){
        return this.watchLaterResults;
    }

    /**
     *
     * @param list
     */
    setIsList(list){
        this.list=list;
    }

    /**
     *
     * @returns {*}
     */
    getIsList(){
        return this.list;
    }

    /**
     *
     * @param watchList
     */
    setIsWatchList(watchList){
        this.watchList=watchList;
    }

    /***
     *
     * @returns {*}
     */
    getIsWatchList(){
        return  this.watchList;
    }

    /**
     * The function confirmation confirms results
     * @param id
     * @param responseText
     */
    confirmation(id, responseText) {
        let element=document.querySelectorAll(".rating_content_confirm");


        let count = 0;
        if(![" ","",undefined,null].includes(element.item(id))){
            element.item(id).textContent=""+responseText;

            let timer = setInterval(function () {


                count++;
                if (count <= 1) {

                    element.item(id).style.display="block";

                }


                if (count === 2) {
                    clearInterval(timer);
                    element.item(id).style.display="none";

                }


            }, 1000);

        }
    }

    /**
     * The function getListItem get request result of list items
     *
     * @param createdList
     * @param classInstance
     */
    getListItem(createdList, classInstance) {

        let results=classInstance.getListResults();

        let count=0;
        let timer=setInterval(function () {

            ++count;
            if (count === 2) {
                clearInterval(timer);
            }


            if (![undefined, 0].includes(results.length)) {


                for (let x = 0; x <= results.length; x++) {

                    if (![undefined].includes(results[x])) {

                        createdList.innerHTML = " ";
                        if (results[x].hasOwnProperty(0)) {
                            results[x].forEach(function (results) {


                                createdList.innerHTML+="<option   class='listed'>"+results.name+"</option>";


                            })
                        }


                    }

                }


            }


        }, 1000);





    }

    /**
     *The function makeList add a list to the endpoint
     * @param xhr
     * @param name
     * @param description
     * @param utilities
     * @param element
     * @param publicList
     * @param sortedList
     */
    makeList(xhr, name, description, utilities, element, publicList, sortedList) {
        let count = 0;

        let data = JSON.stringify({
            "name": ""+name,
            "description": ""+description,
            "language": "en",
            "sorted_list":""+sortedList,
            "public_list":""+publicList,
        });


        let createContentConfirm = document.querySelector("#create_content_confirm");
        let createdList = document.querySelector("#created_list" );


        xhr = new XMLHttpRequest();
        xhr.withCredentials=false;
        utilities.readyModeListResults(utilities);
        xhr.addEventListener("readystatechange", function () {

            if (xhr.readyState === xhr.DONE) {


                let listed = document.querySelector("#created_list");
                let message = "Successfully created";

                utilities.listMessage(createContentConfirm, message);
                listed.setAttribute("selected", name);

                let timer = setInterval(function () {
                    ++count;
                    if (count > 1) {
                        utilities.readyModeListResults(utilities);
                        utilities.getListItem(createdList, utilities);
                        clearInterval(timer)
                    }
                }, 1000);


            }


        });




        xhr.open("POST","https://api.themoviedb.org/3/list?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=" +
            "968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
        xhr.send(data);



    }

    /**
     *  The function getListDetails get request result of list items
     * @param xhr
     * @param listId
     * @param event
     * @param element
     * @param response
     * @param index
     * @param classInstance
     */
    getListDetails(xhr, listId, event, element, response, index, classInstance) {



        let data=JSON.stringify({});
        xhr=new XMLHttpRequest();
        xhr.withCredentials=false;
        let isResult=true;


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && [200,201,202.203].includes(this.status) ){

                let results = JSON.parse(xhr.responseText).item_count;
                let movieCount = document.querySelector("#movie_count");
                if (JSON.parse(this.responseText).hasOwnProperty("item_count")) {
                    movieCount.textContent = results;
                    classInstance.setPages(results);
                }


                results = JSON.parse(this.responseText).items;

                if(results.hasOwnProperty('0')){

                    if(["mouseenter","click"].includes(event.type) ){


                    }

                }else {
                    if(event.type==="click" && isResult){

                        classInstance.addToWatchlist(xhr,index,response,classInstance,true,element);

                    }
                }



            }
        });


        if (["mouseleave"].includes(event.type)) {

            element.innerHTML = "&#x2b94;";
            element.title = "Add to list";

        }



        if (["click","mouseenter"].includes(event.type)){
            xhr.open("GET", "https://api.themoviedb.org/3/list/"+listId+"?api_key=a8ac0ce418f28d6ec56424ebad76ed12&language=en-US",true);
            xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
            classInstance.renderMovieDetails(xhr,data)


        }


    }

    /**
     * The function getListNames get request result of list items
     * @param xhr
     * @param element
     * @param createdList
     * @returns {boolean}
     */
    getListNames(xhr, element, createdList) {

        let classInstance=this;
        let results=classInstance.getListResults();


        xhr=new XMLHttpRequest();
        xhr.withCredentials=false;

        if(![undefined,0].includes(results.length)){


            for (let x = 0; x <= results.length; x++) {

                if(![undefined].includes(results[x])) {
                    if(results[x].hasOwnProperty(0)){


                        for (let data of results[x]) {


                            if (data.name === element.value) {

                                classInstance.deleteList(x, createdList, data.id);
                                return false;
                            }


                        }



                    }


                }

            }


        }



    }

    /**
     * The function deleteList delete list items
     * @param xhr
     * @param createdList
     * @param listId
     */
    deleteList(xhr, createdList, listId) {


        let classInstance = this;
        let count = 0;

        let data = JSON.stringify({});

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;


        xhr.addEventListener("readystatechange", function () {

            if ([4, xhr.DONE].includes(xhr.readyState)) {

                let createContentConfirm = document.querySelector("#create_content_confirm");

                classInstance.listMessage(createContentConfirm, "Successfully deleted");


                if (classInstance.getIsList()) {
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.open("GET", "https://api.themoviedb.org/3/account/a8ac0ce418f28d6ec56424ebad76ed12/lists?api_key=" +
                        "a8ac0ce418f28d6ec56424ebad76ed12&sort_by=created_at.desc&language=en-US&session_id=" +
                        "968092a83b4016a49c3ddde1cc030d149fc6ba0b&page=" + classInstance.temp.count, true);
                    xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                    classInstance.renderMovieDetails(xhr, {});

                } else {

                    let timer = setInterval(function () {
                        ++count;
                        if (count > 1) {
                            classInstance.readyModeListResults(classInstance);

                            classInstance.getListItem(createdList, classInstance);
                            clearInterval(timer)
                        }
                    }, 1000);

                }


            }

        });

        xhr.open("DELETE", "https://api.themoviedb.org/3/list/" + listId + "?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b", true);
        xhr.send(data);























    }


    /**
     *  The function nextView requests for a next page at endpoint
     * @param isFavorite
     * @param isList
     * @param isWatchList
     */

    nextView(isFavorite, isList, isWatchList) {


        let xhr = new XMLHttpRequest();
        let url = "";
        let count = 1;

        let data = JSON.stringify({});
        xhr.withCredentials = false;
        if (this.state.query !== undefined && this.state.count > 0) {


            if (this.temp.count >= 1) {


                if (this.temp.count > this.getPages() && this.temp.count !== 1) {


                    count = --this.temp.count;

                } else {


                    count = ++this.temp.count;

                }



            }



            if (isFavorite) {

                url = "https://api.themoviedb.org/3/account/8408193/favorite/movies?page=" + count + "&sort_by=created_at.asc&language=" +
                    "en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12";
                xhr.open("GET", url, true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                this.renderMovieDetails(xhr, data);
            } else if (isWatchList) {

                url = "https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
                    "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort" +
                    "_by=created_at.asc&page=" + count;
                xhr.open("GET", url, true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                this.renderMovieDetails(xhr, data);
            } else if (isList) {

                url = "https://api.themoviedb.org/3/list/" + this.getListIdForQuery() + "?api_key=a8ac0ce418f28d6ec56424ebad76ed12&language=en-US" +
                    "&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=created_at.asc&page=" + count;
                xhr.open("GET", url, true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                this.renderMovieDetails(xhr, data);
            }


        }

    }

    /**
     * The function preview requests for a previous page at endpoint
     * @param isFavorite
     * @param isList
     * @param isWatchList
     */
    preview(isFavorite, isList, isWatchList) {


        let xhr = new XMLHttpRequest();
        let url = "";
        let count = 1;

        let data = JSON.stringify({});
        xhr.withCredentials = false;

        if (this.temp.count > 0) {


            if (this.temp.count > 1) {

                count = --this.temp.count;


            } else {
                count = ++this.temp.count;
            }



            if (isFavorite) {

                url = "https://api.themoviedb.org/3/account/8408193/favorite/movies?page=" + count + "&sort_by=created_at.asc&language=" +
                    "en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&api_key=a8ac0ce418f28d6ec56424ebad76ed12";
                xhr.open("GET", url, true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                this.renderMovieDetails(xhr, data);
            } else if (isWatchList) {

                url = "https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
                    "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort" +
                    "_by=created_at.asc&page=" + count;
                xhr.open("GET", url, true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                this.renderMovieDetails(xhr, data);
            } else if (isList) {

                url = "https://api.themoviedb.org/3/list/" + this.getListIdForQuery() + "?api_key=a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&language=en-US" +
                    "&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by=created_at.asc&page=" + count;
                xhr.open("GET", url, true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                this.renderMovieDetails(xhr, data);
            }

        }


    }


    /**
     *
     * @param result
     */
    setResult(result){
        this.result=result;

    }

    /**
     *
     * @returns {*}
     */
    getResult(){
        return this.result;

    }

    /**
     *The function addToWatchlist add list item to endpoint
     * @param xhr
     * @param index
     * @param resultId
     * @param classInstance
     * @param flag
     */
    addToWatchlist(xhr, index, resultId, classInstance, flag) {

        let data = JSON.stringify({
            "media_type": "movie",
            "media_id": resultId.id,
            "watchlist": flag
        });


        xhr = new XMLHttpRequest();
        xhr.withCredentials=false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && [200,201,202.203].includes(this.status) ){
                classInstance.setPages(JSON.parse(this.responseText).total_pages);
                let message=JSON.parse(xhr.responseText);
                classInstance.confirmation(index,message.status_message);


                xhr = new XMLHttpRequest();
                xhr.withCredentials=false;
                xhr.open("GET", "https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
                    "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by" +
                    "=created_at.asc&page=" + classInstance.temp.count, true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                xhr.send({});
                if(flag===false && classInstance.getIsWatchList()){
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials=false;
                    xhr.open("GET", "https://api.themoviedb.org/3/account/8408193/watchlist/movies?api_key=" +
                        "a8ac0ce418f28d6ec56424ebad76ed12&language=en-US&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b&sort_by" +
                        "=created_at.asc&page=" + classInstance.temp.count, true);
                    xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
                    classInstance.renderMovieDetails(xhr,{}) ;
                }



            }
        });

        xhr.open("POST", "https://api.themoviedb.org/3/account/5cc983f092514119e5f94e46/watchlist?api_key=" +
            "a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b",true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
        xhr.send(data);



    }

    /**
     *The function deleteMovie deletes movie item from the endpoint
     * @param xhr
     * @param element
     * @param listName
     * @param listId
     * @param mediaId
     */
    deleteMovie(xhr, element, listName, listId, mediaId) {


        let classInstance = this;
        let data = JSON.stringify({"media_id": mediaId});



        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {

            if (xhr.readyState === xhr.DONE && [200,201,202].includes(xhr.status)){


                xhr = new XMLHttpRequest();
                xhr.withCredentials=false;
                xhr.open("GET", "https://api.themoviedb.org/3/list/"+listId+"?api_key=a8ac0ce418f28d6ec56424ebad76ed12&language=en-US",true);
                xhr.setRequestHeader("content-type", "application/json;charset=utf-8");

                classInstance.renderMovieDetails(xhr, data)

            }
        });
        xhr.open("POST", "https://api.themoviedb.org/3/list/"+listId+"/remove_item?api_key=a8ac0ce418f28d6ec56424ebad76ed12&session_id=968092a83b4016a49c3ddde1cc030d149fc6ba0b", true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
        xhr.send(data);


    }

    /**
     *
     * @param element
     * @param message
     */
    listMessage(element, message) {
        element.style.display="inline";
        element.innerHTML=""+message;

        let count=0;
        let timer=setInterval(function () {
            ++count;
            if (count === 2) {

                element.style.display="none";
                clearInterval(timer)
            }

        }, 1000);
    }


    /**
     *
     * @param id
     * @param key
     */
    setListId(id, key) {
        this.listId[key]=id;
    }

    /**
     *
     * @returns {Array}
     */
    getListId(){
        return this.listId;
    }

    /**
     * The function setListIdForQuery set response id
     * @param listQueryId
     */
    setListIdForQuery(listQueryId) {
        this.listQueryId = listQueryId;
    }

    /**
     *
     * @returns {*}
     */
    getListIdForQuery() {
        return this.listQueryId;
    }

    /**
     * The function setIndex sets the index of an elements
     * @param index
     */
    setIndex(index) {
        this.index = index;
    }

    /**
     *
     * @returns {*}
     */
    getIndex() {
        return this.index;
    }

    /**
     * The function movieContent process XHR and HTML element for render
     * @param xhr
     * @param results
     * @param resultText
     */
    movieContent(xhr, results, resultText) {
        let utilities=this;
        utilities.setResult(results);
        let items = document.querySelector('#item');


        let createList=document.querySelectorAll(".create_new_list");


        if (![" ", "", undefined].includes(results) && Array.of(results).hasOwnProperty('0')
            && ![" ",0,"",undefined].includes(results.length)){


            let remove = document.querySelectorAll('table');

            remove.forEach(function (value) {
                value.remove();

            });


            for (let x = 0; x < results.length; x++) {

                if(!results[x].hasOwnProperty("description")){

                    let img = "http://image.tmdb.org/t/p/w185/" + results[x].poster_path;
                    items.innerHTML +=


                        `
                                      <table class="item">
                                      <tbody>
                                      <tr>
                                      <td >
                                         
                                      <div class='overview'>
                                      <div>
                                      <img  class="back_drop_img"  src="${img}" alt=""/>
                                      <span class="vote_average">
                                       ${results[x].vote_average}
                                      </span> 
                                      <span class='movie_title'>
                                      ${results[x].original_title.substr(0, 20)}
                                       
                                      </span> 
                                     
                                      </div> 
                                       <span class="release_date"> 
                                      <span >
                                      Release Date 
                                      </span> ${results[x].release_date}
                                      
                                      
                                       </span>
                                                                          
                                      <div class="back_drop_title">
                                 
                               
                                   
                                    
                                     
                                      </div>
                                      <div>
                                     
                      
                                     
                                      </div>
                                  
                                       <div class="result_overview">
                                     
                                        ${results[x].overview.substr(0, 120)}  ......
                                      <div class='emotions'> 
                                      <fieldset class="rating_content">
                                       
                                     <input type="radio" id="star5${x}" name="rating" title="10" />
                                     <label class = "full" for="star5${x}" title="9.50"> </label>
                                     <input type="radio" id="star4half${x}" name="rating" title="9" />
                                     <label class="half" for="star4half${x}" title="8.50"> </label>
                                     <input type="radio" id="star4${x}" name="rating" title="8" />
                                     <label class = "full" for="star4${x}" title="7.50"> </label>
                                     <input type="radio" id="star3half${x}" title="7" name="7" />
                                     <label class="half" for="star3half${x}" title="6.50"> </label>
                                     <input type="radio" id="star3${x}" name="rating"  title="6"  />
                                     <label class = "full" for="star3${x}" title="5.50"> </label>
                                     <input type="radio" id="star2half${x}" name="rating" title="5" />
                                     <label class="half" for="star2half${x}" title="4.50"> </label>
                                     <input type="radio" id="star2${x}" title="4" name="rating"  />
                                     <label class = "full" for="star2${x}" title="3.50"> </label>
                                     <input type="radio" id="star1half${x}"  title="3" name="rating"  />
                                     <label class="half" for="star1half${x}" title="2.50"> </label>
                                     <input type="radio" title="2"  id="star1${x}" name="rating"  />
                                     <label class = "full" for="star1${x}" title="1.50"> </label>
                                     <input type="radio" title="1" id="starhalf${x}" name="rating"  />
                                     <label class="half" for="starhalf${x}" title="0.50"> </label>

                                     </fieldset>
                                     <div class="rating" title="Rate movie"><span class="rate">&star;</span></div>
                                 
                                 
                                     <div class="rating_content_confirm">
                                       
                                     </div>
                                     
                                     
                                      <div  class="favorite" title="Favorite"><span  class="favorite-text" >&heartsuit;<span></div>
                                      <div class='add_to_list' title="Add to list">&#9016;
                                         
                                      </div><div class='add_to_watchlist' title="Add to watch later">&#x2b94;
                                         
                                     </div>
                                      <div  class='watch_trailer' title="Watch trailer">&#9654;</div> <span> </span>
                                      </div>
                                       </div>
                               
                                    
                                      </div>
                                    
                                     
                                      
                                      </td> 
                                      </tr>
                                      <tbody>
                                      </table>
                                      
                                      
                                      
                                     
                                     `
                    ;


                    let movieCount = document.querySelector("#movie_count");
                    document.querySelector('#total_pages_title').innerHTML = "Total pages";

                    if(resultText.hasOwnProperty("total_pages")){

                        movieCount.textContent = "" + resultText.total_results;
                        document.querySelector('#qty').innerHTML = resultText.total_pages;


                    }


                }
                if ((results[x].hasOwnProperty("description") ||
                    results[x].hasOwnProperty("media_type")) &&
                    ![""," ",undefined].includes(results[x].list_type)){
                    utilities.setListId(results[x].id, x);


                    let items = document.querySelector('#item');
                    let img = "http://image.tmdb.org/t/p/w185/" + results[x].backdrop_path;
                    let description = "";

                    if (!["", " ", undefined].includes(results[x].description)) {

                        description = results[x].description.substr(0, 669);
                    }
                    if(![""," ",undefined].includes(results[x].overview)){

                        description=results[x].overview.substr(0, 669);
                    }

                    //String literal template
                    items.innerHTML += `
                                      <table class="item">
                                      <tbody>
                                      <tr>
                                      <td >
                                         
                                      <div class='overview'>
                                      <div>
                                      <img  class="back_drop_img"  src="${img}" alt=""/>
                                      <span class="vote_average">
                                       ${results[x].item_count}
                                      </span> 
                                   
                                      <span class='movie_title'>
                                         List name
                                       
                                      </span>
                                      <span class="release_date"> 
                                        ${results[x].name.substr(0, 20)}
                                   
                                    
                                    
                                       </span> 
                                     
                                      </div> 
                                      <span class='movie_title'>
                                          Type 
                                          </span>
                                      <span class="release_date">
                                     
                                         ${results[x].list_type}
                                    
                                       </span>

                                      <div>
                        
                                      </div>
                                  
                                       <div class="result_overview">
                                     
                                         ${description.substr(0, 150)}  ......
                                          </div>
                                            <div class='emotions_list'>

                                          <div class="favorite_count" title="Favorite count"><span
                                              class="favorite-text"> ${results[x].favorite_count}<span></div>
                                          <div class='list_items' title="Items">&#9016;

                                          </div
                                          class='delete_items' >
                                          <div class='delete_items' title="Remove item">&times;</div>
                                          <span> </span>
                                      </div>
                                     
                                    
                                      </div>
                                    
                                     
                                      
                                      </td> 
                                      </tr>
                                      <tbody>
                                      </table>
                                      
                                      
                                      
                                     
                                     `
                    ;

                    let movieCount = document.querySelector("#movie_count");

                    document.querySelector('#total_pages_title').innerHTML = "Total pages";

                    if (resultText.hasOwnProperty("total_pages")) {

                        movieCount.textContent = "" + resultText.total_results;
                        document.querySelector('#qty').innerHTML = resultText.total_pages;


                    }

                    let overview = document.querySelectorAll(".result_overview");
                    if (window.matchMedia(("max-width:500px"))) {


                        overview[x].textContent = description.substr(0, 100) + "......";

                    }


                }


                let movieCount = document.querySelector("#movie_count");
                let selectedListContent = document.querySelectorAll(".create_list" );
                selectedListContent[0].style.display="none";
                document.querySelector('#total_pages_title').innerHTML = "Total pages";
                if (resultText.hasOwnProperty("total_pages")) {
                    movieCount.textContent = "" + resultText.total_results;
                    document.querySelector('#qty').innerHTML = resultText.total_pages;


                }






            }



            let ratingContent = document.querySelectorAll(".rating_content");
            let favorite = document.querySelectorAll(".favorite");
            let item = document.querySelectorAll(".item");
            let rating = document.querySelectorAll(".rating");
            let stars = document.querySelectorAll(".half, .full");
            let closeCreateList=document.querySelectorAll(".close_createList");

            let selectedMovie = document.querySelector("#selected_movie" );
            let scroller= document.querySelector("#scroll_list" );
            let selectedListContent = document.querySelectorAll(".create_list" );
            let createdList = document.querySelector("#created_list" );
            let deleteResrc=document.querySelector("#delete_list");
            let player = document.querySelector("#video_player");
            let sorted=document.querySelector("#sorted");
            let visibility=document.querySelector("#visibility");
            let addToWatchlist=document.querySelectorAll(".add_to_watchlist");
            let watchTrailer = document.querySelectorAll(".watch_trailer");
            let listItems=document.querySelectorAll(".list_items");
            let deleteListItem=document.querySelectorAll(".delete_items");
            let closePlayer = document.querySelectorAll(".close_player");
            let movieSource = document.querySelectorAll(".video_1");


            let next = document.querySelector("#next");

            let prev = document.querySelector("#prev");


            prev.addEventListener("click", function (ev) {


                utilities.preview(utilities.getIsFavorite(), utilities.getIsList(), utilities.getIsWatchList());
                ev.stopPropagation();
                ev.stopImmediatePropagation();

            });

            next.addEventListener("click", function (ev) {

                utilities.nextView(utilities.getIsFavorite(), utilities.getIsList(), utilities.getIsWatchList());
                ev.preventDefault();
                ev.stopImmediatePropagation();

            });


            ['click', 'touch', 'mouseenter', 'mouseover', 'mouseleave'].forEach(function (event) {


                let addToList = document.querySelectorAll(".add_to_list");


                scroller.addEventListener("scroll", function () {

                    selectedListContent[0].style.display = "none";

                });


                let listItem = document.querySelector('#list_name');
                let listDescription = document.querySelector('#list_description');
                let createContentConfirm = document.querySelector("#create_content_confirm");
                let isAddNewList;


                item.forEach(function (el, itemIndex) {


                    el.addEventListener("mouseleave", function () {
                        let watchlist = addToWatchlist.item(itemIndex);
                        let fav = favorite.item(itemIndex);
                        let list = addToList.item(itemIndex);
                        let addToWatchLater = addToWatchlist.item(itemIndex);
                        if (![fav, watchlist, list, addToWatchLater].includes(null)) {
                            fav.innerHTML = '&heartsuit;';
                            fav.title = "Favorite";
                            fav.style.background = "gold";
                            watchlist.innerHTML = "&#x2b94;";
                            watchlist.style.background = "gold";
                            list.innerHTML = '&#9016';
                            list.style.background = "gold";
                            list.title = "Add to list";
                            addToWatchLater.innerHTML = '&#x2b94;';
                            addToWatchLater.style.color = "black";
                            addToWatchLater.background = "gold";
                            addToWatchLater.title = "Add to watch later";
                            watchlist.title = "Add to watch later";
                        }


                    });
                    addToWatchlist.forEach(function (el, key) {


                        el.addEventListener(event, function (ev) {

                            ev.preventDefault();
                            ev.stopPropagation();


                            if (key === itemIndex) {


                                selectedListContent.item(0).scrollIntoView(true);


                            }


                            if (["click", "mouseleave", "mouseover"].includes(ev.type) && key === itemIndex) {

                                selectedMovie.innerHTML = "" + results[key].original_title;



                                utilities.getWatchLater(xhr, results[key].id, itemIndex, el, ev, utilities);


                            }
                        });
                    });

                    watchTrailer.forEach(function (el, key) {

                        el.addEventListener(event, function (ev) {


                            if (ev.type === "mouseover") {
                                utilities.confirmation(key, "Play trailer");
                            }

                            if (ev.type === "click") {
                                utilities.setIsLoaded(true);


                                player.style.display = "inline-block";


                                if (key === itemIndex && ![undefined].includes(results[itemIndex].id)) {

                                    utilities.watchTrailer(xhr, key, movieSource, results[itemIndex].id);

                                    return false;
                                }


                            }


                            utilities.exitPlayer(closePlayer, player, movieSource);

                        });


                    });


                    favorite.forEach(function (el, key) {


                        el.addEventListener(event, function (ev) {

                            ev.preventDefault();
                            ev.stopPropagation();


                            if (itemIndex === key && ![undefined].includes(results[itemIndex].id)) {

                                if (ev.type === "mouseleave") {
                                    el.innerHTML = '&heartsuit;';
                                    el.title = "Favorite";
                                    el.style.color = "black";
                                    el.style.background = "gold";

                                }

                                if (ev.type === "mouseover") {
                                    el.innerHTML = '&heartsuit;';
                                    el.title = "Favorite";
                                    el.style.color = "gray";
                                    el.style.background = "gold";

                                }


                                if (["mouseover", "click"].includes(ev.type)) {

                                    utilities.getFavorite(xhr, results[itemIndex], key, el, ev, utilities);
                                }


                            }


                        });


                        return false;
                    });


                    rating.forEach(function (rating, index) {

                        rating.addEventListener(event, function (ev) {


                            if (index === itemIndex) {
                                utilities.setIndex(index);
                                stars.forEach(function (el) {


                                    el.addEventListener('click', function (ev) {

                                        utilities.getRating(xhr, results[utilities.getIndex()].id, utilities.getIndex(),
                                            rating, ev, el.getAttribute('title'), false, utilities);




                                        ev.stopPropagation();
                                        ev.stopImmediatePropagation();


                                    })

                                });

                                if (ev.type === "mouseleave") {
                                    ratingContent.item(itemIndex).style.display = "none";

                                }

                                if (ev.type === "mouseenter") {

                                    ratingContent.item(itemIndex).style.display = "block";


                                }

                                ratingContent.item(itemIndex).addEventListener(event, function (ev) {

                                    if (ev.type === "mouseleave") {

                                        ratingContent.item(itemIndex).style.display = "none";
                                        return false;
                                    }
                                    if (ev.type === "mouseenter") {


                                        ratingContent.item(itemIndex).style.display = "block";

                                        return false;
                                    }


                                });


                                if (["mouseover", "mouseleave", "click", "touch"].includes(ev.type)) {



                                    if (ev.type === "mouseenter") {
                                        utilities.confirmation(itemIndex, "Make rating");
                                    }


                                    utilities.getRating(xhr, results[itemIndex].id, itemIndex, rating, ev, "", true, utilities);



                                    return false;
                                }

                                return false;

                            }


                        })
                    });


                    deleteListItem.forEach(function (el, key) {

                        el.addEventListener(event, function (ev) {

                            if (["click", "touch"].includes(ev.type)) {

                                if (key === itemIndex) {
                                    createdList.value = results[key].name;

                                    utilities.getListNames(xhr, createdList, createdList);


                                    return false

                                }

                            }

                            ev.stopPropagation();
                            ev.preventDefault();


                        });

                        return false;

                    });


                    listItems.forEach(function (el, key) {
                        el.addEventListener(event, function (ev) {
                            if (ev.type === "click") {

                                if (key === itemIndex) {


                                    utilities.setListIdForQuery(utilities.getListId()[key]);
                                    utilities.setIsList(true);
                                    utilities.getListDetails(xhr, utilities.getListId()[key], ev, listItems, results[itemIndex], itemIndex, utilities);
                                    return false;
                                }

                            }
                            ev.preventDefault();
                            ev.stopPropagation();

                        })

                    });

                });

                addToList.forEach(function (el, index) {

                    el.addEventListener(event, function (ev) {


                        item.forEach(function (el, itemIndex) {


                            if (itemIndex === index) {
                                utilities.setIndex(itemIndex);
                                if (["mouseover"].includes(ev.type)) {
                                    utilities.getListItem(createdList, utilities);
                                    utilities.confirmation(itemIndex, "Make list");
                                    selectedMovie.innerHTML = "" + results[index].original_title;


                                }


                                if (utilities.getIsList()) {


                                    if (ev.type === "mouseover") {
                                        utilities.confirmation(index, "Remove item");
                                        selectedListContent.item(0).style.display = "none";

                                        addToList.item(index).innerHTML = '&times;';
                                        addToList.item(index).title = "Remove item";


                                    }

                                    if (ev.type === "mouseleave") {


                                        addToList.item(index).innerHTML = '&#9016;';
                                        addToList.item(index).title = "Remove item";


                                    }

                                    if (["click", "touch"].includes(ev.type)) {


                                        if (index === itemIndex) {

                                            utilities.deleteMovie(xhr, el, listItems, utilities.getListIdForQuery(), utilities.getResult()[itemIndex].id, utilities.getIndex())

                                        }





                                    }


                                } else {


                                    if (["mouseover"].includes(ev.type)) {

                                        utilities.getListItem(createdList, utilities);
                                        utilities.confirmation(itemIndex, "Make list");
                                        selectedMovie.innerHTML = "" + results[index].original_title;


                                    }


                                    if (["touch", "click"].includes(ev.type)) {
                                        selectedListContent[0].style.display = "block";
                                        closePlayer[0].click();


                                        if (isAddNewList) {

                                            isAddNewList = false;

                                            selectedListContent[0].style.display = "block";

                                        } else if (isAddNewList === false) {

                                            selectedListContent[0].style.display = "none";
                                            isAddNewList = true;
                                        }


                                    }


                                }

                                deleteResrc.addEventListener("click", function (ev) {

                                    ev.preventDefault();

                                    if (index === itemIndex) {

                                        if (!["", undefined].includes(createdList.value)) {
                                            utilities.setIsList(false);
                                            utilities.getListNames(xhr, createdList, createdList);

                                        } else {
                                            let createContentConfirm = document.querySelector("#create_content_confirm");
                                            utilities.listMessage(createContentConfirm, "Select a list to delete");
                                        }


                                        ev.stopPropagation();
                                        ev.stopImmediatePropagation();
                                        ev.stopPropagation();

                                    }


                                });


                                selectedListContent[0].addEventListener(event, function (ev) {
                                    if (["mouseover"].includes(ev.type)) {

                                        utilities.setIsList(true);

                                    }

                                    if (["mouseleave"].includes(ev.type)) {

                                        utilities.setIsList(false);
                                    }
                                    ev.preventDefault();
                                });


                                createList.item(0).addEventListener(event, function (ev) {


                                    if (["click", "touch"].includes(ev.type) && ev.target.value === "Create list") {

                                        selectedListContent.item(0).style.display = "block";


                                        if (ev.target.value === "Create list") {

                                            let listName = listItem.value;
                                            let listDesc = listDescription.value;


                                            if (!["", " ", null, undefined].includes(listName)) {


                                                utilities.makeList(xhr, listName, listDesc, utilities, createContentConfirm, visibility.value, sorted.value);


                                            } else {

                                                utilities.listMessage(createContentConfirm, "List name must be provided");

                                                return false;


                                            }


                                        }


                                    }


                                    createList = document.querySelectorAll(".create_new_list");
                                    ev.stopPropagation();
                                    ev.preventDefault();
                                    ev.stopImmediatePropagation();
                                });


                                createList.item(1).addEventListener(event, function (ev) {


                                    if (["click", "touch"].includes(ev.type) && ev.target.value === "Add movie") {


                                        if (!["", undefined].includes(results[itemIndex])) {
                                            if (utilities.getIsList()) {

                                                utilities.addMovie(xhr, createList[0], utilities.temp.count, utilities.getResult()[utilities.getIndex()].id, selectedMovie);
                                            }

                                        } else {

                                            utilities.listMessage(createContentConfirm, "We can add this movie at the moment try again later");
                                        }


                                    }

                                    createList = document.querySelectorAll(".create_new_list");
                                    ev.stopPropagation();
                                    ev.preventDefault();
                                    ev.stopImmediatePropagation();
                                });


                                return false;
                            }


                        });


                        closeCreateList.item(0).addEventListener("click", function () {
                            selectedListContent.item(0).style.display = "none";
                            utilities.setIsList(false);
                            scroller.style.overflowY = "scroll";


                        });


                        ev.preventDefault();
                        ev.stopPropagation();
                        ev.stopImmediatePropagation();

                    });


                });

                if ((utilities.getIsFavorite() && window.getComputedStyle(player).display === "block") ||
                    (utilities.getIsWatchList() && window.getComputedStyle(player).display === "block")) {
                    utilities.restoreDown();

                    document.querySelectorAll(".restore_down")[0].click();

                    scroller.style.overflowY = "scroll";
                    selectedListContent[0].style.display = "none";

                } else {
                    closePlayer[0].click();
                }


            });
















        } else {

            let movieCount = document.querySelector("#movie_count");
            movieCount.textContent = "0";
            ReactDOM.findDOMNode(document.getElementById('qty')).textContent = 0;
            ReactDOM.findDOMNode(document.getElementById('total_pages_title')).innerHTML = "Total pages";


            let noResultException = document.querySelectorAll('#item');

            noResultException[0].innerHTML = "<table class='item'><tbody><tr><td >" +
                "<p id='search_result'>Your search yield no results check your spellings and try again</p></td></tr> </tbody></table>"


        }


    }

    /**
     * The function exitPlayer exit the movie when it no more needed
     * @param closePlayer
     * @param player
     * @param movieSource
     */
    exitPlayer(closePlayer, player, movieSource) {

        closePlayer.forEach(function (value) {

            value.addEventListener("click", function (ev) {

                if (ev.type === "click") {


                    movieSource.forEach(function (el) {

                        el.src = "";


                    });
                    player.style.display = "none";


                    return false;



                }
                ev.preventDefault();
            })

        });
    }


    /**
     * The function setPages set the page of movies
     * @param page
     */
    setPages(page){
        this.page=page;
    }

    /**
     *
     * @returns {*}
     */
    getPages(){
        return this.page;
    }

    /**
     * The function setTotalPages set the total page of movies
     * @param page
     */
    setTotalPages(page){
        this.page=page;
    }

    /**
     *
     * @returns {*}
     */
    getTotalPages(){
        return this.page;
    }


    /**
     * The renderMovieDetails renders the view elements
     * @param xhr
     * @param data
     * @returns {*}
     */
    renderMovieDetails(xhr, data) {

        let utilities=this;
        if (![undefined, "", null].includes(xhr)) {


            let isProgress = false;

            xhr.addEventListener("readystatechange", function (results) {
                if (this.responseText.hasOwnProperty("total_pages")) {
                    utilities.setTotalPages(JSON.parse(this.responseText).total_pages)
                }
                if (xhr.readyState === 4 && [200, 201, 202, 203].includes(xhr.status)) {


                    let selectedListContent = document.querySelectorAll(".create_list");
                    selectedListContent[0].style.display = "none";


                    if (utilities.getIsLoaded()) {
                        utilities.readyModeRatings(utilities);
                        utilities.readyModeFavorite(utilities);
                        utilities.readyModeWatchLater(utilities);
                        utilities.readyModeListResults(utilities);
                        utilities.setIsLoaded(false);
                    }


                    if (![" ", "", undefined].includes(xhr.responseText)) {

                        utilities.setTotalPages(JSON.parse(this.responseText).total_pages);

                        let resultText = JSON.parse(xhr.responseText);
                        results = JSON.parse(xhr.responseText);

                        if (results.hasOwnProperty("results")) {

                            results = JSON.parse(xhr.responseText).results;


                        } else {
                            results = JSON.parse(xhr.responseText).items;
                        }

                        let remove = document.querySelectorAll('table');

                        remove.forEach(function (value) {
                            value.remove();

                        });



                        utilities.movieContent(xhr,results,resultText);


                    }

                } else if ([500, 501, 502.503].includes(this.status)) {

                    isProgress = true;
                    alert("Hmm. We’re having trouble finding that Query.\n" +
                        "\n" +
                        "We can’t connect to the server at " + navigator.appName +
                        "\n Server error" +
                        "If that address is correct, here are three other things you can try:\n" +
                        "\n" +
                        "    Try again later.\n" +
                        "    Check your network connection.\n" +
                        "    If you are connected but behind a firewall," + navigator.appName +
                        " check that " + navigator.appName + "has permission to access the Web.");


                } else if ([1, 2, 3].includes(this.status)) {

                    isProgress = true;

                }

            });


            if (isProgress) {
                this.progress();
            }

            xhr.responseType = "text";
            xhr.send(data);


        }


        utilities.restoreDown();


        return  (
            <div>


                <div className="info_box">
                    <div id="user_query_details">
                        <div id="total_pages">
                            <span id="total_pages_title">Total Pages </span>
                            <span id="qty">

                                  </span>

                        </div>
                        <span><span className="user_query">My Favorites</span>
                              <span id="user_query">Movies <span id="movie_count">
                              </span></span></span>
                    </div>


                </div>
                <div id="create_list_content">


                    <div className="create_list">

                        <div className="create_list_title">
                            <span title="Close" className="close_createList">&times;</span>
                            Create New List <span id="create_content_confirm"> </span>
                        </div>
                        <div className="">
                            <select id="selected_Title" disabled={true} className="sorted">

                                <option id="selected_movie"></option>

                            </select>


                        </div>


                        <div className="favorite_labels">
                            Name
                        </div>
                        <div className="">
                            <input type="text" id="list_name" className="sorted"/>

                        </div>


                        <div className="list_description">Description</div>
                        <div>
                            <textarea id="list_description"/>
                        </div>


                        <div className="favorite_labels">
                            Public List

                        </div>
                        <div className="sorted">
                            <select id="visibility" className="sorted">
                                <option id="public_ list">Yes</option>
                                <option>No</option>

                            </select>
                        </div>
                        <div className="">
                            Sorted By
                        </div>

                        <div className="">
                            <select id="sorted" className="sorted">
                                <option id="sorted_list">Yes</option>
                                <option>No</option>
                            </select>
                            <div className="list_Name">
                                My List Bank <span id="delete_list" title="Delete this list">&times;</span>
                            </div>

                            <div className="">
                                <select id="created_list" className="sorted">

                                </select>


                            </div>


                            <input type="button" id="add_new_list" className="create_new_list" value="Create list"/>
                            <input type="button" id="add_movie_to_list" className="create_new_list" value="Add movie"/>

                        </div>
                    </div>
                </div>
                <div id="video_player" draggable="true">
                    <div id="movie_title_iframe"></div>
                    <div className="restore_down" title="Restore down"></div>
                    <div title="Exit player" className="close_player"></div>
                    <div id="iframe">
                        <iframe title="IPlayer" className="video_1"
                                data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'
                                src="" frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>


                        </iframe>
                    </div>

                </div>
                <div id='scroll_list'>

                    <div id="item"></div>

                </div>


                <div className="navigator">
                    <span id="prev" className="nav"> </span>
                    <span id="next" className="nav"> </span>

                </div>

            </div>

        )




    }

    /**
     * The restoreDown function performs restoration of the video play
     */
    restoreDown(){
        let restore=document.querySelectorAll(".restore_down");
        let video=document.querySelectorAll(".video_1");
        let title=document.querySelector("#movie_title_iframe");
        let player=document.querySelector("#video_player ");
        let isRestoreDown=true;


        restore.forEach(function (el) {

            el.addEventListener("click", function (event) {
                event.preventDefault();
                if (isRestoreDown) {
                    isRestoreDown = false;

                    video[0].style.cssText = "height: 140%;";
                    el.style.cssText = "margin-left: 2%;";
                    if (title.textContent.length >= 42) {

                        title.style.cssText = " padding-right:1%;"
                    } else {
                        title.style.cssText = "padding-right:16%;"
                    }
                    player.style.cssText = "  border-radius: 2px; width: 40%; height: 25%;display:block;margin-top:272px;padding-top:1%;padding-bottom:8%;margin-left:800px"
                } else {
                    isRestoreDown = true;

                    if (title.textContent.length > 30) {

                        title.style.cssText = " padding-right:38%;"
                    } else {
                        title.style.cssText = "padding-right:54%;"
                    }
                    video[0].style.cssText = "height: 60%;";
                    player.style.cssText = "  border-radius: none; width: 100%; height: 100%;display:block;margin-top:0;margin-left:0px;padding-top:5%;padding-bottom:7%;"

                }


            })

        })
    }


}



export  default View;