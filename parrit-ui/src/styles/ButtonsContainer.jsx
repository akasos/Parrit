import React from 'react';
import * as PropTypes from 'prop-types';
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

ButtonsContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ButtonsContainer;