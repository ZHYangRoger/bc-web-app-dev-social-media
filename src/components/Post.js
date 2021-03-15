import React from "react";
import css from './Post.module.css';
import publicUrl from 'utils/publicUrl.js';

import timespan from 'utils/timespan.js';

export default function Post(props){
    return(
        <div className={css.userPost}>
            <div className={css.header}>
                <img src={publicUrl(props.user.photo)} alt="user photo"/>
                <b>{props.user.id}</b>
            </div>
            <div className={css.photo}>
                <img src={publicUrl(props.post.photo)} alt="post photo"/>
            </div>
            <div className={css.infoBar}>
                <div className={css.buttons}>
                    <button>
                        <img src={props.likes.self ? publicUrl('/assets/assets/unlike.svg') : publicUrl('/assets/like.svg')} alt="like"/>
                    </button>
                    <button>
                        <img src={publicUrl('/assets/assets/comment.svg')} alt="comment"/>
                    </button>
                </div>
                <div className={css.likeCount}>
                    <p><b>{props.likes.count} likes</b></p>
                </div>
                <div className={css.userDescAndComments}>
                    <p>
                        <b>{props.post.userId}</b> {props.post.desc}
                    </p>
                    <p>
                        {loopComments(props.comments)}
                    </p>
                </div>
                <p className={css.time}>{timespan(props.post.datetime)} ago</p>
            </div>
        </div>
    );
}

export function loopComments(comments){
    const commentList = comments.map((comment)=>
        <li><b>{comment.userId}</b> {comment.text}</li>);
    return (
        <ul>{commentList}</ul>
    );
}