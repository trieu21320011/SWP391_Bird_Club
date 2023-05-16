import { authentication } from "./authentication";

  import { BrowserRouter as Route, Redirect } from "react-router-dom";

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
       <Route {...rest} render={(props) => (
          authentication.isAuthentication() ?
             (<Component {...props} />)
             :
             (<Redirect to="/page-login" />)
       )}
 
       />
    )
 }
 export default PrivateRoute;
