import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPeople } from "../actions";
import styled from 'styled-components'
import FloatingParrits from "../FloatingParrits/FloatingParrits";

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  background-color: blue;
`;

const AppTitle = styled.h2``;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubHeaderContainer = styled.div`
  display: flex;
  background-color: yellow;
`;

const ProjectTitle = styled.h3``;

const WorkSpaceContainer = styled.h2`
displayed: flex;
flex-wrap: nowrap;
`;

const FloatingParritsContainer = styled.div``;

const DottedLineContainer = styled.div``;

class App extends Component {

    async componentDidMount() {
        this.props.fetchPeople()
    }

    render() {
        return (
            <LayoutWrapper>
                <HeaderContainer>
                    <AppTitle>Parrit</AppTitle>
                </HeaderContainer>
                <MainContainer>
                    <SubHeaderContainer>
                        <ProjectTitle>Test</ProjectTitle>
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

const mapStateToProps = state => {
    return {
        listOfPeopleREDUX: state.listOfPeople
    }
};

export default connect(mapStateToProps, { fetchPeople })(App);













