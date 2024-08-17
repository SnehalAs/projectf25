import { Route,Routes } from "react-router-dom";
import Home from "./component/home";
import Login from "./component/login";
import Jobs from "./component/jobs";
import NotFound from "./component/notFound";
import ProtectedRoute from "./protectedRoute";
import detailedSection from "./component/detailedSection";



const App = () => {


  return(
    <Routes>
      <Route path = "/" element = {<ProtectedRoute Component={Home}/>}></Route>

      <Route path = "/jobs" element = {<ProtectedRoute Component = {Jobs}/>}></Route>
      <Route path = "/jobs/:id" element = {<ProtectedRoute Component = {detailedSection}/>}></Route>
      
      <Route path = "/login" element = {<Login/>}></Route>

      <Route path = "/*" element = {<NotFound/>}></Route>
    
    </Routes>
  );
};

export default App;