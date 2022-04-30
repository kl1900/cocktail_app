# Functional requirements

- [x] Homepage

  - [x] The landing page of your web application. It is the first page users should see when they visit your website.
  - [x] Must be mapped to either the root context ("/") or ("/home").
  - [x] Must display generic content for anonymous users. The content must be dynamic based on the latest data. For instance, you might display snippets and links to the most recent post, review, or member who recently joined
  - [x] Must display specific content for the logged-in user. The content must be dynamic based on the most recent data entered by the logged-in user. For instance, you might display snippets and links to the most recent post or review created by the logged-in user
  - [x] Must be clear to what the Web site is about and must look polished and finished

- [x] Log in/Register page

  - [x] The login and register page allows users to register (create a new account) with the website and then log in later on
  - [x] Must force login only when identity is required. For instance, an anonymous user might search for movies and visit the details page for a particular movie without needing to log in. But if they attempt to like the movie, rate it, comment on it, write a review, or follow someone, the application must request the user to log in. Most of the Web applications must be available without a login
  - [x] Must be mapped to /login if both login and register are implemented on the same page
  - [x] The login and register page can be implemented as a single page or as two separate pages. In that case, the login page must be mapped to /login and the registration page must be mapped to /register

- [x] Profile page

  - [x] Users can see all the information about themselves. It could have several sections for personal information and links to related content associated with the user. For instance, display a list of links to all the favorite movies, a list of links of users they are following, etc.
  - [x] Must allow users to change their personal information.
  - [x] Must be mapped to "/profile" for displaying the profile of the currently logged in user
  - [x] The profile page may be implemented as several pages (based on how you want to display the information)

- [x] Search/Search Results page (optional)

  - [x] Search and results can be on the same page or in separate pages. (e.g. the search bar can be on the home page and the results on a separate page. Or both in a separate search page).
  - [x] Users must be able to see a summary of the search results and navigate to a detail page that shows a detailed view of the result.
  - [x] Must be mapped to /search when no search has been executed and no results exist
  - [x] Must be mapped to /search/{search criteria} or /search?criteria={search criteria} when a search has been executed

- [x] Details page
  - [x] The details page allows users to view a detailed view of the search result. They can see more information when they click on the search result. The details page must fulfill the following requirements.
  - [x] Must be mapped to /details/{unique identifier} or /details?identifier={unique identifier} where unique identifier uniquely identies the item being displayed

# Responsive design requirements

- [x] Web application must be usable on a desktop, tablet, or phone
- [x] Web pages must be responsive at any width of the browser
- [x] Elements must never overlap each other unintentionally
- [x] Elements must not wrap unintentionally
- [x] Scrollbars must not appear unintentionally
- [x] Embedded scrollbars must be avoided unless specifically necessary
- [x] Must use scrollbars only when it is absolutely necessary

# User experience requirements

- [x] Navigating between pages must be clearly marked
- [ ] Currently logged in user must be clearly marked
- [x] Errors must be clearly marked and options to fix them must be provided
- [x] Navigating to the home page must be clearly marked
- [x] Navigating to the profile must be clearly marked
- [x] The URL must have a meaningful name

# External Web API requirements

- [x] Create an interface to an external Web API such as Google maps, IMDB, YouTube, Yelp, Yahoo, Weather Channel, Yummly, Bestbuy, Amazon, ... You need to only use the Web API to do read-only operations, e.g. get weather data based on location, get recipe based on the country name,... A good place to start is at https://www.programmableweb.com/category/all/apis (Links to an external site.)

# Accessibility requirements

- [x] Include accessibility reports from all your pages using https://developers.google.com/web/tools/lighthouse (Links to an external site.)

# Testing requirements

Your application should have at least 3 unit tests (1 per component):

- [ ] Home
- [x] Login/register
- [ ] profile
- [x] search
- [ ] details
- [x] notFound

# Database requirements

- [x] Your application should include at least 3 tables in the database.
