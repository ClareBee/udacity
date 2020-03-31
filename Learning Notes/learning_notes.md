## ReactJS
- declarative not imperative
- favours composition over inheritance (reusable, encapsulated components)
- unidirectional data flow

### Misc.
- don't set state from props: antipattern as would only update state on a 'refresh' & would duplicate data
- setState rather than mutating state directly: can be passed a function (if new state depends on previous state):
```javascript
this.setState((prevState) => ({
 count: prevState.count + 1
}))
```
-  OR an object that's merged into existing state
- state change => triggers re-render of component => updates UI: 'the UI is just a function of your state'

- `npm install --save prop-types` - to validate intended data types (e.g. `name: PropTypes.string.isRequired`)
- controlled components = e.g. form values governed by state (as single source of truth, instant input validation, ability to conditionally disable/enable buttons)
- React Developer Tools 
- **short-circuit evaluation** - e.g. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-circuit_evaluation

### Lifecycle events (better to use hooks)
**componentDidMount()**
- invoked immediately after the component is inserted into the DOM
- best place for Ajax requests (replace w useEffect)
  
**componentWillUnmount()**
- invoked immediately before a component is removed from the DOM

**getDerivedStateFromProps()**
- invoked after a component is instantiated as well as when it receives brand new props

>As of React 16.3, componentWillMount() has been replaced with UNSAFE_componentWillMount(). Only UNSAFE_componentWillMount() will work starting with React 17.0. UNSAFE_componentWillMount() is now considered to be a legacy method and should not be used in new code.

Order on being added to DOM:
1. constructor()
2. getDerivedStateFromProps()
3. render()
4. componentDidMount()

Order on being re-rendered:
1. getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()(specific use cases)
5. componentDidUpdate()

>componentWillReceiveProps() and componentWillUpdate() have been deprecated. ⚠️

### React Router
>React Router is a collection of navigational components that compose declaratively with your application.3
- https://reacttraining.com/react-router/web/example/basic

-  `npm install --save react-router-dom`
-  BrowserRouter -> Router component w `history` prop - lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.
-  `history.push('/')`
-  https://github.com/reacttraining/history
-  Link component to navigate through app (declarative & accessible)
```javascript
<Link to={{
 pathname: '/courses',
 search: '?sort=name',
 hash: '#the-hash',
 state: { fromDashboard: true }
}}>
 Courses
</Link>
```
- Route component - with `exact` prop to ensure total match
- `form-serialize`: https://github.com/defunctzombie/form-serialize#readme : to submit a form over AJAX
