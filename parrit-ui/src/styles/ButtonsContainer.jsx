import React from 'react';
import styled from "styled-components";

const Container = styled.div`
display: flex;
justify-content: space-evenly;
flex: 1;
border: 1px solid red;
`;

const ButtonsContainer = (props) => {
    return(
        <Container>
            {props.children}
        </Container>
    )
};

export default ButtonsContainer;