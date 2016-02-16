get '/' do
  redirect '/posts'
end

get '/posts' do
  @posts = Post.all
  erb :index
end

get '/posts/:id/vote' do
  post = Post.find(params[:id])
  vote = post.votes.create(value: 1)
  if request.xhr?
    {points: post.points, id: params[:id]}.to_json
  else
    redirect '/posts'
  end
end

delete '/posts/:id' do
   post = Post.find(params[:id])
   post.votes.each{ |vote| vote.destroy}
   post.destroy
   return params[:id].to_s
end

post '/posts' do
  p params
  @post = Post.new( title: params[:title],
               username: Faker::Internet.user_name,
               comment_count: rand(1000) )
  if @post.save
    erb :_new_post, :layout => false
  else
    "400"
  end
end

get '/post/:id' do
  @post = Post.find(params[:id])
  erb :post
end

get '/sort/:by' do
  if params[:by] == "new"
    @posts = Post.order('created_at ASC').to_json
  end
end
