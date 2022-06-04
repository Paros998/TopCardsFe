import React from 'react';
import HelpDescription from "./HelpDescription";
import SignIn from "../../assets/images/help/SignIn.png";
import SignUp from "../../assets/images/help/SignUp.png";
import HomePage from "../../assets/images/help/HomePage.png";
import HomePageFilter from "../../assets/images/help/HomePageFilter.png";
import Details1 from "../../assets/images/help/Details1.png";
import Details2 from "../../assets/images/help/Details2.png";
import Details3 from "../../assets/images/help/Details3.png";
import Details4 from "../../assets/images/help/Details4.png";
import Details5 from "../../assets/images/help/Details5.png";
import Details6 from "../../assets/images/help/Details6.png";
import Details7 from "../../assets/images/help/Details7.png";
import Details8 from "../../assets/images/help/Details8.png";
import Details9 from "../../assets/images/help/Details9.png";
import Profile from "../../assets/images/help/Profile.png";
import Profile1 from "../../assets/images/help/Profile1.png";
import Profile2 from "../../assets/images/help/Profile2.png";
import Observed from "../../assets/images/help/Observed.png";
import History from "../../assets/images/help/History.png";
import Notification from "../../assets/images/help/Notifications.png";

const brake = () => {
  return (
    <span className={ `w-100` }>
      <hr className={ `border-1 border-dark border rounded-pill bg-dark ` }/>
    </span>
  );
}

