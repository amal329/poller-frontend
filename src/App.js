import './styles/common.css';
import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import CreatePoll from './components/CreatePoll';
import Profile from './components/Profile';
import Home from './components/Home';
import Search from './components/Search';
import PollDetail from './components/PollDetail';
import { Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='maincontent'>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile/:username' element={<Profile/>}/>
          <Route path='/poll/new' element={<CreatePoll/>}/>
          <Route path='/poll/view/:id' element={<PollDetail/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/' element={<Welcome/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
