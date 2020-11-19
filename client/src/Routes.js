import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Loader from './components/Loader';

import ReservationProvider from './Store/ReservationProvider';

import './App.css';

// Home page
const Banner = lazy(() => import('./components/Banner'));
const Row = lazy(() => import('./components/Row'));

// Explore all page
const ExploreAll = lazy(() => import('./components/ExploreAll'));

// Showtimings page
const ShowTimings = lazy(() => import('./components/ShowTimings'));

// Booking page
const Booking = lazy(() => import('./components/Booking'));

// Sign Ip and sign In page
const Form = lazy(() => import('./components/Form'));

// Payment success page
const PaymentSuccess = lazy(() => import('./components/PaymentSuccess'));

// Page not found 404 page
// const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <ReservationProvider>
          <div className="app">
            <Route path="/" exact component={Banner} />
            <Route
              path="/"
              exact
              render={(props) => <Row {...props} type="playingnow" />}
            />
            <Route
              path="/"
              exact
              render={(props) => <Row {...props} type="comingsoon" />}
            />
            <Switch>
              <Route path="/playingnow" exact component={ExploreAll} />
              <Route path="/comingsoon" exact component={ExploreAll} />
              <Route path="/signin" exact component={Form} />
              <Route path="/signup" exact component={Form} />
              <Route path="/booking" exact component={Booking} />
              <Route path="/payment-success" exact component={PaymentSuccess} />
              <Route
                path="/showtimings/:movieId"
                exact
                component={ShowTimings}
              />
              {/* <Route component={PageNotFound} /> */}
            </Switch>
          </div>
        </ReservationProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routes;