import React from 'react';
import css from './Profile.module.css';
import publicUrl from 'utils/publicUrl';
import PostThumbnail from './PostThumbnail';
import Header from './Header';

import { Link, useParams } from "react-router-dom";

export default function Profile(props){
  let {userId} = useParams();
  const {store} = props;
  const curUser = store.users.find((userId === undefined) ? user => user.id === store.currentUserId : user => user.id === userId);

  function getPost(){
    return store.posts.filter(post => post.userId === curUser.id);
  }

  function countFollower(){
    const followers = store.followers.filter(follower => follower.userId === curUser.id);
    return followers.length;
  }

  function countFollowing(){
    const following = store.followers.filter(follower => follower.followerId === curUser.id);
    return following.length;
  }

  function countPost(){
    const posts = getPost();
    return posts.length;
  }

  function getSpecificPost() {
    return getPost().map(post =>
      <Link key={post.id} to={`/${post.id}`}>
        <PostThumbnail props={post} />
      </Link>
    );
  }

  function handleFollow() {
    props.onFollow(curUser.id, store.currentUserId);
  }

  function handleUnfollow() {
    props.onUnfollow(curUser.id, store.currentUserId);
  }

  function renderFollowOrUnfollow(){
    if (curUser.id === store.currentUserId) {
      return;
    }
    let isFollowing = store.followers.some(following => following.userId === curUser.id && following.followerId === store.currentUserId);
    return (
      isFollowing ? <button className={css.unfollowBtn} onClick={handleUnfollow}>Unfollow</button>
      : <button className={css.followBtn} onClick={handleFollow}>Follow</button>
    );
  }

  return (
    <div>
      <Header/>
      <div className={css.header}>
        <img src={publicUrl(curUser.photo)} alt="user photo"/>
        <div>
          <h2>{curUser.id}</h2>
          {renderFollowOrUnfollow()}
        </div>
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
        {getSpecificPost()}
      </div>
    </div>

  );
}