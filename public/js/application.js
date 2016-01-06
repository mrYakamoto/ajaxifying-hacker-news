$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  vote();
  removePost();
  submitNewPost();
  displayByNew();
});

var vote = function(){
  $( "div.post-container" ).on("click","a.vote-button",function(e){
    e.preventDefault();
    changeColor(this);
    addVote(this);
  })
};

var changeColor = function(voteTag){
  $(voteTag).css("color", "red");
};

var addVote = function(a){
  $.ajax({
    method: 'GET',
    url: a['href']
  }).done(function(postInfo){
    var postObject = JSON.parse(postInfo);
    $( "article#" + postObject["id"] + " span.points" ).html(postObject["points"]);
  });
};

var removePost = function(){
  $( "div.post-container" ).on("click", "a.delete", function(e){
    e.preventDefault();
    deletePost(this);
  })
};

var deletePost = function(a){
  $.ajax({
    method: "DELETE",
    url: a['href']
  })
  .done(function(postId){
    $( "article#" +  postId).remove();
  })
};

var submitNewPost = function(){
  $("form#posts").submit(function(e){
    e.preventDefault();
    displayPost(this);

  })
};

var displayPost = function(form){
  $.ajax({
    data:$(form).serialize(),
    method: "POST",
    url: '/posts'
  })
  .done(function(newPost){
    console.log(newPost);
    if (newPost == "400"){
      alert("400 error: title must not be blank");
    }
    else {
      $( "div.post-container" ).append(newPost)
    }
  })
};

var displayByNew = function(){
  $( "a#display_by_new" ).on('click', function(e){
    e.preventDefault();
    $( "div.post-container" ).empty();
    $.ajax({
      method: "GET",
      url: this["href"]
    })
    .done(function(sortedPosts){
      sortedPosts = JSON.parse(sortedPosts);
      sortedPosts.forEach(function(post){

        $( "div.post-container" ).append(
          "<article id=" + post.id + "><a href='/posts/'" + post.id + "/vote' class='fa fa-sort-desc vote-button'></a><h2><a href='/posts/" + post.id + "'> " + post.title + "</a></h2><p><span class='points'>" + post.points + "</span><span class='username'>" + post.username + "</span><span class='timestamp'>" + post.time_since_creation + "</span><span class='comment-count'>" + post.comment_count + "</span><a class='delete' href='/posts/" + post.id + "'></a></p></article>"
        );


        console.log(post);})
    })
  })
};


















