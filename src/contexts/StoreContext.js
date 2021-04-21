import React, {createContext, useState, useEffect} from 'react';
import initialStore from 'utils/initialStore';
import uniqueId from 'utils/uniqueId';
import { useHistory } from 'react-router-dom';

import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAin7vzpZ_dfWMqKcNGAWbCv22ffGCUcVc",
  authDomain: "bc-web-app-social-media.firebaseapp.com",
  projectId: "bc-web-app-social-media",
  storageBucket: "bc-web-app-social-media.appspot.com",
  messagingSenderId: "723805298030",
  appId: "1:723805298030:web:51a9999944d011df5ff57f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const StoreContext = createContext(); 

function StoreContextProvider(props){

  const db = firebase.firestore();
  const auth = firebase.auth();

  const [currentUserId, setCurrentUserId] = useState(null); // or 'judy'
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(()=>{// initialization
    db.collection('users').get().then(snapshot=>{
      const users = snapshot.docs.map(d=>d.data());
      setUsers(users);
    });
    db.collection('posts').get().then(snapshot=>{
      const posts = snapshot.docs.map(d=>d.data());
      setPosts(posts);
    });
    db.collection('likes').get().then(snapshot => {
      const likes = snapshot.docs.map(d => d.data());
      setLikes(likes);
    });
    db.collection('followers').get().then(snapshot => {
      const followers = snapshot.docs.map(d => d.data());
      setFollowers(followers);
    });
    db.collection('comments').get().then(snapshot => {
      const comments = snapshot.docs.map(d => d.data());
      setComments(comments);
    });
  }, []); // second argument to [] to be called only once

  let history = useHistory();

  function login(email, password){
    auth.signInWithEmailAndPassword(email,password).then((response)=>{
      db.collection('users')
	      .where('email','==', response.user.email)
	      .get()
	      .then(snapshot=>{
          //success
          setCurrentUserId(snapshot.docs[0].data().id); 
          history.push('/');
      })
    }).catch(error=>{
      //fail
      setCurrentUserId(null);
    });
  }

  function signup(email, password, bio, id, name, photo){
    const user = {
      email, id, name, bio, photo
    };
    auth.createUserWithEmailAndPassword(email, password).then(()=>{
      // add a user to the firestore database
      db.collection('users').add(user);
      // add a user to the app state
      setUsers(users.concat(user));
      // set the user as a current user 
      setCurrentUserId(id);
      // route to home
      history.push('/');
    })
  }

  function addLike(postId){
    const like = {
        userId: currentUserId, 
        postId, 
        datetime: new Date().toISOString()
    };
    
    setLikes(likes.concat(like));
    db.collection('likes').add(like);
  }

  function removeLike(postId){
    setLikes(
        likes.filter(like=>!(like.userId===currentUserId && like.postId===postId))
      );
      db.collection('likes')
      .where('userId', '==', currentUserId)
      .where('postId', '==', postId)
      .get()
      .then(snapshot=>snapshot.forEach(doc=>doc.ref.delete()));
  }

  function addComment(postId, text){
    const comment = {
      userId: currentUserId, 
      postId,
      text,
      datetime: new Date().toISOString()
    };
    setComments(
        comments.concat(comment)
    );
    db.collection('comments').add(comment);
  }

  function addPost(photo, desc){
		// TODO:
		// 1. Create a new post object (use uniqueId('post') to create an id)
    const newPost = {
      id: uniqueId('post'),
      userId: currentUserId,
      photo,
      desc,
      datetime: new Date().toISOString()
    };
		// 2. Update the store 
    setPosts(
      posts.concat(newPost)
    );
    db.collection('posts').add(newPost);
  }

  function addFollower(userId, followerId){
    const follower = {
      userId: userId,
      followerId: followerId
    };
    setFollowers(
      followers.concat(follower)
    );
    db.collection('followers').add(follower);
  }

  function removeFollower(userId, followerId){
    setFollowers(
      followers.filter(follower=>!(follower.userId===userId && follower.followerId===followerId))
    );
    db.collection('followers')
      .where('userId', '==', userId)
      .where('followerId', '==', followerId)
      .get()
      .then(snapshot=>snapshot.forEach(doc=>doc.ref.delete()));
  }

	return (
        <StoreContext.Provider value={{signup, login, currentUserId, users, posts, likes, followers, comments, setCurrentUserId, setUsers, setPosts, setLikes, setComments, setFollowers, addLike, removeLike, addComment, addPost, addFollower, removeFollower}}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;