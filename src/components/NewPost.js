import React, { useState } from 'react';
import { useContext } from 'react';
import css from './NewPost.module.css';
import FileLoader from './FileLoader.js';

import {
  useHistory
} from "react-router-dom";

import { StoreContext } from 'contexts/StoreContext';

function NewPost() {
  const history = useHistory();
  const [dragging, setDragging] = useState(false); // to show a dragging effect
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(''); // to show an error message

  let {
    addPost
  } = useContext(StoreContext);

  function handleFileDragEnter(e){
    setDragging(true);
  }
  function handleFileDragLeave(e){
    setDragging(false);
  }
  function handleFileDrop(e){
    if (e.dataTransfer.types.includes('Files')===false){
			return;
    }
    if (e.dataTransfer.files.length>=1){
      let file = e.dataTransfer.files[0];
      if (file.size>1000000){// larger than 1 MB
        return;
      }
      if (file.type.match(/image.*/)){
				let reader = new FileReader();			
				reader.onloadend = (e) => {
					// TODO: call setPhoto with e.target.result (this is a Base64 image string)
          setPhoto(e.target.result);
				};
				reader.readAsDataURL(file);
			}
    }
    setDragging(false);    
  }
  function handleDescChange(e){
		// TODO: call setDesc
    setDesc(e);
  }
  function handleSubmit(e){
		// TODO:
		// 1. Prevent default behavior
    e.preventDefault();
		// 2. Show error msg if failed and exit
    if (photo === null){
      setError("upload failed. Please try again");
      return;
    }
		// 3. Call the storage update function passed from the parent
    addPost(photo, desc);
    history.push('/');
		// 3. Clear error msg
    setError('');
  }
  function handleCancel(){
    // TODO: Notify the parent about the cancellation
    history.push('/');
  }
  return (
    <div>
        <div className={css.photo}>
          {!photo?  <div className={css.message}>Drop your image</div>:
                    <img src={photo} alt="New Post"/>}
            <FileLoader
              onDragEnter={handleFileDragEnter}
              onDragLeave={handleFileDragLeave}
              onDrop={handleFileDrop}
            >
	            <div className={[css.dropArea, dragging?css.dragging:null].join(' ')}
              ></div>
	          </FileLoader>
          
        </div>
        
        <div className={css.desc} >
					<input type="text" placeholder="add descriptions" value={desc} onChange={e => handleDescChange(e.target.value)}/>
        </div>
        <div className={css.error}>
					{error}
        </div>
        <div className={css.actions}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Share</button>          
        </div>
    </div>
  );
}

export default NewPost;