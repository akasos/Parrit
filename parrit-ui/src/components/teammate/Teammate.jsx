import React, {Component} from 'react';
import styled from 'styled-components'

const TeammateContainer = styled.div`
display: inline-block;
border-radius: 5px;
margin: 20px;
padding: 10px;
background-color: aqua;
border: 1px solid red;
`;


class Teammate extends Component {
    render() {
        return (
        <TeammateContainer>
           {this.props.name}
        </TeammateContainer>
        );
    }
}

export default Teammate;