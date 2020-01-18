import React from 'react';
import styled from "styled-components";
import ButtonsContainer from "../../styles/ButtonsContainer";
import Button from '../button/Button';


const HeadContainer = styled.div`
  display: flex;
  background-color: #E8F7FA;
  align-items: center;
  height: 80px
`;

const AppTitle = styled.h2`
flex: 2;
border: 1px solid black;
margin: 0 0 0 16px;

`;


const Header = () => {
    return (
        <HeadContainer>
            <AppTitle>Parrit</AppTitle>
            <ButtonsContainer>
                <Button className="temp" onClick={() => null} text="LOGOUT"/>
            <Button className="temp" onClick={() => null} text="FEEDBACK"/>
            <Button className="temp" onClick={() => null} text="HISTORY"/>
        </ButtonsContainer>
</HeadContainer>
)
};
export default Header