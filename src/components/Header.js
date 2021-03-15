import React from 'react';
import css from './Header.module.css';
import publicUrl from 'utils/publicUrl';

export default function Header(){
    return (
      <nav className={css.header}>
        <div className={css.navItem}>
                <button>
                    <img src={publicUrl('/assets/assets/camera.svg')} alt="Camera"/>
                </button>
        </div>
        <div>
                <button>
                    <img src={publicUrl('/assets/assets/logo.png')} alt="Logo"/>
                </button>
        </div>
        <div className={css.navItem}>
                <button>
                    <img src={publicUrl('/assets/assets/message.svg')} alt="Message"/>
                </button>
        </div>
      </nav>
    );
  }