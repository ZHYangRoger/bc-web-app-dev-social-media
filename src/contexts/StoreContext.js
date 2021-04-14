import React, {createContext, useState, useEffect} from 'react';
import initialStore from 'utils/initialStore';
import uniqueId from 'utils/uniqueId';

export const StoreContext = createContext(); 

function StoreContextProvider(props){
    const [store, setStore] = useState(()=>{
        return JSON.parse(window.localStorage.getItem('store')) || initialStore;
    });

  function addLike(postId){
    const like = {
        userId: store.currentUserId, 
        postId, 
        datetime: new Date().toISOString()
    };
    
    setStore({
          ...store,
          likes: store.likes.concat(like)
    });
  }

  function removeLike(postId){
    setStore({
        ...store,
        likes: store.likes.filter(like=>!(like.userId===store.currentUserId && like.postId===postId))
      });
  }

  function addComment(postId, text){
    const comment = {
      userId: store.currentUserId, 
      postId,
      text,
      datetime: new Date().toISOString()
    };
    setStore({
      ...store,
        comments:store.comments.concat(comment)
    });
  }

  function addPost(photo, desc){
		// TODO:
		// 1. Create a new post object (use uniqueId('post') to create an id)
    const newPost = {
      id: uniqueId('post'),
      userId: store.currentUserId,
      photo,
      desc,
      datetime: new Date().toISOString()
    };
		// 2. Update the store 
    setStore({
      ...store,
      posts: store.posts.concat(newPost)
    });
  }

  function addFollower(userId, followerId){
    const follower = {
      userId: userId,
      followerId: followerId
    };
    setStore({
      ...store,
      followers :store.followers.concat(follower)
    });
  }

  function removeFollower(userId, followerId){
    setStore({
      ...store,
      followers: store.followers.filter(follower=>!(follower.userId===userId && follower.followerId===followerId))
    });
  }

  useEffect(()=>{
    window.localStorage.setItem('store', JSON.stringify(store));
  }, [store]);

	return (
        <StoreContext.Provider value={{...store, addComment, addLike, removeLike, addPost, addFollower, removeFollower}}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;