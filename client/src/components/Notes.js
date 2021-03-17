import React from 'react';
import Header from './notes/Nav';
import Home from './notes/Home';
import CreateNote from './notes/CreateNote';
import EditNote from './notes/EditNote';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function Notes({setIsLogin}) {
	return (
  <Router>
   <div className="notes-page">
    <Header setIsLogin={setIsLogin} />
    <section>
     <Route path="/" exact component={Home} />
     <Route path="/create" exact component={CreateNote} />
     <Route path="/edit/:id" exact component={EditNote} />
    </section>
   </div>
  </Router>
 );
}
