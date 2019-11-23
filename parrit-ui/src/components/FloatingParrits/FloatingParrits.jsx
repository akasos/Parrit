import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
const FloatingParritsContainer = styled.div``;
const Title = styled.h3``;
const PersonListContainer = styled.div``;
const ButtonContainer = styled.div``;
const AddPersonButton = styled.button``;

class FloatingParrits extends Component {

    addPerson = () => {

    };

    render() {
        const { listOfPeopleREDUX } = this.props;
        return (
            <FloatingParritsContainer>
                <Title>Floating Parrits</Title>
                <PersonListContainer>
                    {listOfPeopleREDUX.length > 0 &&  listOfPeopleREDUX.map(people => <div key={people.id}>{people.name}</div>)}
                </PersonListContainer>
                <ButtonContainer>
                    <AddPersonButton onClick={this.addPerson}>Add Person</AddPersonButton>
                </ButtonContainer>
            </FloatingParritsContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        listOfPeopleREDUX: state.listOfPeople
    };
};

export default connect(mapStateToProps)(FloatingParrits);