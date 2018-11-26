import React from 'react';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.page === 2 ? '35% 65%' : '30% 70%'};
  align-items: center;
  margin-bottom: 15px;
`;

const StyledLabel = styled.label`
  margin-right: 20px;
  font-weight: bold;
  font-size: 18px;
  justify-self: end;
  color: rgb(99, 99, 99);
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 25px;
`;

export default class CreateChartPageUserInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let inputForms;

    if (this.props.page === 2) {
      inputForms = (
        <div>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Game Title
            </StyledLabel>
            <Input
              value={this.props.chartInput.gameTitle}
              onChange={(e) => this.props.changeSimpleInput('chartInput', 'gameTitle', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Category
            </StyledLabel>
            <Input
              value={this.props.chartInput.category}
              onChange={(e) => this.props.changeSimpleInput('chartInput', 'category', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Leaderboard URL
            </StyledLabel>
            <Input
              value={this.props.chartInput.leaderboardUrl}
              onChange={(e) => this.props.changeSimpleInput('chartInput', 'leaderboardUrl', e)}
            />
          </InputContainer>
        </div>
      );
    } else {
      inputForms = (
        <div>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Player
            </StyledLabel>
            <Input
              value={this.props.recordInput.player}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'player', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              {this.props.chartType === 'speedrun' ? 'Time' : 'Score'}
            </StyledLabel>
            <Input
              value={this.props.recordInput.mark}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'mark', e)}
            />
          </InputContainer>
          {/* <InputContainer page={this.props.page}>
            <StyledLabel>
              Console
            </StyledLabel>
            <Input
              value={this.props.recordInput.console}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'console', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Platform
            </StyledLabel>
            <Input
              value={this.props.recordInput.platform}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'platform', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Version
            </StyledLabel>
            <Input
              value={this.props.recordInput.version}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'version', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Region
            </StyledLabel>
            <Input
              value={this.props.recordInput.region}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'region', e)}
            />
          </InputContainer> */}
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Year
            </StyledLabel>
            <Input
              value={this.props.recordInput.year}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'year', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Month
            </StyledLabel>
            <Input
              value={this.props.recordInput.month}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'month', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Day
            </StyledLabel>
            <Input
              value={this.props.recordInput.day}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'day', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              VOD URL
            </StyledLabel>
            <Input
              value={this.props.recordInput.vodUrl}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'vodUrl', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Is Milestone?
            </StyledLabel>
            <Input
              value={this.props.recordInput.isMilestone}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'isMilestone', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Tooltip Note
            </StyledLabel>
            <Input
              value={this.props.recordInput.tooltipNote}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'tooltipNote', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Label Text
            </StyledLabel>
            <Input
              value={this.props.recordInput.labelText}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'labelText', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Detailed Text
            </StyledLabel>
            <Input
              value={this.props.recordInput.detailedText}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'detailedText', e)}
            />
          </InputContainer>
        </div>
      );
    }

    return (
      <div>
        {inputForms}
        <ButtonContainer>
          <Button
            type='primary'
            size='large'
            onClick={this.props.submitData}
          >
            Save & Continue
          </Button>
        </ButtonContainer>
      </div>
    );
  }
};