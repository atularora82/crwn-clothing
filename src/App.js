import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/header/header.component';
import HomePage from '../src/pages/homepage/homepage.component';
import ShopPage from '../src/pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Checkout from '../src/pages/checkout/checkout.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';

class App extends React.Component {
 
  unsubscribeFromAuth = null

  componentDidMount () {

    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     
      if(userAuth){
       const userRef = await createUserProfileDocument(userAuth);

       userRef.onSnapshot(snapshot => {
         setCurrentUser({
            id: snapshot.id,
           ...snapshot.data()
         })

       });
     
      }
      setCurrentUser(userAuth);

    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  

   render(){

    const data1 = {
      card: {
        artworks: {
          artwork_1: {
            fieldName: "name",
            data: [
              {
                locale: "en",
                labelId: "some label id1",
                form: "some form value1",
                image: "some image value1"
              }
            ]
          }
        }
      }
    };
    console.log(data1);

    const data2 = {
      artworksProgramCard: [
        'artwork_1',
        'artwork_2'
      ]
    };
  
    console.log(data2.artworksProgramCard[0]);

    const my = data2.artworksProgramCard[0]

    const data3 = {
      [`"${my}"`]:{
        artwoks:{

        }
      }
    }
 
    console.log(data3);

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route export path='/checkout'>{Checkout}</Route>
          <Route 
            exact path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
              )
              : (
                <SignInAndSignUpPage />)
              }
          />
    
        </Switch>
      </div>
    );
   }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});


const mapDispatchToProps = dispatch => ({
 setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
