import css from './Home.module.css';
import publicUrl from 'utils/publicUrl';

import Post from './Post';

import { useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import { StoreContext } from 'contexts/StoreContext';

export default function Home(){
	let {
		posts, users, comments, likes, currentUserId, 
		addComment, addLike, removeLike
	} = useContext(StoreContext);

	let {postId} = useParams();
	//const {store} = props;

	function findUser(post){
		return users.find(user=>user.id===post.userId);
	  }
	
	function findComments(post){
	  return comments.filter(comment=>comment.postId===post.id);
	}
	
	function findLikes(post){
	  let postLikes = likes.filter(like=>like.postId===post.id);
	  return {
		self: postLikes.some(like=> like.userId===currentUserId),
		count: postLikes.length
	  }
	}

    return (
	<div>
		{posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
		.filter((postId === undefined) ? post => post : post => post.id === postId)
		.map(post=>
			<Post
			key={post.id}
			user={findUser(post)}
			post={post}
			comments={findComments(post)}
			likes={findLikes(post)}
			onLike={addLike} 
  			onUnlike={removeLike}
			onComment={addComment}
			/>)}
  	</div>
	);
}



