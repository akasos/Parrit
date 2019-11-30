import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { fetchTeammates } from "../actions";
import styled from 'styled-components'
import FloatingParrits from "../floatingParrits/FloatingParrits";

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  background-color: #E8F7FA;
`;

const AppTitle = styled.h2`
flex: 1;
border: 1px solid black;

`;

const HeaderButtonsContainer = styled.div`
display: flex;
justify-content: space-evenly;
flex: 1;
border: 1px solid red;
`;

const LogOutButton = styled.button``;
const FeedBackButton = styled.button``;
const HistoryButton = styled.button``;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubHeaderContainer = styled.div`
  display: flex;
  background-color: yellow;
`;
const ProjectTitle = styled.h3`
flex: 1;
border: 1px solid black;
`;

const SubHeaderButtonsContainer = styled.div`
display: flex;
justify-content: space-evenly;
flex: 1;
border: 1px solid red;
`;
const ResetPairsButton = styled.button``;
const RecommendPairsButton = styled.button``;
const RecordPairsButton = styled.button``;



const WorkSpaceContainer = styled.h2`
displayed: flex;
flex-wrap: nowrap;
`;

const FloatingParritsContainer = styled.div``;

const DottedLineContainer = styled.div``;

class App extends Component {

    async componentDidMount() {
        this.props.fetchTeammates()
    }

    render() {
        return (
            <LayoutWrapper>
                <HeaderContainer>
                    <AppTitle>Parrit</AppTitle>
                    <HeaderButtonsContainer>
                        <LogOutButton>Logout</LogOutButton>
                        <FeedBackButton>FeedBack</FeedBackButton>
                        <HistoryButton>History</HistoryButton>
                    </HeaderButtonsContainer>
                </HeaderContainer>
                <MainContainer>
                    <SubHeaderContainer>
                        <ProjectTitle>Test</ProjectTitle>
                        <SubHeaderButtonsContainer>
                            <ResetPairsButton>Reset Pairs</ResetPairsButton>
                            <RecommendPairsButton>Recommend Pairs</RecommendPairsButton>
                            <RecordPairsButton>Record Pairs</RecordPairsButton>
                        </SubHeaderButtonsContainer>
                    </SubHeaderContainer>
                    <WorkSpaceContainer>
                        <FloatingParritsContainer>
                            <FloatingParrits>
                            </FloatingParrits>
                        </FloatingParritsContainer>
                        <DottedLineContainer>

                        </DottedLineContainer>
                    </WorkSpaceContainer>
                </MainContainer>
            </LayoutWrapper>
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


export default connect(mapStateToProps, { fetchTeammates })(App);