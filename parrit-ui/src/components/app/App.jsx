import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {fetchTeammates} from "../actions";
import styled from 'styled-components'
import FloatingParrits from "../floatingParrits/FloatingParrits";
import Header from "../header/Header";
import SubHeader from "../subHeader/SubHeader";
import PairingBoards from "../pairingBoards/PairingBoards";
import {DndProvider} from "react-dnd";
import Backend from 'react-dnd-html5-backend'

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    height: 100vh;
`;

const WorkSpaceContainer = styled.div`
    display: flex;
    flex: 1;
    border: 5px solid green;
`;

class App extends Component {

    async componentDidMount() {
        this.props.fetchTeammates()
    }

    render() {
        return (
            <DndProvider backend={Backend}>
                <LayoutWrapper>
                    <Header/>
                    <SubHeader projectName="AVSchedule"/>
                    <WorkSpaceContainer>
                        <FloatingParrits/>
                        <PairingBoards/>
                    </WorkSpaceContainer>
                </LayoutWrapper>
            </DndProvider>

        );
    }
}

App.propTypes = {
    fetchTeammates: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        listOfPeopleREDUX: state.listOfPeople
    }
};


export default connect(mapStateToProps, {fetchTeammates})(App);