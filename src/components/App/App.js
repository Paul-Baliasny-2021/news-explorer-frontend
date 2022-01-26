import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Preloader from '../Preloader/Preloader';
import SavedNews from '../SavedNews/SavedNews';
import savedArticles from '../../utils/constants';
import './App.css';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SignupSuccessPopup from '../SignupSuccessPopup/SignupSuccessPopup';

function App() {

  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isSavedArticle, setIsSavedArticle] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);
  const [isSearchOn, setIsSearchOn] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);

  function login() {
    setIsLoginModalOpen(true)
  }

  function closeAllPopups() {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    setIsSuccessModalOpen(false);
    setIsMobileNavbarOpen(false);
  };

  useEffect(() => {
    const closeByEscape = (e) => {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [])

useEffect(() => {
  const closePopupOnRemoteClick = (e) => {
      if (e.target.classList.contains("popup")) {
          closeAllPopups();
          e.stopPropagation();
      }
  }
  document.addEventListener('click', closePopupOnRemoteClick)
  return () => document.removeEventListener('click', closePopupOnRemoteClick)
}, []);

  function signUp() {
    setIsSignupModalOpen(true)
  }

  function handleSignOut() {
    setIsSignedIn(false);
  };

  function startSearch() {
  }

  function addToSaved(card) {
    savedArticles.push(card);
    setIsSavedArticle(true);
  };

  function openMobileNavbar() {
    setIsMobileNavbarOpen(true)
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Header
              isSignedIn={isSignedIn}
              onLogout={handleSignOut}
              onLogin={login}
              onSearchClick={startSearch}
              onBurgerClick={openMobileNavbar}
              isMobileNavbarOpen={isMobileNavbarOpen}
              onClose={closeAllPopups} />

            <SigninPopup
              isOpen={isLoginModalOpen}
              onClose={closeAllPopups}
              onAltClick={() => {
                closeAllPopups();
                signUp();
              }
              }
              onSubmit={() => {
                setIsSignedIn(true);
                closeAllPopups()
              }} />

            <SignupPopup
              isOpen={isSignupModalOpen}
              onClose={closeAllPopups}
              onAltClick={() => {
                closeAllPopups()
                login();
              }}
              onSignUp={() => {
                closeAllPopups();
                setIsSuccessModalOpen(true);
              }}
            />

            <SignupSuccessPopup
              isOpen={isSuccessModalOpen}
              onClose={() => {
                closeAllPopups();
                setIsSignedIn(false);
              }}
              onAltClick={() => {
                closeAllPopups();
                login()
              }}
            />

            {isSearching && <Preloader />}

            <Main
              isSignedIn={isSignedIn}
              isSearchOn={isSearchOn}
              isSearchSuccessful={isSearchSuccessful}
              onBookmarkClick={addToSaved}
              isSavedArticle={isSavedArticle}
            />
          </Route>
          <Route path='/saved-news'>
            <SavedNewsHeader
              onLogout={handleSignOut}
              onBurgerClick={openMobileNavbar}
              isMobileNavbarOpen={isMobileNavbarOpen}
              onClose={closeAllPopups} />
            <SavedNews />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
