let button = document.getElementById('button')
let buttonTwo = document.getElementById('buttonTwo')

button.addEventListener("click", fetchJSON)
buttonTwo.addEventListener("click", fetchPeople)

async function fetchJSON() {
    try {
        let response = await fetch('https://ghibliapi.herokuapp.com/films');
        let data = await response.json();

        let content = "";
        for (let movie of data) {
            content += `
                <article class="getMovieId" value=${movie.id}>
                <h1>${movie.title}</h1>
                <h3>${movie.original_title}</h3>
                <img src= ${movie.image}></img>
                <p>Year: ${movie.release_date}</p>
                <p>Director: ${movie.director}</p>
                </article>
            `;
        }

        document.getElementById("text").innerHTML = content;

        let movieId = document.getElementsByClassName('getMovieId')
        for (let a of movieId) {
            a.addEventListener("click", fetchDetails);
        }

    } catch (error) {
        console.log(error);
    }
}


async function fetchPeople() {
    try {
        let response = await fetch('https://ghibliapi.herokuapp.com/people');
        let people = await response.json();
        let content = "";
        for (let details of people) {
            content += `
            <article>
            <h3>${details.name}</h3>
            <p>Gender: ${details.gender}</p>
            <p>Age: ${details.age}</p>
            <p>Eye color: ${details.eye_color}</p>
            </article>
    `;
        }
        document.getElementById("text").innerHTML = content;

    } catch (error) {
        console.log(error);
    }
}

async function fetchDetails() {
    try {
        let id = this.getAttribute('value');
        let response = await fetch('https://ghibliapi.herokuapp.com/films/' + id);
        let people = await response.json();
        let content = "";
        content += `
            <article>
            <h1>${people.title}</h1>
            <h3>${people.original_title}</h3>
            <img src= ${people.image}></img>
            <p>Director: ${people.director}</p>
            <p>Grades: ${people.rt_score} of 100</p>
            <p>Time: ${people.running_time} minutes</p>
            <p>${people.description}</p>
            </article>
    `;
        document.getElementById("text").innerHTML = content;
    } catch (error) {
        console.log(error);
    }
}