const Helps = () => {

  const liClass = `text-wrap`;

  return (
    <>

      <HelpDescription
        src={ SignIn }
      >

        <li className={ liClass }>
          To sign in into application just write your username and password and then click login button
        </li>

        <li className={ liClass }>
          If your credentials doesn't match or there's an error, you will be informed by a side notificaton
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ SignUp }
      >

        <li className={ liClass }>
          To sign up into application just fill the form and click register
        </li>

        <li className={ liClass }>
          Additionally you can upload your own avatar, by simply clicking the current avatar and selecting your choice
        </li>

        <li className={ liClass }>
          If there's an error, you will be informed by a side notificaton
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ HomePage }
      >

        <li className={ liClass }>
          On Home Page you can view cards
        </li>

        <li className={ liClass }>
          By clicking the filter button you open a filter panel to search for specified cards
        </li>

        <li className={ liClass }>
          If there's an error, you will be informed by a side notificaton
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ HomePageFilter }
      >

        <li className={ liClass }>
          To filter cards just check boxes and click Search button
        </li>

        <li className={ liClass }>
          To clear filter just click Reset button
        </li>


      </HelpDescription>


      { brake() }

      <HelpDescription
        src={ Details1 }
      >

        <li className={ liClass }>
          To go back to previous view just click the arrow in the circle in the upper left side of this page
        </li>

        <li className={ liClass }>
          To go to Home Page just click the Logo or its corresponding text at the top of the page
        </li>

        <li className={ liClass }>
          In this view you can check card details and specification
        </li>


      </HelpDescription>


      { brake() }

      <HelpDescription
        src={ Details2 }
      >

        <li className={ liClass }>
          As an addition to previous helper, as an logged user you can follow/unfollow card
        </li>

        <li className={ liClass }>
          You will be informed by a side notification about the process
        </li>

        <li className={ liClass }>
          You can scroll down the page to see more...
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Details3 }
      >

        <li className={ liClass }>
          You can check the producent site for more specific inoformation by clicking the blue colored link
        </li>

        <li className={ liClass }>
          To Logout of the application simply click the Logout button in the top right corner
        </li>

        <li className={ liClass }>
          You can also see if you have already posted an opinion about specific product, as it shows you in different colours and messages on the right side
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Details4 }
      >

        <li className={ liClass }>
          To change or add your opinion just simply click the number of stars you want to give, write text opinion and simply click Save/Update button
        </li>

        <li className={ liClass }>
          You can also cancel by clicking Cancel or X button
        </li>

        <li className={ liClass }>
          You can also see number of notifications sent to you in the circle above the bell icon in the lower right corner
        </li>

        <li className={ liClass }>
          If you click the notification bell a panel will slide in and show you your notifications
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Details5 }
      >

        <li className={ liClass }>
          If you want to check specific notification just click it
        </li>

        <li className={ liClass }>
          To close notification just click on Notifications or X button
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Details6 }
      >

        <li className={ liClass }>
          You can read other users opinions
        </li>

        <li className={ liClass }>
          To read more opinions just click View more button
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Details7 }
      >

        <li className={ liClass }>
          Here are displayed all found local offers for specific product, with contact information, price ...
        </li>

        <li className={ liClass }>
          You can also check the store location on map when you click the address button with the underscored text on the right side of every offer
        </li>

        <li className={ liClass }>
          You can visit store website if its available
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Details8 }
      >

        <li className={ liClass }>
          Lastly on this view, you can check see and check all online offers for this product
        </li>

        <li className={ liClass }>
          We are displaying next to the store name its review score and number of reviews
        </li>

        <li className={ liClass }>
          Next you have the price information, and information if shipment is free of charge
        </li>

        <li className={ liClass }>
          On the right side is a blue button called Proceed to offer, when you click it, you will be redirected to the store offer if you want to check more data or buy it, etc...
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Details9 }
      >

        <li className={ liClass }>
          When you are logged in, you can see an additional element on the top, that is your account navigator
        </li>

        <li className={ liClass }>
          When you hover over it, you will see for options
        </li>

        <li className={ liClass }>
          Each options takes you to different page when you click it
        </li>

      </HelpDescription>


      { brake() }

      <HelpDescription
        src={ Profile }
      >

        <li className={ liClass }>
          In this view you can edit your account information, credentials, avatar or delete your account
        </li>

        <li className={ liClass }>
          To edit avatar click Toggle Edit button, and click on the blue pen to see a separate window
        </li>

        <li className={ liClass }>
          To change password click Change Password button, to see the change password form in separate window
        </li>

        <li className={ liClass }>
          To delete account click Delete Account button, don't worry you can click it, nothing will happen until you confirm deletion in a separate window
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Profile1 }
      >

        <li className={ liClass }>
          In this view you can change your avatar
        </li>

        <li className={ liClass }>
          To pick new avatar just click Choose Picture button
        </li>

        <li className={ liClass }>
          When you pick picture, click Save Changes Button to save your choice
        </li>

        <li className={ liClass }>
          To delete your current avatar just click the white cross in red circle and confirm, you will have again the basic avatar after this
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Profile2 }
      >

        <li className={ liClass }>
          To change your password, fill the form with the correct data and click Save Changes
        </li>

        <li className={ liClass }>
          If an error occurs, you will be notified why
        </li>

        <li className={ liClass }>
          You can reset your form by clicking Reset button, or just cancel with Cancel button
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Observed }
      >

        <li className={ liClass }>
          In observed view you can see all card that you follow and unfollow them by clicking UnFollow button if you want
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ History }
      >

        <li className={ liClass }>
          In this view you see all your actions like follow/unfollow of a card, check of card/ its offer and adding/updating opinion on specific card
        </li>

        <li className={ liClass }>
         It serves as a fast navigator to previous actions
        </li>

        <li className={ liClass }>
         To see the card or the card offer just click the middle part of record and you will be redirected to specific view or site
        </li>

        <li className={ liClass }>
         You can also delete specific record just by clicking the red trash bin icon
        </li>

      </HelpDescription>

      { brake() }

      <HelpDescription
        src={ Notification }
      >

        <li className={ liClass }>
          In this last view you see your account notification settings
        </li>

        <li className={ liClass }>
         You can change them by clicking the toggles, and then save with Save Changes button or reset to previous state by Discard Changes button
        </li>

      </HelpDescription>

    </>
  );
};

export default Helps;