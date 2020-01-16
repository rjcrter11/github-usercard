/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
// axios
//   .get("https://api.github.com/users/rjcrter11")
//   .then((response) => {
//     Object.keys(response).forEach((item) => {
//       cards.append(gitCards(response[item]));
//     });
//   })
//   .catch((error) => {
//     console.log("not returned", error);
//   });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  "rjcrter11",
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];
const cards = document.querySelector(".cards");
followersArray.forEach((followed) => {
  axios
    .get(`https://api.github.com/users/${followed}`)
    .then((response) => {
      cards.append(gitCards(response.data));
    })
    .catch((error) => {
      console.log("not returned", error);
    });
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function gitCards(arg) {
  const card = document.createElement("div"),
    img = document.createElement("img"),
    cardInfo = document.createElement("div"),
    name = document.createElement("h3"),
    userName = document.createElement("p"),
    location = document.createElement("p"),
    profile = document.createElement("p"),
    anchor = document.createElement("a"),
    followers = document.createElement("p"),
    following = document.createElement("p"),
    bio = document.createElement("p"),
    graph = document.createElement("div");

  card.style.cursor = "pointer";

  card.append(img);
  card.append(cardInfo);
  cardInfo.append(name, userName, location, profile, followers, following, bio);
  profile.append(anchor);
  card.append(graph);

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");

  graph.classList.add("calendar");
  graph.classList.add("toggle");

  card.addEventListener("click", (event) => {
    graph.classList.toggle("toggle");
    console.log("clicked", event);
  });

  anchor.href = arg.html_url;
  img.src = arg.avatar_url;
  name.textContent = arg.name;
  userName.textContent = arg.login;

  location.textContent = `Location: ${arg.location}`;
  profile.textContent = `Profile: ${arg.html_url}`;
  followers.textContent = `Followers: ${arg.followers}`;
  following.textContent = `Following: ${arg.following}`;
  bio.textContent = `Bio: ${arg.bio}`;
  new GitHubCalendar(graph, arg.login);

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
