import React, { useContext } from 'react';
import css from './Profile.module.css';
import publicUrl from 'utils/publicUrl';
import PostThumbnail from './PostThumbnail';
import Header from './Header';
import { Redirect } from "react-router-dom";

import { Link, useParams } from "react-router-dom";
import { StoreContext } from 'contexts/StoreContext';

export default function Profile(){
  let {
    users, posts, followers, currentUserId, addFollower, removeFollower
  } = useContext(StoreContext);

  let {userId} = useParams();
  //const {store} = props;
  const curUser = users.find((userId === undefined) ? user => user.id === currentUserId : user => user.id === userId);

  function getPost(){
    return posts.filter(post => post.userId === curUser.id);
  }

  function countFollower(){
    const followers_cst = followers.filter(follower => follower.userId === curUser.id);
    return followers_cst.length;
  }

  function countFollowing(){
    const following = followers.filter(follower => follower.followerId === curUser.id);
    return following.length;
  }

  function countPost(){
    const posts_cst = getPost();
    return posts_cst.length;
  }

  function getSpecificPost() {
    return getPost().map(post =>
      <Link key={post.id} to={`/${post.id}`}>
        <PostThumbnail props={post} />
      </Link>
    );
  }

  function handleFollow() {
    addFollower(curUser.id, currentUserId);
  }

  function handleUnfollow() {
    removeFollower(curUser.id, currentUserId);
  }

  function renderFollowOrUnfollow(){
    if (curUser.id === currentUserId) {
      return;
    }
    let isFollowing = followers.some(following => following.userId === curUser.id && following.followerId === currentUserId);
    return (
      isFollowing ? <button className={css.unfollowBtn} onClick={handleUnfollow}>Unfollow</button>
      : <button className={css.followBtn} onClick={handleFollow}>Follow</button>
    );
  }

  return (
    !curUser?<Redirect to="login"/>:
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