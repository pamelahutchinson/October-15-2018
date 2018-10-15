
const app = document.getElementById('root');
const h1 = document.createElement('h1');
    h1.className = "title"
    h1.innerHTML = "Spiderman Movies"
const logo = document.createElement('img')
    logo.className = "logo";
    logo.src = "Images/spiderman.png"
const container = document.createElement('div');
container.setAttribute('class','container');
app.appendChild(h1);
app.appendChild(logo);
app.appendChild(container);
let movieList = document.getElementById("movieList");

let request = new XMLHttpRequest();

function getIndividual(id, e){
    var buttonClicked = e.target

    if(buttonClicked.getAttribute("selected") == "false"){
        var card = document.getElementById(id)
        let newrequest = new XMLHttpRequest();
        newrequest.open('GET', MOVIE_START + id + MOVIE_END, true );
        newrequest.onload = function(){
            let data = JSON.parse(this.response);
        
            if (newrequest.status >= 200 && newrequest.status < 400){
                
            
                let oneMovie = `
                <ul>
                <li>
                <h1>${data.Title}</h1>
                <h2>${data.Year}</h2>
                <h3>${data.imdbID}</h3>
                <h4>${data.Type}</h4>
            
                </li>
                </ul>`
                card.innerHTML = oneMovie

                var seeLessBtn = document.getElementById(`btn_${id}`)
                // seeLessBtn.addEventListener('click', resetHTML)
                console.log(oneMovie)
                $('.textDiv').toggle()
            }
            
            else {
                console.log("WHOOPS")
            }
        
        }
        newrequest.send();

        buttonClicked.setAttribute("selected", "true")
    }
    else{


        card.innerHTML = `<img id=movieImg src="${data.Poster}"></img>`


        buttonClicked.setAttribute("selected", "false")
    }
    
    
}



request.open('GET', MOVIE_URL , true);

request.onload = function(){
    //Begin accesing JSON data here
    let data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400){
            data.Search.forEach(movie => {
                //div with a card class
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                //h1 = Film title
                const btn = document.createElement('button');
                btn.innerHTML = movie.Title;
                btn.setAttribute("selected", false)
                btn.setAttribute('onclick', `getIndividual("${movie.imdbID}", event)`)
                // btn.addEventListener('click', console.log("FIRED"))
                

                //p = Movie Poster
                const posterDiv = document.createElement('div')
                posterDiv.className = "posterDiv"
                posterDiv.id = movie.imdbID
                posterDiv.innerHTML = `<img id=movieImg src="${movie.Poster}"></img>`

                const textDiv = document.createElement('div')
                textDiv.className = "textDiv"

                //Each card contains an h1 and p
                card.appendChild(btn);
                card.appendChild(posterDiv);
                card.appendChild(textDiv)
                //Append the cards to the container element
                container.appendChild(card);
                
                console.log(movie.Title);
                console.log(movie.Poster)
                $('.textDiv').toggle()
        });
    } else {
        console.log ("Error");
    }

    
}

request.send();




    
