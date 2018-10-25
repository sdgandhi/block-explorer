import React, { Component } from "react";
import ReactGA from "react-ga";
import ElphUtils from "./ElphUtils";

const GA_CODE = "UA-117076422-4";
const GA_OPTIONS = ElphUtils.isDev() ? { testMode: true, debug: true } : {};

export const initializeTracker = (gaCode = GA_CODE, gaOptions = GA_OPTIONS) => {
  ReactGA.initialize(gaCode, gaOptions);
};

// A Component wrapper that will automatically keep track of page views.
const withTracker = WrappedComponent => {
  const trackPage = page => {
    ReactGA.set({ page });
    ReactGA.pageview(page);
  };

  // A Higher Order Component (HOC) that wraps the specified component.
  const AnalyticsHOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname + this.props.location.search;
      trackPage(page);
    }

    componentDidUpdate(prevProps) {
      const currentPage = prevProps.location.pathname + prevProps.location.search;
      const nextPage = this.props.location.pathname + this.props.location.search;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return AnalyticsHOC;
};

export default withTracker;
