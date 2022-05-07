import React, {useEffect, useState} from 'react';
import {BasicCards} from "../../../constants/CardsModels/BasicCards";
import AdminSuggestedCardInfo from "../../GraphicCard/AdminSuggestedCardInfo";
import {Button, Col, Row} from "react-bootstrap";
import {SuggestedCardsIds} from "../../../constants/CardsModels/SuggestedCardsIds";
import {BasicCardModel} from "../../../interfaces/models/BasicCardModel";
import {CaretDownSquare, CaretLeftSquare, CaretRightSquare, CaretUpSquare} from "react-bootstrap-icons";

function mapNotSuggested(suggested: string[]) {
  let notSuggested: string[] = [];
  BasicCards.map(card => notSuggested.push(card.id));
  return notSuggested.filter(id => !suggested.includes(id));
}

function mapSuggested(suggestedCardIds: string[]){
  let suggested: string[] = [];
  suggestedCardIds.map(id => suggested.push(id));
  return suggested;
}

const ManageSuggestedCards = () => {

  const [changed, setChanged] = useState<boolean>(false);
  const [suggested, setSuggested] = useState<string[]>(mapSuggested(SuggestedCardsIds));
  const [notSuggested, setNotSuggested] = useState<string[]>(mapNotSuggested(SuggestedCardsIds));

  const onClick = (id: string, direction: `toSuggested` | `toNotSuggested`) => {

    setChanged(true);

    if (direction === "toNotSuggested") {
      setSuggested(suggested.filter(sId => sId !== id))
      notSuggested.push(id);
      setNotSuggested(notSuggested);
    } else {
      setNotSuggested(notSuggested.filter(sId => sId !== id))
      suggested.push(id);
      setSuggested(suggested);
    }
  }

  const reset = () => {
    setSuggested(mapSuggested(SuggestedCardsIds));
    setNotSuggested(mapNotSuggested(SuggestedCardsIds));
    setChanged(false);
  }

  const rowClass = `w-50 overflow-y-scroll thumb-slim m-1 p-2 d-none d-lg-flex align-items-center`;
  const rowClassSmall = `w-100 h-50 overflow-y-scroll thumb-slim m-1 p-2 d-flex d-lg-none align-items-center`;
  const buttonClass = `w-25 rounded-pill mx-2`

  return (
    <>
      <div className={`w-100 d-flex flex-column flex-lg-row h-75 mt-2 `}>

        <Row className={rowClass}>
          {
            suggested.map((id, index) =>
              <>
                <Col xs={10}
                     className={`h-25 my-1 me-0`}
                     key={index}>
                  <AdminSuggestedCardInfo card={BasicCards.find(card => card.id === id) as BasicCardModel}
                                          variant={`suggested`}
                  />
                </Col>

                <Col xs={2}
                     className={`d-flex align-items-center justify-content-center fs-1`}>
                  <CaretRightSquare
                    className={`text-light btn-pointer managed-carrot-light`}
                    onClick={() => onClick(id, "toNotSuggested")}
                  />
                </Col>
              </>
            )
          }
        </Row>

        <Row className={`${rowClass} thumb-light`}>
          {
            notSuggested.map((id, index) =>
              <>
                <Col xs={2}
                     className={`d-flex align-items-center justify-content-center fs-1`}>
                  <CaretLeftSquare
                    className={`text-primary btn-pointer managed-carrot-primary`}
                    onClick={() => onClick(id, "toSuggested")}
                  />
                </Col>

                <Col xs={10}
                     className={`h-25 my-1`}
                     key={index}>
                  <AdminSuggestedCardInfo card={BasicCards.find(card => card.id === id) as BasicCardModel}
                                          variant={`notSuggested`}
                  />
                </Col>
              </>
            )
          }
        </Row>

        <Row className={rowClassSmall}>
          {
            suggested.map((id, index) =>
              <>
                <Col xs={10}
                     className={`h-25 my-1`}
                     key={index}>
                  <AdminSuggestedCardInfo card={BasicCards.find(card => card.id === id) as BasicCardModel}
                                          variant={`suggested`}
                  />
                </Col>

                <Col xs={2}
                     className={`d-flex align-items-center justify-content-center fs-1`}>
                  <CaretDownSquare
                    className={`text-light btn-pointer managed-carrot-light`}
                    onClick={() => onClick(id, "toNotSuggested")}
                  />
                </Col>
              </>
            )
          }
        </Row>

        <Row className={`${rowClassSmall} thumb-light`}>
          {
            notSuggested.map((id, index) =>
              <>
                <Col xs={10}
                     className={`h-25 my-1`}
                     key={index}>
                  <AdminSuggestedCardInfo card={BasicCards.find(card => card.id === id) as BasicCardModel}
                                          variant={`notSuggested`}
                  />
                </Col>

                <Col xs={2}
                     className={`d-flex align-items-center justify-content-center fs-1`}>
                  <CaretUpSquare
                    className={`text-primary btn-pointer managed-carrot-primary`}
                    onClick={() => onClick(id, "toSuggested")}
                  />
                </Col>
              </>
            )
          }
        </Row>


      </div>
      <Row className={`w-100 justify-content-center align-items-center h-10 ${changed ? `d-flex` : `d-none`}`}>
        <Button
          className={`${buttonClass}`}
          variant={`outline-light`}
          type={`submit`}

        >
          Save Changes
        </Button>

        <Button
          className={`${buttonClass}`}
          variant={`outline-primary`}
          type={`reset`}
          onClick={reset}
        >
          Discard Changes
        </Button>
      </Row>
    </>

  );
};

export default ManageSuggestedCards;