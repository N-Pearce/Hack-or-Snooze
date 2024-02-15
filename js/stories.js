"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <label class="star">
            <input type="checkbox">
            <span></span>
        </label>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
    retainFavorite($story);    
  }

  $allStoriesList.show();
}

/**  Gets user input for submit form and creates new story*/

async function createSubmittedStory(evt) {
    evt.preventDefault();

    const title = $("#submit-title").val();
    const url = $("#submit-url").val();

    console.log(`${title}, ${url}`);
    $submitForm.trigger("reset");

    await storyList.addStory(currentUser, {title, author: currentUser.username, url});

    navAllStories();
}

$submitForm.on("submit", createSubmittedStory);

/** stories retain "favorite" class when flipping through pages*/

function retainFavorite($story){
    for (let favorite of currentUser.favorites){
        if ($story.attr('id') === favorite.storyId){
            $story.addClass('favorite');
        }
    }
}