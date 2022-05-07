import React from 'react';
import {FilterCardsFormikValues} from "../../../interfaces/formik/FilterCardsFormikValues";
import {FilterCardsInitialValues} from "../../../constants/InitialValues/FilterCardsInitialValues";
import FilterCardsForm from "../../Forms/FilterCardsForm";
import {Formik} from "formik";
import {Button} from "react-bootstrap";
import AllCards from "../../GraphicCard/AllCards";
import {useNavigate} from "react-router-dom";


const ManageAllCards = () => {

  const navigate = useNavigate();

  return (
    <div className={`w-100 d-flex h-80 mt-2`}>

      <div className={`w-20 h-100 vstack align-items-center`}>

        <span className={`w-100 h-20 vstack align-items-center fs-4`}>
          Filter Cards
          <hr className={`w-80 `}/>
        </span>


        <div className={`w-100 h-90`}>

          <Formik<FilterCardsFormikValues>
            initialValues={FilterCardsInitialValues}
            onSubmit={(values) => console.log(values)}
          >
            <FilterCardsForm/>
          </Formik>

        </div>

      </div>

      <div className={`w-80 h-100 vstack align-items-center `}>

        <div className={`w-100 h-100 overflow-y-scroll thumb-slim thumb-light px-3`}>
          <AllCards/>
        </div>

        <Button
          variant={`outline-success`}
          className={`rounded-pill w-20 mt-2`}
          onClick={() => navigate(`/card/new`)}
        >
          Add New
        </Button>

      </div>

    </div>
  );
};

export default ManageAllCards;