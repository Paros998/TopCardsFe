import React, {useRef} from 'react';
import {Form, useFormikContext} from "formik";
import {Button, ButtonGroup, Form as FormBoot} from "react-bootstrap";
import SubmitButton from "../SubmitButton/SubmitButton";
import {FilterCardsFormikValues} from "../../interfaces/formik/FilterCardsFormikValues";
import {Globe, MapFill} from "react-bootstrap-icons";

const FilterCardsForm = () => {

  const {values} = useFormikContext<FilterCardsFormikValues>();

  const formGroup = `mx-1 my-1 fw-light fs-6`;
  const formLabel = `position-relative left-10 fs-5 w-100 my-0`;
  const select = `position-relative left-15 btn-pointer select-all`
  const checkbox = `position-relative left-20 check-pointer`

  const manufacturer = useRef<HTMLInputElement[]>([]);
  const technology = useRef<HTMLInputElement[]>([]);
  const memory = useRef<HTMLInputElement[]>([]);
  const memoryType = useRef<HTMLInputElement[]>([]);
  const outputsType = useRef<HTMLInputElement[]>([]);
  const memoryBus = useRef<HTMLInputElement[]>([]);
  const availableLocal = useRef<HTMLInputElement>();
  const availableOnline = useRef<HTMLInputElement>();

  const clear = (value: HTMLInputElement) => {
    value.checked = true;
    value.click();
  }

  const clearFormValues = () => {
    manufacturer.current.map(clear);
    technology.current.map(clear);
    memory.current.map(clear);
    memoryType.current.map(clear);
    outputsType.current.map(clear);
    memoryBus.current.map(clear);
    availableLocal.current && clear(availableLocal.current);
    availableOnline.current && clear(availableOnline.current);
  }

  const onChange = (fieldName: `manufacturers` | `technology` | `memory` | `memoryType` | `outputsType` | `memoryBus`,
                    checkbox: HTMLInputElement,
                    label: string) => {
    if (checkbox.checked)
      values?.[fieldName].push(label);
    else
      values[fieldName] = values?.[fieldName].filter(value => value !== label);
  }

  return (
    <>
      <div className={`h-100 w-100 `}>
        <Form className={`h-100 w-100 d-flex w-80 flex-column `}>

          <div className={`h-100 w-100 thumb-light thumb-slim overflow-y-scroll`}>

            <FormBoot.Group className={formGroup}>

              <FormBoot.Label className={formLabel}>Manufacturer</FormBoot.Label>

              <span
                className={select}
                onClick={() => {
                  manufacturer?.current?.map(value => value.click())
                }}
              >
                Select All
              </span>

              <FormBoot.Check type={`checkbox`}
                              label={`Gigabyte`}
                              ref={(el: HTMLInputElement) => manufacturer.current[1] = el}
                              className={checkbox}
                              onChange={() => onChange("manufacturers", manufacturer.current[1], `Gigabyte`)}
              />

              <FormBoot.Check type={`checkbox`}
                              label={`Asus`}
                              ref={(el: HTMLInputElement) => manufacturer.current[2] = el}
                              onChange={() => onChange("manufacturers", manufacturer.current[2], `Asus`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`MSI`}
                              ref={(el: HTMLInputElement) => manufacturer.current[3] = el}
                              onChange={() => onChange("manufacturers", manufacturer.current[3], `MSI`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`Zotac`}
                              ref={(el: HTMLInputElement) => manufacturer.current[4] = el}
                              onChange={() => onChange("manufacturers", manufacturer.current[4], `Zotac`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`Palit`}
                              ref={(el: HTMLInputElement) => manufacturer.current[5] = el}
                              onChange={() => onChange("manufacturers", manufacturer.current[5], `Palit`)}
                              className={checkbox}/>

            </FormBoot.Group>

            <FormBoot.Group className={formGroup}>

              <FormBoot.Label className={formLabel}>Technology</FormBoot.Label>

              <span
                className={select}
                onClick={() => {
                  technology?.current?.map(value => value.click())
                }}
              >
                Select All
              </span>

              <FormBoot.Check type={`checkbox`}
                              label={`Nvidia`}
                              ref={(el: HTMLInputElement) => technology.current[1] = el}
                              onChange={() => onChange("technology", technology.current[1], `Nvidia`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`Amd`}
                              ref={(el: HTMLInputElement) => technology.current[2] = el}
                              onChange={() => onChange("technology", technology.current[2], `Amd`)}
                              className={checkbox}/>

            </FormBoot.Group>

            <FormBoot.Group className={formGroup}>

              <FormBoot.Label className={formLabel}>VRAM Memory</FormBoot.Label>

              <span
                className={select}
                onClick={() => {
                  memory?.current?.map(value => value.click())
                }}
              >
            Select All
          </span>

              <FormBoot.Check type={`checkbox`}
                              label={`2GB`}
                              ref={(el: HTMLInputElement) => memory.current[1] = el}
                              onChange={() => onChange("memory", memory.current[1], `2GB`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`3GB`}
                              ref={(el: HTMLInputElement) => memory.current[2] = el}
                              onChange={() => onChange("memory", memory.current[2], `3GB`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`4GB`}
                              ref={(el: HTMLInputElement) => memory.current[3] = el}
                              onChange={() => onChange("memory", memory.current[3], `4GB`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`6GB`}
                              ref={(el: HTMLInputElement) => memory.current[4] = el}
                              onChange={() => onChange("memory", memory.current[4], `6GB`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`8GB`}
                              ref={(el: HTMLInputElement) => memory.current[5] = el}
                              onChange={() => onChange("memory", memory.current[5], `8GB`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`12GB`}
                              ref={(el: HTMLInputElement) => memory.current[6] = el}
                              onChange={() => onChange("memory", memory.current[6], `12GB`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`16GB`}
                              ref={(el: HTMLInputElement) => memory.current[7] = el}
                              onChange={() => onChange("memory", memory.current[7], `16GB`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`24GB`}
                              ref={(el: HTMLInputElement) => memory.current[8] = el}
                              onChange={() => onChange("memory", memory.current[8], `24GB`)}
                              className={checkbox}/>

            </FormBoot.Group>

            <FormBoot.Group className={formGroup}>

              <FormBoot.Label className={formLabel}>Memory Type</FormBoot.Label>

              <span
                className={select}
                onClick={() => {
                  memoryType?.current?.map(value => value.click())
                }}
              >
            Select All
          </span>

              <FormBoot.Check type={`checkbox`}
                              label={`GDDR4`}
                              ref={(el: HTMLInputElement) => memoryType.current[1] = el}
                              onChange={() => onChange("memoryType", memoryType.current[1], `GDDR4`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`GDDR5`}
                              ref={(el: HTMLInputElement) => memoryType.current[2] = el}
                              onChange={() => onChange("memoryType", memoryType.current[2], `GDDR5`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`GDDR6`}
                              ref={(el: HTMLInputElement) => memoryType.current[3] = el}
                              onChange={() => onChange("memoryType", memoryType.current[3], `GDDR6`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`GDDR5X`}
                              ref={(el: HTMLInputElement) => memoryType.current[4] = el}
                              onChange={() => onChange("memoryType", memoryType.current[4], `GDDR5X`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`GDDR6X`}
                              ref={(el: HTMLInputElement) => memoryType.current[5] = el}
                              onChange={() => onChange("memoryType", memoryType.current[5], `GDDR6X`)}
                              className={checkbox}/>


            </FormBoot.Group>

            <FormBoot.Group className={formGroup}>

              <FormBoot.Label className={formLabel}>Memory Bus</FormBoot.Label>

              <span
                className={select}
                onClick={() => {
                  memoryBus?.current?.map(value => value.click())
                }}
              >
            Select All
          </span>

              <FormBoot.Check type={`checkbox`}
                              label={`96 bit`}
                              ref={(el: HTMLInputElement) => memoryBus.current[1] = el}
                              onChange={() => onChange("memoryBus", memoryBus.current[1], `96 bit`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`128 bit`}
                              ref={(el: HTMLInputElement) => memoryBus.current[2] = el}
                              onChange={() => onChange("memoryBus", memoryBus.current[2], `128 bit`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`192 bit`}
                              ref={(el: HTMLInputElement) => memoryBus.current[3] = el}
                              onChange={() => onChange("memoryBus", memoryBus.current[3], `192 bit`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`256 bit`}
                              ref={(el: HTMLInputElement) => memoryBus.current[4] = el}
                              onChange={() => onChange("memoryBus", memoryBus.current[4], `256 bit`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`384 bit`}
                              ref={(el: HTMLInputElement) => memoryType.current[5] = el}
                              onChange={() => onChange("memoryBus", memoryBus.current[5], `384 bit`)}
                              className={checkbox}/>


            </FormBoot.Group>

            <FormBoot.Group className={formGroup}>

              <FormBoot.Label className={formLabel}>Output Type</FormBoot.Label>

              <span
                className={select}
                onClick={() => {
                  outputsType?.current?.map(value => value.click())
                }}
              >
            Select All
          </span>

              <FormBoot.Check type={`checkbox`}
                              label={`HDMI`}
                              ref={(el: HTMLInputElement) => outputsType.current[1] = el}
                              onChange={() => onChange("outputsType", outputsType.current[1], `HDMI`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`DVI`}
                              ref={(el: HTMLInputElement) => outputsType.current[2] = el}
                              onChange={() => onChange("outputsType", outputsType.current[2], `DVI`)}
                              className={checkbox}/>

              <FormBoot.Check type={`checkbox`}
                              label={`Display Port`}
                              ref={(el: HTMLInputElement) => outputsType.current[3] = el}
                              onChange={() => onChange("outputsType", outputsType.current[3], `Display Port`)}
                              className={checkbox}/>


            </FormBoot.Group>

            <FormBoot.Group className={formGroup}>

              <FormBoot.Label className={formLabel}>Available Local</FormBoot.Label>

              <FormBoot.Check type={`checkbox`}
                              label={<MapFill className={`text-light mb-1`}/>}
                              ref={(el: HTMLInputElement) => availableLocal.current = el}
                              onChange={() => values.availableLocal = availableLocal.current?.checked as boolean}
                              className={checkbox}
              />

            </FormBoot.Group>

            <FormBoot.Group className={formGroup}>

              <FormBoot.Label className={formLabel}>Available Online</FormBoot.Label>

              <FormBoot.Check type={`checkbox`}
                              label={<Globe className={`text-light mb-1`}/>}
                              ref={(el: HTMLInputElement) => availableOnline.current = el}
                              onChange={() => values.availableOnline = availableOnline.current?.checked as boolean}
                              className={checkbox}
              />

            </FormBoot.Group>


          </div>

          <hr className={`w-75 my-3 position-relative left-12`}/>

          <ButtonGroup className={`w-80 position-relative left-10 mb-2 `}>

            <Button
              type={"reset"}
              className={`w-50 me-2`}
              variant={`outline-primary-light`}
              onClick={clearFormValues}
            >
              Clear
            </Button>

            <SubmitButton
              className={`w-50`}
              variant={`outline-light`}
            >
              Search
            </SubmitButton>

          </ButtonGroup>

        </Form>

      </div>
    </>
  );
};

export default FilterCardsForm;