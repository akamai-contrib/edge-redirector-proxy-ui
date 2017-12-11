# EDGEREDIRECTOR-PROXY UI

The goal of **EDGE-REDIRECTOR-PROXY** is to have a single UI mechanism for
managing Akamai redirects, leveraging the Open-Akamai API.

## Prerequisities

```
Node
Bower
Gulp
Yarn (Optional)
```

## A note about services this UI consumes

This SPA is setup to run locally. It utilizes any of the following for service
provided data:

1. [Edge Redirector Proxy Server docs.](http://api-mydeployedserver.com/docs)
2. [Edge Redirector Proxy Server available on your local machine](https://github.com/akamai-contrib/edge-redirector-proxy-server)
3. Mock Data available directly in the UI app repo. (Just select Dummy Data
   Policy)

## Getting started

1. Clone this repo, and change your directory to the root of the installation.
2. Run `npm install` to install all of the server dependencies.
3. Run `bower install` to install all of the UI dependencies.
4. Run `npm run gulp`, to build the /dist directory and serve it (this will
   watch for active development).

**Note** The application currently requires Node < 7 to run. `v6.10.3` is
recommended.

## TODO

1. Better componetize reusable views/client logic in a sustainable format.
2. Allow for better consumption of mock data.
3. Pagination on tables.
4. User preferences.
5. The ability to load all view data from services (excluding validation) and
   store it in local storage to avoid unnecessary load times on view switching.
   Would timestamp last time data was pulled, and allow refresh data capability
   in each view.
6. Performance test watchers, modals seem to work slowly, especially in table
   tools.
7. Design dashboard UI.
8. Cleanup some of the sass.

## Known Issues

1. None as of this commit.
