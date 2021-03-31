import React from "react";
import css from './Post.module.css';
import publicUrl from 'utils/publicUrl.js';
import {useState} from 'react';

import timespan from 'utils/timespan.js';

import { Link } from "react-router-dom";

export default function Post(props){

    const [comment, setComment] = useState('');
    const [toggleComment, setToggleComment] = useState(false);

    function handleLike() {
        props.onLike(props.post.id);
    }
    
    function handleUnlike() {
        props.onUnlike(props.post.id);
    }

    function handleSubmitComment(event){
        props.onComment(props.post.id, comment); 
        setComment(''); 
        setToggleComment(false); 
        event.preventDefault(); 
    }

    function loopComments(comments){
        const commentList = comments.map((comment)=>
            <li>
                <Link key={comment.userId} to={`/profile/${comment.userId}`}>
                    <b>{comment.userId} </b> 
                </Link>
                {comment.text}
            </li>);
        return (
            <ul>{commentList}</ul>
        );
    }

    return(
        <div className={css.userPost}>
            <div className={css.header}>
                <Link key={props.post.userId} to={`/profile/${props.post.userId}`}>
                    <img src={publicUrl(props.user.photo)} alt="user photo"/>
                </Link>
                <Link key={props.post.userId} to={`/profile/${props.post.userId}`}>
                    <b>{props.user.id}</b>
                </Link>
            </div>
            <div className={css.photo}>
                <img src={publicUrl(props.post.photo)} alt="post photo"/>
            </div>
            <div className={css.infoBar}>
                <div className={css.buttons}>
                    <button>
                    {props.likes.self?
		                <img src={publicUrl('/assets/assets/unlike.svg')} onClick={handleUnlike}alt='Unlike Action'/> :
		                <img src={publicUrl('/assets/assets/like.svg')} onClick={handleLike}alt='Like Action'/> 
	                }
                    </button>
                    <button onClick={e=>setToggleComment(!toggleComment)}>
                        <img src={publicUrl('/assets/assets/comment.svg')} alt="comment"/>
                    </button>
                </div>
                <div className={css.likeCount}>
                    <p><b>{props.likes.count} likes</b></p>
                </div>
                <div className={css.userDescAndComments}>
                    <p>
                        <Link key={props.post.userId} to={`/profile/${props.post.userId}`}>
                            <b>{props.post.userId}</b> {props.post.desc}
                        </Link>
                    </p>
                    <p>
                        {loopComments(props.comments)}
                    </p>
                </div>
                <p className={css.time}>{timespan(props.post.datetime)} ago</p>
                <div>
                    {toggleComment && <form className={css.addComment} onSubmit={handleSubmitComment}>
                        <input type="text" placeholder="Add a comment…" value={comment} onChange={e=>setComment(e.target.value)}/>
                        <button type="submit">Post</button>
                    </form>
                    }
                </div>
            </div>
        </div>
    );
}
 