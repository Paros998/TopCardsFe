import React from 'react';
import { useCurrentUser } from "../../contexts/UserContext/UserContext";
import { Roles } from "../../interfaces/enums/Roles";
import LinkDescription from "./LinkDescription";

const Links = () => {

  const { role } = useCurrentUser();

  if ( role === Roles.RoleAdmin )
    return (
      <>

        <span className={ `fw-light fs-5` }>
          Links to all views on your current role ( ADMIN role )
        </span>

        <LinkDescription
          linkTo={ '/' }
          linkName={ 'Home Page' }
          linkDesc={ '- Here you can check all cards, filter them and check their details' }/>

        <LinkDescription
          linkTo={ '/user/profile' }
          linkName={ 'Profile Page' }
          linkDesc={ '- Here you can check all your data, profile and modify them' }/>

        <LinkDescription
          linkTo={ '/user/observed' }
          linkName={ 'Observed Cards Page' }
          linkDesc={ '- Here you can check all followed cards, unfollow them or check their details' }/>

        <LinkDescription
          linkTo={ '/user/history' }
          linkName={ 'User History Page' }
          linkDesc={ '- Here you can check all your history, actions, delete them or use them as links' }/>

        <LinkDescription
          linkTo={ '/user/notifications' }
          linkName={ 'User Notifications Settings Page' }
          linkDesc={ '- Here you can check your settings regarding notifications and modify them' }/>

        <LinkDescription
          linkTo={ '/admin/suggested' }
          linkName={ 'Manage Suggested Cards Page' }
          linkDesc={ '- Here you can check current suggested cards, add / remove a card from them' }/>

        <LinkDescription
          linkTo={ '/admin/cards' }
          linkName={ 'Manage Cards Page' }
          linkDesc={ '- Here you can check all cards, filter, edit, delete them' }/>

        <LinkDescription
          linkTo={ '/admin/users' }
          linkName={ 'Manage Users Page' }
          linkDesc={ '- Here you can check all users registered in application, block or delete them' }/>

        <LinkDescription
          linkTo={ '/card/new' }
          linkName={ 'New Card Page' }
          linkDesc={ '- Here you can add new card ' }/>

      </>
    );

  if ( role === Roles.RoleClient )
    return (
      <>

        <span className={ `fw-light fs-5` }>
          Links to all views on your current role ( Logged Client role )
        </span>

        <LinkDescription
          linkTo={ '/' }
          linkName={ 'Home Page' }
          linkDesc={ '- Here you can check all cards, filter them and check their details' }/>

        <LinkDescription
          linkTo={ '/user/profile' }
          linkName={ 'Profile Page' }
          linkDesc={ '- Here you can check all your data, profile and modify them' }/>

        <LinkDescription
          linkTo={ '/user/observed' }
          linkName={ 'Observed Cards Page' }
          linkDesc={ '- Here you can check all followed cards, unfollow them or check their details' }/>

        <LinkDescription
          linkTo={ '/user/history' }
          linkName={ 'User History Page' }
          linkDesc={ '- Here you can check all your history, actions, delete them or use them as links' }/>

        <LinkDescription
          linkTo={ '/user/notifications' }
          linkName={ 'User Notifications Settings Page' }
          linkDesc={ '- Here you can check your settings regarding notifications and modify them' }/>

      </>
    );

  return (
    <>

      <span className={ `fw-light fs-5` }>
          Links to all views on your current role ( UnLogged User role )
      </span>

      <LinkDescription
        linkTo={ '/login' }
        linkName={ 'Login Page' }
        linkDesc={ '- Here you can Sign In to application' }/>

      <LinkDescription
        linkTo={ '/register' }
        linkName={ 'Register Page' }
        linkDesc={ '- Here you can Sign Up to application' }/>

      <LinkDescription
        linkTo={ '/' }
        linkName={ 'Home Page' }
        linkDesc={ '- Here you can check all cards, filter them and check their details' }/>


    </>
  );
};

export default Links;