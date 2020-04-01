# Redux

- aims to make state management more predictable thanks to single state tree: single source of truth
- interactions: get state, listen to state changes, update state
- the \*store\*\* = the state tree and the 3 ways of interacting with it

### Store

- `Redux.createStore()` => exposes getState which returns existing state variable
- subscribe function (takes in functions that will be called when the state changes) => informs of changes on state (passed a function and returns a function)
- only an event can change the state of the store: tracked by an **Action**: plain JS Object with a type property & an optional payload (pass thru as little as possible)

e.g.

```javascript
{
  type: ADD_PRODUCT_TO_CART,
  productId: 17
}
```

- prefer constants over strings for spellcheck!
- **Action Creators**: fns that create/return action objects; called by store.dispatch & can accept payload e.g id
  e.g.

```javascript
const addItem = item => ({
  type: ADD_ITEM,
  item
});
```

- update state inside store w **dispatch**: called with an Action => hits reducer

## Rules

1. only an event can change state of the store: **actions**
2. function that returns new state must be a pure function (no side effects, same output w same args, relies solely on args): **reducers**

- createStore(reducer) => store.subscribe(() => store.getState()), store.dispatch({type: 'BLAH'})

- use Object.assign({}, // code) => avoid modifying state directly => pure function
- use switch statement for multiple actions
- use separate reducers for different areas of functionality => responsibility for different slices of the state tree
- createStore only accepts single reducer => combined into one with `Redux.combineReducers({reducer1, reducer2})`
- use spread operators in reducers => immutability: state is read-only

## Middleware

> …a third-party extension point between dispatching an action, and the moment it reaches the reducer. (Redux docs)
> Useful for:

- producing a side effect (e.g., logging information about the store)
- processing action itself (e.g., making an asynchronous HTTP request)
- redirecting the action (e.g., to another piece of middleware)
- dispatching supplementary actions

Uses currying pattern: Higher Order Functions
e.g.

```javascript
function checker() {
  return function(next) {
    return function(action) {
      // whatever: access to store & action

      // next - if we have more than one middleware moves onto the next or if none left, the dispatch fn
      return next(action);
    };
  };
}
```

- pass in middleware as 2nd arg to createStore: `Redux.applyMiddleware(myMiddleware)`
  e.g.

```javascript
const store = Redux.createStore(rootReducer, Redux.applyMiddleware(checker));
```

- multiple middleware possible - e.g. logging:

```javascript
const logger = store => next => action => {
  console.group(action.type);
  console.log("The action", action);
  const result = next(action);
  console.log("The new state is", store.getState());
  console.groupEnd();
  return result;
};

const store = Redux.createStore(
  Redux.combineReducers({
    todos,
    goals
  }),
  Redux.applyMiddlware(checker, logger)
);
```

- possible to forceUpdate() on component to re-render on changes:

```javascript
store.subscribe(() => this.forceUpdate());
```

### Asynchronous Redux with Thunks

e.g. for Promise-based API calls:

```javascript
API.fetchTodos = function() {
  return new Promise((res, rej) => {
    setTimeout(function() {
      res(todos);
    }, 2000);
  });
};
// in our componentDidMount/useEffect
Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
  console.log("Todos", todos);
  console.log("Goals", goals);
});
```

- loading also handled via reducer => set to true, then set to false when data is received
- optimistic updates: don't wait for API response e.g. on delete, just instantly dispatch the remove item, then hit the API & handle errors later if necessary (e.g. add data back in if your promise hits catch...)

Thunks:

> Middleware like thunk helps support asynchronicity in a Redux application. You can think of thunk as a wrapper for the store’s dispatch() method; rather than returning action objects, we can use thunk action creators to dispatch functions (or even or Promises).
> = allows clear separation of concerns (UI doesn't handle data fetching => this is handled by action creators)

- Api call
- Api resolved
- Thunk middleware invokes fn w dispatch: can check if it's function or object
- action returned by fn is dispatched

https://github.com/reduxjs/redux-thunk

cf Redux Sagas https://github.com/redux-saga/redux-saga
From README:

> redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

> The mental model is that a saga is like a separate thread in your application that's solely responsible for side effects. redux-saga is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

> It uses an ES6 feature called Generators to make those asynchronous flows easy to read, write and test. (if you're not familiar with them here are some introductory links) By doing so, these asynchronous flows look like your standard synchronous JavaScript code. (kind of like async/await, but generators have a few more awesome features we need)

### Context API

- avoids prop drilling in nested components
- A **connected component** is connected to the Redux store and is responsible for getting data from the store. = **container component**
- A **presentational component** should not access the store. It should receive any information it needs as props and then just render a UI.
- context provider wraps the app = provide store/context

```javascript
const Context  = React.createContext()
//  Provider used at top level = use this to wrap the App NB

function Provider({store}) {
  return (
  <Context.Provider value={store}>
    {React.children}
  </Context.Provider>
)}

// component
function ContainerList = () => {
  return (
    <Context.Consumer>
      {(store) => (
        <MyComponent store={store} />
      )}
    </Context.Consumer>
  )
}
```

- `connect((state) => ({ goals: state.goals }))(MyGoals)` function => currying pattern

```javascript
//our implementation
function connect(mapStateToProps) {
  return Component => {
    class Receiver extends React.Component {
      componentDidMount() {
        const { subscribe } = this.props.store;
        this.unsubscribe = subscribe(() => {
          this.forceUpdate();
        });
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const { dispatch, getState } = this.props.store;
        const state = getState();
        const stateNeeded = mapStateToProps(state);
        return <Component {...stateNeeded} dispatch={dispatch} />;
      }
    }
    class ConnectedComponent extends React.Component {
      render() {
        return (
          <Context.Consumer>
            {store => <Receiver store={store} />}
          </Context.Consumer>
        );
      }
    }
    return ConnectedComponent;
  };
}
```

=> provider/consumer/connect => packaged in react-redux!

### React Redux

- replaces our implementation with <ReactRedux.Provider> & connect(): (connects component & store)

```javascript
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);
```

- mapStateToProps is a function that lets connect() know how to map state into the component’s list of props.

### Folder Structure

Frontend

- Components
  - component1.js
  - component2.js
  - component3.js
- Actions
  - action1.js
  - action2.js
  - shared.js
- Reducers
  - reducer1.js
  - index.js
- Middleware
  - index.js
- Util
- Store
- index.js

#### Project design

- use wireframes
- draw line round components: use single-responsibility principles
- identify specs for each page/component
- determine what EVENTS happen and where
- determine which data should live in the store
  Abramov:

  > "Use React for ephemeral state that doesn't matter to the app globally and doesn't mutate in complex ways. For example, a toggle in some UI element, a form input state. Use Redux for state that matters globally or is mutated in complex ways. For example, cached users, or a post draft.

  > Sometimes you'll want to move from Redux state to React state (when storing something in Redux gets awkward) or the other way around (when more components need to have access to some state that used to be local).

  > The rule of thumb is: do whatever is less awkward.

- state normalization:

  - Each type of data gets its own "table" in the state.
  - Each "data table" should store the individual items in an object, with the IDs of the items as keys and the items themselves as the values.
  - Any references to individual items should be done by storing the item's ID.
  - Arrays of IDs should be used to indicate ordering.

- api calls from asynchronous action creators. also redux-thunk middleware

Redux Thunk:

> “The middleware will call that function with dispatch method itself as the first argument...The action will only reach the reducers once the API request is completed. It will also “swallow” such actions so don't worry about your reducers receiving weird function arguments. Your reducers will only receive plain object actions—either emitted directly, or emitted by the functions as we just described.”

```javascript
function handleInitialData() {
  return dispatch => {};
}
```
