import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Col, Nav, NavLink, Row } from "react-bootstrap";
import { ProductType } from "../../interfaces/enums/ProductType";
import {
  ChevronDoubleDown,
  ChevronDoubleUp,
  Controller,
  CpuFill,
  CurrencyBitcoin,
  Laptop,
  Mouse3Fill,
  PcDisplay,
  PciCard
} from "react-bootstrap-icons";
import { EndUserProductUsage } from "../../interfaces/enums/EndUserProductUsage";
import { useNavbar } from "../../contexts/NavbarsContext/NavbarContext";

const ProductsNavbar = () => {

  const {
    navbarVisible,
    setNavbarVisible,
    productNavbarVisible,
    setProductNavbarVisible,
    productSpecificNavbarVisible,
    setProductSpecificNavbarVisible
  } = useNavbar();

  const { pathname } = useLocation();

  const active = ( path: string ) => {
    return pathname === path;
  }

  const products = '/products/';
  const productsUsage = '/products/for-';

  const style = { width: "100%", height: "auto" };

  const navLinks = `rounded-card-10 border border-1 border-dark hstack gap-2
   align-items-center justify-content-center mw-250px`


  const hrInfo = <Col xs={ 12 }>
    <hr className={ 'h-2px w-60 mx-auto my-3' }/>
  </Col>;

  const toggleNavVisibility = () => {
    setNavbarVisible( !navbarVisible );
  }
  const toggleProductNavVisibility = () => {
    setProductNavbarVisible( !productNavbarVisible );
  }
  const toggleProductSpecificNavVisibility = () => {
    setProductSpecificNavbarVisible( !productSpecificNavbarVisible );
  }

  const chevron = `btn-pointer me-4 fs-1 text-danger-hover`;

  const productNavVisibleClass = `${ !productNavbarVisible && `d-none` }`
  const productSpecificNavVisibleClass = `${ !productSpecificNavbarVisible && `d-none` }`

  const navLinksLight = navLinks + ` dark-light ` + productNavVisibleClass;
  const navLinksPrimary = navLinks + ` dark-primary ` + productSpecificNavVisibleClass;

  return (
    <Row className={ `fs-4 mx-0 mt-3 ${ navbarVisible ? 'mb-5' : `mb-1` }` }>

      <Col className={ `fs-3 ps-4 mb-1 text-dark d-flex justify-content-between align-items-center` }>
        <span>
          Quick Navigational Menu
        </span>

        { navbarVisible ? <ChevronDoubleUp className={ chevron } onClick={ toggleNavVisibility }/> :
          <ChevronDoubleDown className={ chevron } onClick={ toggleNavVisibility }/> }

      </Col>

      <Nav
        className={ `justify-content-center gap-1 ${ !navbarVisible && `d-none` }` }>

        <Col xs={ 12 } className={ `d-flex justify-content-center align-items-center mb-1 text-dark` }>
          <span className={ `text-center ${ productNavVisibleClass }` }>
            Products Types
          </span>

          { productNavbarVisible ?
            <ChevronDoubleUp className={ `${ chevron } ms-1` } onClick={ toggleProductNavVisibility }/> :
            <ChevronDoubleDown className={ chevron } onClick={ toggleProductNavVisibility }/> }
        </Col>

        <NavLink
          as={ Link }
          to={ products + ProductType.CPU }
          className={ `${ navLinksLight } ${ active( products + ProductType.CPU ) && `bg-secondary text-light` }` }
          disabled={ active( products + ProductType.CPU ) }
        >
          <CpuFill style={ style }/>
          CPU's
        </NavLink>

        <NavLink
          as={ Link }
          to={ products + ProductType.GPU }
          className={ `${ navLinksLight } ${ active( products + ProductType.GPU ) && `bg-secondary text-light` }` }
          disabled={ active( products + ProductType.GPU ) }
        >
          <PciCard style={ style }/>
          GPU's
        </NavLink>

        <NavLink
          as={ Link }
          to={ products + ProductType.CONSOLE }
          className={ `${ navLinksLight } ${ active( products + ProductType.CONSOLE ) && `bg-secondary text-light` }` }
          disabled={ active( products + ProductType.CONSOLE ) }
        >
          <Controller style={ style }/>
          CONSOLE's
        </NavLink>

        <NavLink
          as={ Link }
          to={ products + ProductType.LAPTOP }
          className={ `${ navLinksLight } ${ active( products + ProductType.LAPTOP ) && `bg-secondary text-light` }` }
          disabled={ active( products + ProductType.LAPTOP ) }
        >
          <Laptop style={ style }/>
          LAPTOP's
        </NavLink>

        <NavLink
          as={ Link }
          to={ products + ProductType.PC }
          className={ `${ navLinksLight } ${ active( products + ProductType.PC ) && `bg-secondary text-light` }` }
          disabled={ active( products + ProductType.PC ) }
        >
          <PcDisplay style={ style }/>
          PC's
        </NavLink>

        { hrInfo }

        <Col xs={ 12 } className={ `d-flex justify-content-center align-items-center mb-1 text-dark` }>
          <span className={ `text-center ${ productSpecificNavVisibleClass }` }>
           Specific Products Usages
          </span>

          { productSpecificNavbarVisible ?
            <ChevronDoubleUp className={ chevron } onClick={ toggleProductSpecificNavVisibility }/> :
            <ChevronDoubleDown className={ chevron } onClick={ toggleProductSpecificNavVisibility }/> }
        </Col>

        <NavLink
          as={ Link }
          to={ productsUsage + EndUserProductUsage.MINERS }
          className={ `${ navLinksPrimary } ${ active( productsUsage + EndUserProductUsage.MINERS ) && `bg-primary-dark text-light` }` }
          disabled={ active( productsUsage + EndUserProductUsage.MINERS ) }
        >
          <CurrencyBitcoin style={ style }/>
          Crypto Mining
        </NavLink>

        <NavLink
          as={ Link }
          to={ productsUsage + EndUserProductUsage.GAMERS }
          className={ `${ navLinksPrimary } ${ active( productsUsage + EndUserProductUsage.GAMERS ) && `bg-primary-dark text-light` }` }
          disabled={ active( productsUsage + EndUserProductUsage.GAMERS ) }
        >
          <Mouse3Fill style={ style }/>
          For Gaming
        </NavLink>

        {/*<NavLink*/ }
        {/*  as={ Link }*/ }
        {/*  to={ productsUsage + EndUserProductUsage.COMMON }*/ }
        {/*  className={ `${ navLinksPrimary } ${ active( productsUsage + EndUserProductUsage.COMMON ) && `bg-primary-dark text-light` }` }*/ }
        {/*  disabled={ active( productsUsage + EndUserProductUsage.COMMON ) }*/ }
        {/*>*/ }
        {/*  <Slack style={ style }/>*/ }
        {/*  Common Work Study*/ }
        {/*</NavLink>*/ }

      </Nav>
    </Row>
  );
};

export default ProductsNavbar;