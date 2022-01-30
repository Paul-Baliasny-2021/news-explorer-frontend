import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Preloader from '../Preloader/Preloader';
import SavedNews from '../SavedNews/SavedNews';
import savedArticles from '../../utils/constants';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SignupSuccessPopup from '../SignupSuccessPopup/SignupSuccessPopup';
import newsApi from '../../utils/NewsAPI';
import { convertDateFormat } from '../../utils/constants';

function App() {

  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isSavedArticle, setIsSavedArticle] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(false);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const [returnedArticles, setReturnedArticles] = useState([]);
  const [keyword, setKeyword] = useState("");


  function login() {
    setIsLoginModalOpen(true)
  }

  function handleSearch(searchEntry) {
    setKeyword(searchEntry)
    setIsSearching(true)
    newsApi.getArticles(searchEntry)
      .then(res => {
        if (res.articles.length === 0) {
          setIsSearchSuccessful(false)
        }
        setReturnedArticles(res.articles.map(data => data));
      })
      .then(setIsSearchSuccessful(true))
      .catch(err => {
        console.log(err)
        setIsSearchSuccessful(false)
      })
      .finally(() => {
        setIsSearching(false);
        setIsSearchOn(true)
      });
  };

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

  function addToSaved(card) {
    isSavedArticle ? setIsSavedArticle(false) : savedArticles.push(card);
    isSavedArticle ? setIsSavedArticle(false) : setIsSavedArticle(true);
    console.log(savedArticles)
  };

  function removeFromSaved(card) {
    console.log(card)
    savedArticles.filter(data => card)
  }

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
              onBurgerClick={openMobileNavbar}
              isMobileNavbarOpen={isMobileNavbarOpen}
              onClose={closeAllPopups}
              onKeywordSubmit={handleSearch}
              setKeyword={setKeyword}
              keyword={keyword} />

            <SigninPopup
              isOpen={isLoginModalOpen}
              onClose={closeAllPopups}
              onAltClick={() => {
                closeAllPopups();
                signUp();
              }
              }
              isFormValid={true}
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
              articles={returnedArticles}
            />
          </Route>
          <Route path='/saved-news'>
            <SavedNewsHeader
              onLogClick={handleSignOut}
              onBurgerClick={openMobileNavbar}
              isMobileNavbarOpen={isMobileNavbarOpen}
              onClose={closeAllPopups} 
              category={keyword} />
            <SavedNews 
            category={keyword} 
            onDeleteClick={removeFromSaved} />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
