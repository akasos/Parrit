import React, {Component} from 'react';
import styled from 'styled-components';
const FloatingParritsContainer = styled.div``;
const Title = styled.h3``;

const PersonListContainer = styled.div``;
const ButtonContainer = styled.div``;
const AddPersonButton = styled.button``;

class FloatingParrits extends Component {

    addPerson = () => {

    };

    render() {
        return (
            <FloatingParritsContainer>
                <Title>Floating Parrits</Title>
                <PersonListContainer>

                </PersonListContainer>
                <ButtonContainer>
                    <AddPersonButton onClick={this.addPerson}>Add Person</AddPersonButton>
                </ButtonContainer>
            </FloatingParritsContainer>
        );
    }
}


export default FloatingParrits;