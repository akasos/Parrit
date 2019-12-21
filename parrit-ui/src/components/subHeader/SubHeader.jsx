import React from 'react';
import styled from "styled-components";
import ButtonsContainer from "../../styles/ButtonsContainer";
import Button from '../button/Button'


const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: Yellow;
`;

const ProjectName = styled.h2`
flex: 2;
margin: 0 0 0 16px;
border: 1px solid red;
`;

const SubHeader = ({projectName}) => {
    return (
        <SubHeaderContainer>
            <ProjectName>{projectName}</ProjectName>
            <ButtonsContainer>
                <Button text="Reset Pairs"/>
                <Button text="Recommend Paris"/>
                <Button text="Record Paris"/>
            </ButtonsContainer>
        </SubHeaderContainer>
    )
};

export default SubHeader