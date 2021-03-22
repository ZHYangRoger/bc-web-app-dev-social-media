import React from 'react';
import css from './Profile.module.css';
import publicUrl from 'utils/publicUrl';
import PostThumbnail from './PostThumbnail';
import Header from './Header';

export default function Profile(props){
  const {store} = props;
  const curUser = store.users.find(user => user.id === store.currentUserId);
  
  function getPost(){
    return store.posts.filter(post => post.userId === store.currentUserId);
  }

  function countFollower(){
    const followers = store.followers.filter(follower => follower.userId === store.currentUserId);
    return followers.length;
  }

  function countFollowing(){
    const following = store.followers.filter(follower => follower.followerId === store.currentUserId);
    return following.length;
  }

  function countPost(){
    const posts = getPost();
    return posts.length;
  }

  function getPostElements(){
    return getPost().map(post => <PostThumbnail props={post}/>);
  }

  return (
    <div>
      <Header/>
      <div className={css.header}>
        <img src={publicUrl(curUser.photo)} alt="user photo"/>
        <h2>{curUser.id}</h2>
      </div>
      <div className={css.bio}>
        <div><b>{curUser.name}</b></div>
        <div>{curUser.bio}</div>
      </div>
      <div className={css.info}>
        <section>
          <b>{countPost()}</b>
          <div className={css.weakCenter}>posts</div>
        </section>
        <section>
          <b>{countFollower()}</b>
          <div className={css.weakCenter}>followers</div>
        </section>
        <section>
          <b>{countFollowing()}</b>
          <div className={css.weakCenter}>following</div>
        </section>
      </div>
      <div className={css.posts}>
        {getPostElements()}
      </div>
    </div>

  );
}