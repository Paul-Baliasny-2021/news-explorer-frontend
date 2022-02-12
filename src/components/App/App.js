import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Preloader from '../Preloader/Preloader';
import SavedNews from '../SavedNews/SavedNews';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SigninPopup from '../SigninPopup/SigninPopup';
import SignupPopup from '../SignupPopup/SignupPopup';
import SignupSuccessPopup from '../SignupSuccessPopup/SignupSuccessPopup';
import SignupFailurePopup from '../SignupFailurePopup/SignupFailurePopup';
import SigninFailurePopup from '../SigninFailurePopup/SigninFailurePopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { convertDateFormat, normalizeString } from '../../utils/constants';
import newsApi from '../../utils/NewsAPI';
import mainApi from '../../utils/MainAPI';
import * as auth from '../../utils/auth';

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSavedArticle, setIsSavedArticle] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(false);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [isSigninFailureModalOpen, setIsSigninFailureModalOpen] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const [returnedArticles, setReturnedArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [savedArticlesCategoryList, setSavedArticlesCategoryList] = useState([])

  const checkToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsSignedIn(false);
      setCurrentUser({});
    }
    if (token) {
      auth.checkContent(token)
        .then((returnedUserData) => {
          setIsSignedIn(true);
          setCurrentUser(returnedUserData.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, []);

  useEffect(() => {
    checkToken()
  }, [checkToken])

  function login() {
    setIsLoginModalOpen(true)
  }

  useEffect(() => {
    mainApi.getSavedArticles()
      .then(res => {
        setSavedArticles(res.data);
        setSavedArticlesCategoryList([...new Set(res.data.map(data => data.keyword))].sort())
        // console.log([...new Set(res.data.map(data => data.title + " " + data._id))])
      })
      .catch(err => {
        console.log(`Server returned this error: ${err.status}`)
      })
  }, [currentUser, isSignedIn])

  function handleSearch(entryValue) {
    if (!entryValue) {
      alert('Please enter a keyword')
    } else {
      setIsSearching(true);
      newsApi.getArticles(entryValue)
        .then(res => {
          // console.log(res, savedArticles)
          if (res.articles.length === 0) {
            setIsSearchSuccessful(false)
          }
          setReturnedArticles(res.articles.map(data => data));
          setKeyword(entryValue);
          // console.log(res.articles.map(data => data.title).some(item => savedArticles.map(data => data.title).includes(item)));
          // console.log(res.articles.map(data => data.title).filter(item => savedArticles.map(data => data.title).includes(item)));
        })
        .then(setIsSearchSuccessful(true))
        .catch(err => {
          console.log(err)
          setIsSearchSuccessful(false)
        })
        .finally(() => {
          setIsSearching(false);
          setIsSearchOn(true);
        });
    };
  };

  function closeAllPopups() {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    setIsSuccessModalOpen(false);
    setIsMobileNavbarOpen(false);
    setIsFailureModalOpen(false);
    setIsSigninFailureModalOpen(false);
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
    localStorage.clear();
  };

  function handleBookmarkClick(card) {
    const isSaved = savedArticles.map(data => data.title).some(item => item === card.title)
    const savedArticle = savedArticles.map(data => data).find((item) => item.title === card.title)
    if (!isSaved) {
      // console.log(isSaved)
      mainApi.saveNewArticle({
        title: card.title,
        keyword: normalizeString(keyword),
        text: card.content,
        date: convertDateFormat(new Date(card.publishedAt)),
        source: card.source.name,
        link: card.url,
        image: card.urlToImage,
      })
        .then(res => {
          // console.log(res.data);
          setSavedArticles([res.data, ...savedArticles])
          setIsSavedArticle(true);
          // console.log("card was added to saved list", savedArticles)
        })
        .catch(err => {
          console.log(err)
        })
      newsApi.getArticles(keyword)
        .then(res => {
          setReturnedArticles(res.articles.map(data => data));
          setIsSearchSuccessful(true)
        })
    } if (isSaved) {
      // console.log(isSaved, savedArticle._id, savedArticlesCategoryList)
      mainApi.deleteArticle(savedArticle._id)
        .then(() => {
          setSavedArticles(savedArticles.filter((item) => item.title !== savedArticle.title));
          setIsSavedArticle(false)
          // console.log('card was deleted', savedArticles)
        })
        .catch(err => {
          console.log("Server returned this error:", err)
        })
    }
  }

  function displaySavedArticlesPage() {
    mainApi.getSavedArticles()
      .then(res => {
        // console.log(res.data)
        setSavedArticles(res.data);
        setSavedArticlesCategoryList([...new Set(res.data.map(data => data.keyword))].sort());
      })
      .catch(err => {
        console.log(`Server returned this error: ${err.status}`)
      })
  }

  function removeFromSaved(card) {
    mainApi.deleteArticle(card._id)
      .then((res) => {
        // console.log(res)
        setSavedArticles(savedArticles.filter((item) => item._id !== card._id));
        setSavedArticlesCategoryList([...new Set(res.data.map(data => data.keyword))].sort())
      })
      .catch(err => {
        console.log("Server returned this error:", err)
      })
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
              keyword={keyword}
              currentUsername={currentUser.name}
              showSavedPage={displaySavedArticlesPage}
            />

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
                closeAllPopups();
                window.location.reload()
              }}
              handleError={() => {
                closeAllPopups()
                setIsSigninFailureModalOpen(true)
              }}
              checkToken={checkToken}
            />

            <SigninFailurePopup
              isOpen={isSigninFailureModalOpen}
              onClose={() => {
                closeAllPopups();
                setIsSignedIn(false);
              }}
              onAltClick={() => {
                closeAllPopups();
                setIsLoginModalOpen(true)
              }
              }
            />

            <SignupPopup
              isOpen={isSignupModalOpen}
              onClose={closeAllPopups}
              onAltClick={() => {
                closeAllPopups()
                login();
              }}
              handleError={() => {
                closeAllPopups();
                setIsFailureModalOpen(true)
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

            <SignupFailurePopup
              isOpen={isFailureModalOpen}
              onClose={() => {
                closeAllPopups();
                setIsSignedIn(false);
              }}
              onAltClick={() => {
                closeAllPopups();
                setIsSignupModalOpen(true)
              }
              }
            />

            {isSearching && <Preloader />}

            <Main
              isSignedIn={isSignedIn}
              isSearchOn={isSearchOn}
              isSearchSuccessful={isSearchSuccessful}
              onBookmarkClick={handleBookmarkClick}
              openSigninModal={login}
              isSavedArticle={isSavedArticle}
              savedArticles={savedArticles}
              articles={returnedArticles}
            />
          </Route>
          <CurrentUserContext.Provider value={currentUser}>
            <ProtectedRoute path='/saved-news' isSignedIn={isSignedIn}>
              <SavedNewsHeader
                currentUsername={currentUser.name}
                onLogClick={handleSignOut}
                onBurgerClick={openMobileNavbar}
                isMobileNavbarOpen={isMobileNavbarOpen}
                onClose={closeAllPopups}
                savedArticles={savedArticles}
                categoryList={
                  savedArticlesCategoryList.length > 3 ?
                    savedArticlesCategoryList.slice(0, 2).join(', ') + ` and ${savedArticlesCategoryList.length - 2} others`
                    : savedArticlesCategoryList.join(', ')
                } />
              <SavedNews
                savedArticles={savedArticles}
                onDeleteClick={removeFromSaved} />
            </ProtectedRoute>
          </CurrentUserContext.Provider>
          <Route path='/saved-news'>
            {isSignedIn ? <Redirect to='/saved-news' /> : <Redirect to='/' />}
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
