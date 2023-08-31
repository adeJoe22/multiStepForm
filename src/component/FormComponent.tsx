import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import { AccountForm } from "./AccountForm";
import { AddressForm } from "./AddressForm";
import { UserForm } from "./UserForm";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

const FormComponent = () => {
  const [data, setData] = useState(INITIAL_DATA);

  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultiStepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Account Creation");
    console.log({ message: "Successful Account Creation", data });
  };
  return (
    <>
      <Container>
        <Wrapper>
          <pre>{JSON.stringify(data)}</pre>
          <Form onSubmit={onSubmit}>
            <StepCounter>
              {currentStepIndex + 1} / {steps.length}
            </StepCounter>
            <StepSlide>{step}</StepSlide>
            <ButtonWrap>
              {!isFirstStep && (
                <Button type="button" onClick={back}>
                  Back
                </Button>
              )}
              <Button type="submit" onClick={next}>
                {isLastStep ? "Finish" : "Next"}
              </Button>
            </ButtonWrap>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default FormComponent;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f3f3;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Form = styled.form`
  position: relative;
  background-color: #fff;
  padding: 2rem;
  border-radius: 4px;
  border: 1px solid;
  width: 300px;
  margin: 1rem;
  max-width: max-content;
`;

const StepCounter = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;
const StepSlide = styled.div``;

const ButtonWrap = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;
const Button = styled.button``;
