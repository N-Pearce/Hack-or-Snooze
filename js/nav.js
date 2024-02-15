"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  navAllStories();
}

/** Show post submit on click on "submit" */

function navSubmitClick(evt) {
    console.debug("navSubmitClick", evt);
    hidePageComponents();
    $submitForm.show();
}
  
$navSubmit.on("click", navSubmitClick);

/** Show favorited posts "Favorites" */

function putFavoriteStoriesOnPage() {
    console.debug("putFavoriteStoriesOnPage");
  
    $allStoriesList.empty();
  
    // loop through the user's favorites and generate HTML for them
    for (let story of currentUser.favorites) {
        const $story = generateStoryMarkup(story).toggleClass('favorite');
        $allStoriesList.append($story);
    }
  
    $allStoriesList.show();
}

function navFavoritesClick(evt) {
    console.debug("navFavoritesClick", evt);
    hidePageComponents();
    putFavoriteStoriesOnPage();
}
  
$navFavorites.on("click", navFavoritesClick);

/** Show stories created by currentUser */

function putMyStoriesOnPage(){
    console.debug('putMyStoriesOnPage');

    $allStoriesList.empty();

    for (let story of storyList.stories) {
        if (story.author === currentUser.username){
            const $story = generateStoryMarkup(story);
            $allStoriesList.append($story);
            retainFavorite($story);
            $story.addClass('removable');
            console.log($story.html())
            $story.html($story.html() + '<button class="unpublish">Unpublish</button>');
        }
    }
    
    $allStoriesList.show();
}

function navMyStoriesClick(evt){
    console.debug("navMyFavoritesClick", evt);
    hidePageComponents();
    putMyStoriesOnPage();
}

$navMyStories.on('click', navMyStoriesClick);