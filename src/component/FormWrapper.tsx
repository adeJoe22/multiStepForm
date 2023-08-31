import React, { ReactNode } from "react";
import styled from "styled-components";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <Title>{title}</Title>
      <InputChildren>{children}</InputChildren>
    </>
  );
};

export default FormWrapper;

const Title = styled.h2`
  text-align: center;
  margin: 0;
  margin-bottom: 2rem;
`;
const InputChildren = styled.div`
  display: grid;
  gap: 1rem 0.5rem;
  justify-content: flex-start;
  grid-template-columns: auto minmax(auto, 400px);
`;
