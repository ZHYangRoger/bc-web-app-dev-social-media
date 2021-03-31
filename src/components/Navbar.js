import React from 'react';
import css from './Navbar.module.css';
import publicUrl from 'utils/publicUrl';

import {
    Link
  } from "react-router-dom";

export default function Navbar(props){
    return (
      <nav className={css.navbar}>
          <div className={css.navItem}>
            <Link to="/">
                <img src={publicUrl('/assets/assets/home.svg')} alt="Home"/>
            </Link>
          </div>
          <div className={css.navItem}>
            <Link to="/explore">
                <img src={publicUrl('/assets/assets/explore.svg')} alt="Explore"/>
            </Link>
          </div>
          <div className={css.navItem}>
            <Link to="/newpost">
                <img src={publicUrl('/assets/assets/newpost.svg')} alt="Newpost"/>
            </Link>
          </div>
          <div className={css.navItem}>
            <Link to="/activity">
                <img src={publicUrl('/assets/assets/activity.svg')} alt="Activity"/>
            </Link>
          </div>
          <div className={css.navItem}>
            <Link to="/profile">
                <img src={publicUrl('/assets/assets/profile.svg')} alt="Profile"/>
            </Link>
          </div>
      </nav>
  );
  }