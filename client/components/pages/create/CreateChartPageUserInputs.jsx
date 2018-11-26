import React from 'react';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';


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
          <div>
            Game Title: <Input
              value={this.props.chartInput.gameTitle}
              onChange={(e) => this.props.changeSimpleInput('chartInput', 'gameTitle', e)}
            />
          </div>
          <div>
            Category Title: <Input
              value={this.props.chartInput.category}
              onChange={(e) => this.props.changeSimpleInput('chartInput', 'category', e)}
            />
          </div>
          <div>
            Leaderboard URL: <Input
              value={this.props.chartInput.leaderboardUrl}
              onChange={(e) => this.props.changeSimpleInput('chartInput', 'leaderboardUrl', e)}
            />
          </div>
        </div>
      );
    } else {
      inputForms = (
        <div>
          <div>
            Player: <Input
              value={this.props.recordInput.player}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'player', e)}
            />
          </div>
          <div>
            Mark: <Input
              value={this.props.recordInput.mark}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'mark', e)}
            />
          </div>
          <div>
            Console: <Input
              value={this.props.recordInput.console}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'console', e)}
            />
          </div>
          <div>
            Platform: <Input
              value={this.props.recordInput.platform}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'platform', e)}
            />
          </div>
          <div>
            Version: <Input
              value={this.props.recordInput.version}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'version', e)}
            />
          </div>
          <div>
            Region: <Input
              value={this.props.recordInput.region}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'region', e)}
            />
          </div>
          <div>
            Year: <Input
              value={this.props.recordInput.year}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'year', e)}
            />
          </div>
          <div>
            Month: <Input
              value={this.props.recordInput.month}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'month', e)}
            />
          </div>
          <div>
            Day: <Input
              value={this.props.recordInput.day}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'day', e)}
            />
          </div>
          <div>
            VOD URL: <Input
              value={this.props.recordInput.vodUrl}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'vodUrl', e)}
            />
          </div>
          <div>
            Is Milestone?: <Input
              value={this.props.recordInput.isMilestone}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'isMilestone', e)}
            />
          </div>
          <div>
            Tooltip Note: <Input
              value={this.props.recordInput.tooltipNote}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'tooltipNote', e)}
            />
          </div>
          <div>
            Label Text: <Input
              value={this.props.recordInput.labelText}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'labelText', e)}
            />
          </div>
          <div>
            Detailed Text: <Input
              value={this.props.recordInput.detailedText}
              onChange={(e) => this.props.changeSimpleInput('recordInput', 'detailedText', e)}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        {inputForms}
        <Button
          type='primary'
          onClick={this.props.submitData}>Save & Continue</Button>
      </div>
    );
  }
};