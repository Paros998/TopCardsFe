import React, { useEffect } from 'react';
import { Col, Form as FormBoot, Row } from "react-bootstrap";
import { useFilterGamesWithScore } from "../../contexts/GameWithScoreModalContext/GameWithScoreModalContext";
import { Controller, CpuFill, Laptop, PcDisplay, PciCard } from "react-bootstrap-icons";
import { ProductType } from "../../interfaces/enums/ProductType";
import ProductsByGames from "./ProductsByGames";
import { Platform } from "../../interfaces/enums/Platform";

const DisplayProductsWithPerformance = () => {
  const hr = <Col xs={ 12 }>
    <hr className={ 'h-2px w-95 my-3 mx-auto' }/>
  </Col>;

  const suggested = ` p-0 ps-md-4 mx-2 mx-md-4 mb-5 align-items-center mnh-100px `;
  const iconClass = 'd-flex-column gap-1 justify-content-center';
  const switchClass = 'd-flex gap-2 justify-content-center';
  const iconDesc = 'fw-bolder text-dark d-flex justify-content-center';
  const style = { width: "100%", height: "auto" };

  const {
    filterGames,
    filterAndFetchCpus,
    filterAndFetchGpus,
    setFilterAndFetchCpus,
    setFilterAndFetchGpus
  } = useFilterGamesWithScore();

  const isFilterEmpty: boolean = filterGames.length === 0;

  const checkingForPcStuff: boolean = filterGames.every( game => game.platforms.includes( Platform.PC ) );
  const displayPc: string = checkingForPcStuff ? " d-flex" : " d-none";

  useEffect( () => {
    if ( !checkingForPcStuff ) {
      setFilterAndFetchGpus( false );
      setFilterAndFetchCpus( false );
    }
  }, [ checkingForPcStuff ] )

  if ( isFilterEmpty )
    return <></>;

  return (
    <>
      { hr }

      <Row className={ `h-10 m-0 align-items-center py-3 mx-1 mx-md-2 mb-1` }>
        <Col xs={ 12 } className={ `fs-3 ` }>
          Products based of games, searched by capabilities, requirements, compatibility with hardware and systems.
        </Col>
      </Row>

      <Row className={ suggested }>
        <Col xs={ 2 } sm={ 1 } className={ iconClass }>
          <Controller style={ style }/>

          <span className={ iconDesc }>
              { ProductType.CONSOLE }
            </span>
        </Col>

        <Col xs={ 10 } sm={ 11 }>
          <ProductsByGames productType={ ProductType.CONSOLE } fetchData={ true }/>
        </Col>
        { checkingForPcStuff && hr }
      </Row>

      {
        checkingForPcStuff &&
          <Row className={ `${ suggested + displayPc }` }>
              <Col xs={ 2 } sm={ 1 } className={ iconClass }>
                  <PcDisplay style={ style }/>

                  <span className={ iconDesc }>
              { ProductType.PC }
            </span>
              </Col>

              <Col xs={ 10 } sm={ 11 }>
                  <ProductsByGames productType={ ProductType.PC } fetchData={ true }/>
              </Col>
            { hr }
          </Row>
      }

      { checkingForPcStuff &&
          <Row className={ " p-0 ps-md-4 mx-2 mx-md-4 mb-2 align-items-center mnh-100px mh-700px" + displayPc }>
              <Col xs={ 2 } sm={ 1 } className={ iconClass }>
                  <Laptop style={ style }/>

                  <span className={ iconDesc }>
              { ProductType.LAPTOP }
            </span>
              </Col>

              <Col xs={ 10 } sm={ 11 }>
                  <ProductsByGames productType={ ProductType.LAPTOP } fetchData={ true }/>
              </Col>
            { hr }
          </Row>
      }

      {
        checkingForPcStuff &&
          <Row
              className={ `p-0 ps-md-4 mx-2 mx-md-4 align-items-center mb-4 ${ displayPc }` }>
              <Col xs={ 2 }/>
              <Col xs={ 4 } className={ switchClass }>
          <span>
            Search also for individual CPU
          </span>

                  <FormBoot.Switch
                      className={ `switch-pointer` }
                      checked={ filterAndFetchCpus }
                      onChange={ () => setFilterAndFetchCpus( !filterAndFetchCpus ) }
                  />
              </Col>

              <Col xs={ 4 } className={ switchClass }>
          <span>
            Search also for individual GPU
          </span>

                  <FormBoot.Switch
                      className={ `switch-pointer` }
                      checked={ filterAndFetchGpus }
                      onChange={ () => setFilterAndFetchGpus( !filterAndFetchGpus ) }
                  />
              </Col>

          </Row>
      }

      {
        checkingForPcStuff &&
          <Row className={ `${ suggested } ${ filterAndFetchCpus ? 'd-flex' : 'd-none' }` }>
              <Col xs={ 2 } sm={ 1 } className={ iconClass }>
                  <CpuFill style={ style }/>

                  <span className={ iconDesc }>
              { ProductType.CPU }
            </span>
              </Col>

              <Col xs={ 10 } sm={ 11 }>
                  <ProductsByGames productType={ ProductType.CPU } fetchData={ filterAndFetchCpus }/>
              </Col>

            { hr }
          </Row>
      }

      {
        checkingForPcStuff &&
          <Row className={ `${ suggested } ${ filterAndFetchGpus ? 'd-flex' : 'd-none' }` }>
              <Col xs={ 2 } sm={ 1 } className={ iconClass }>
                  <PciCard style={ style }/>

                  <span className={ iconDesc }>
              { ProductType.GPU }
            </span>
              </Col>

              <Col xs={ 10 } sm={ 11 }>
                  <ProductsByGames productType={ ProductType.GPU } fetchData={ filterAndFetchGpus }/>
              </Col>

          </Row>
      }

    </>
  );
};

export default DisplayProductsWithPerformance;