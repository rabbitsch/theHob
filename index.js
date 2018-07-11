
//My API keys, URLs
const youtubeApi= 'AIzaSyDdUGDSs5Dp-Z4ZtRGyKv8IenmvXxfV-wI'

const endPointYou = 'https://www.googleapis.com/youtube/v3/search'

const endPointWiki ='https://en.wikipedia.org/w/api.php' 



//click submit button, to recognize search results
$(function(){
$("form").submit('submit',function(event){
  event.preventDefault();
  
  let queryTarget= $(event.currentTarget).find('#js-query');
  let findings = queryTarget.val();
  let final = "teach me " + findings
  
  queryTarget.val(" ");
 
  getWikiData(findings);
  getYoutubeData(final);
  getGoogleBookData(findings);
 
   })

})



//retrieve youtube Data
function getYoutubeData(searchTerms){
  let objTubeFunct = {
      part: "snippet",
      type: "video",
      q: searchTerms,
      maxResults: 8,
      order: "viewCount",
     key: youtubeApi,
     url:endPointYou,
}
   
  $.getJSON(endPointYou,objTubeFunct, function(data){
  
  
  renderTubeData(data.items);

})
}



//retrieve Google Book Data
function getGoogleBookData(searchTerm3){
  $.ajax({
      dataType: "json",
    //  key:youtubeApi ,
     url:'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm3,
     success: function(data){
       renderGoogleBookData(data.items);
     },
     type: "GET"
})


}



//Shows Error if user puts wrong info
function showNoContentSection () {
  $('.no-content').css('display', 'block')
  $('.hobby-contents').css('display', 'none')
}



//retrieve Wiki Data and Render Wiki content
function getWikiData(searchTerm2){
  let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm2}&format=json&callback=?`

  let objWikiFunct = {
    format: JSON,
    query: searchTerm2,
    url: endPointWiki,
    maxResults:1
  
  }
  
  $.getJSON(url,objWikiFunct, function(data){
    
    if (data[1].length === 0) {
      return showNoContentSection()
    }

    $('.no-content').css('display', 'none')
    $('.hobby-contents').css('display', 'block')

   $("#wikicontent").html(" ");
    
    let html = `
      <h2 class="wikiTitle">${data[1][0]}</h2>
      <p>${data[2][0]}</p>
      <p>
        <small>
          <a target="_blank" href="${data[3][0]}">
            See ${data[1][0]} in Wikipedia
          </a>
        </small>
      </p>
    `

    $("#wikicontent").append(html);
   
  })

}

//Render and display Google Book Information
function renderGoogleBookData(results){
  $(".bookcls").html("");
  $(".bookcls").html(`<h2 class="conHead">Books</h2>`);
  results.forEach(function(value){
    
     let html = `
      <li class="book-cls">
        <h1 id="booktitle">${value.volumeInfo.title}</h1>
          <img src ="${value.volumeInfo.imageLinks.thumbnail}" alt="book-image">
        </a>
        <p class="bkdes">${value.volumeInfo.description}</p>
        <a href="${value.accessInfo.webReaderLink}" target="_blank"> See ${value.volumeInfo.title} Here</a>
      </li>
    `
    $(".bookcls").append(html);

  })
}




//Render and Display Youtube Data
function renderTubeData(results){
  $(".youtube").html(" ");
  $(".youtube").html(`<h1 class="conHead">Videos</h1>`);
  results.forEach(function(value){
    let html = `
      <li class="youtube-cls">
        <h2 id="tubetitle">${value.snippet.title}</h2>
        <a href="https://youtube.com/watch?v=${value.id.videoId}" target="_blank">
          <img src ="${value.snippet.thumbnails.medium.url}" class="imgtube" alt="youtube-image">
        </a>
        <p>${value.snippet.description}</p>
      </li>
    `
    $(".youtube").append(html);
     
}
)}
