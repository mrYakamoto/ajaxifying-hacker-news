$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  vote();
  removePost();
  submitNewPost();
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
    $( "div.post-container" ).append(newPost)
  })
};










