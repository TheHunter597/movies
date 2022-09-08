import {
  moviesMain,
  moviesMovieDark,
  moviesMovieLight,
  moviesSearch,
} from "../public/images/projects/movies/exporter";
import {
  landingMain,
  langinSection1,
  langinSection2,
  langinSection3,
} from "../public/images/projects/landing/exporter";

import {
  postAllPosts,
  blogSignUp,
  blogMain,
  blogPost,
} from "../public/images/projects/blog/exporter";

import {
  countriesMainLight,
  countriesMainDark,
  countriesGame,
  countriesGameResult,
  countriesCountry,
} from "../public/images/projects/countries/exporter";

export const projectsData = [
  {
    name: "Where in the world",
    description:
      "Another challenge(Advanced diffculty) from frontend mentor I finised the main project in 8 hours so I added a game(Not in the challenge I came up with it) that you can play for more info click more info",
    mainImage: countriesMainDark,
    images: [
      countriesMainLight,
      countriesMainDark,
      countriesGame,
      countriesGameResult,
      countriesCountry,
    ],
    url: "https://countries-seven-fawn.vercel.app/",
    special: "Newest",
    details: [
      "The website has the ability to filter countries by region",
      "also you can write the name of the country into search input to get to specific country",
      "It provides you data about country population,cuurency,border countries,domain and others",
      "Also I added a game where you start at a random country at a random region and you have to navigate to another country",
      "The game calculates how long it took you and how many and what countries you got through ",
    ],
  },
  {
    name: "Meine blog(my blog in german)",
    description:
      "A blog that I constructed the main purpose was to collect all the notes that I have learned throught my journy in one website in the form of posts the website has a sign up and sign in feature for more info click more info",
    mainImage: blogSignUp,
    images: [postAllPosts, blogSignUp, blogMain, blogPost],
    special: "Most complex",
    url: "https://blog-nine-olive.vercel.app/",
    details: [
      "The blog contains some dummy posts that has no actual content",
      "Some posts that I have created (There are not fully complete but to make some posts for the website)",
      "You make an account on the website and sign in",
      "The posts data and users database is saved in hygraph database ",
      "Api calls are done in GraphQl",
      "Currently only admin(me) can create and modify posts",
      "Currently working on shifting state managment from context api to redux ",
      "Next idea is to add the ability of users to add posts that should be accepted by admin t be published",
    ],
  },
  {
    name: "Landing page",
    description:
      "A challenge that was posted on frontend mentor to replicate the website as much as you can the website is a model for a landing page for more info click more info",
    mainImage: landingMain,
    images: [landingMain, langinSection1, langinSection2, langinSection3],
    url: "https://landing-page-boofyaysd-thehunter597.vercel.app/",
    details: [
      "It was a chanllenge on front end mentor",
      "the chanllenge has intermediate diffculty",
      "One of the best looking websites that I have made",
    ],
  },
  {
    name: "Movies website",
    description:
      "The website lets you search for a movie it will give you data about the movie like the directors,writer,revenue and other data for more info click more info ",
    mainImage: moviesMovieLight,
    images: [moviesMain, moviesMovieDark, moviesMovieLight, moviesSearch],
    url: "https://movies-seven-flax.vercel.app/",
    details: [
      "Website takes your input either name of series or a movie",
      "it gives you top websites that have the name you search for for instance if you search for dark the result will be Transformers: Dark of the Moon(2011),The Dark Knight(2008),Thor: The Dark World(2013) and more",
      "the website provides many data about the movie or series like directors writers actors and revunes",
      "It also provides streaming services(only Netflix,HBO,Diseny) with direct link to watch the movie",
      "You can add the movie to your favourite list which will save it to your local storage and generate a random link the when you vist you will see the movies",
    ],
  },
];
