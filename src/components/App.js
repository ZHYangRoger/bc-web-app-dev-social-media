//import logo from './logo.svg';
import css from './App.module.css';
import React from 'react';
import publicUrl from 'utils/publicUrl';

export function Header(){
  return (
    <nav className={css.header}>
      <div className={css.navItem}>
              <button>
                  <img src={publicUrl('/assets/camera.svg')} alt="Camera"/>
              </button>
      </div>
      <div>
              <button>
                  <img src={publicUrl('/assets/logo.png')} alt="Logo"/>
              </button>
      </div>
      <div className={css.navItem}>
              <button>
                  <img src={publicUrl('/assets/message.svg')} alt="Message"/>
              </button>
      </div>
    </nav>
  );
}

export function Home(){
  return (
    <div>
      Home
    </div>
  );
}

export function Navbar(){
  return (
    <nav className={css.navbar}>
        <div className={css.navItem}>
            <button>
                <img src={publicUrl('/assets/home.svg')} alt="Home"/>
            </button>
        </div>
        <div className={css.navItem}>
            <button>
                <img src={publicUrl('/assets/explore.svg')} alt="Explore"/>
            </button>
        </div>
        <div className={css.navItem}>
            <button>
                <img src={publicUrl('/assets/newpost.svg')} alt="Newpost"/>
            </button>
        </div>
        <div className={css.navItem}>
            <button>
                <img src={publicUrl('/assets/activity.svg')} alt="Activity"/>
            </button>
        </div>
        <div className={css.navItem}>
            <button>
                <img src={publicUrl('/assets/profile.svg')} alt="Profile"/>
            </button>
        </div>
    </nav>
);
}

function mainPage(){
  return (
    <div className={css.container}>
      <Header/>
      <main className={css.content}>
        <Home/>
      </main>
      <Navbar/>
    </div>
  );
}

export default mainPage;

