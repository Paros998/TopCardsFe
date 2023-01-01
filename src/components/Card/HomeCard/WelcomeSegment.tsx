import React, { FC } from 'react';
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import { Col, Row } from "react-bootstrap";
import { ArrowUpSquareFill, EmojiSunglasses } from "react-bootstrap-icons";

interface WelcomeSegmentPops {

}

const banner = `fs-5 font-weight-extra-normal d-flex align-items-center justify-content-end`;

const signUpBanner =
  ( <Col xs={ 12 } md={ 6 } className={ banner }>
    <span>
      Consider creating account to have access to more features.
    </span>
    <ArrowUpSquareFill className={ `ms-2 fs-4` }/>
  </Col> );

const welcomeBanner = (
  <Col xs={ 12 } md={ 6 } className={ banner }>
    <span>
      Nice to have you back
    </span>

    <EmojiSunglasses className={ `ms-2 fs-4` }/>
  </Col>
);

const WelcomeSegment: FC<WelcomeSegmentPops> = () => {
  const { currentUser } = useCurrentUser()

  return (
    <>

      <Row className={ 'align-items-center m-0 py-3 ps-1 ps-md-2 fs-4' }>
        <Col xs={ 12 } md={ 6 } className={ `fs-3` }>
          <span className={ `` }>
            Welcome { currentUser ? currentUser.username : 'Stranger' }
          </span>
        </Col>

        { currentUser ? welcomeBanner : signUpBanner }

      </Row>

    </>
  );
};

export default WelcomeSegment;