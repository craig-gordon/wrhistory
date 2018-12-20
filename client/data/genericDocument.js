export const speedrunDocument = {
  type: 'speedrun',
  gameTitle: 'Game',
  category: 'Category',
  yAxisTickInterval: 600000,
  records: [
    {
      id: 0,
      type: 'time',
      mark: 3600,
      playerName: 'Speedrunner',
      platform: 'PC',
      version: 'U',
      year: 1970,
      month: 0,
      day: 1,
      avatar: undefined,
      vodUrl: undefined,
      isMilestone: false,
      tooltipNote: undefined,
      labelText: undefined,
      detailedText: 'This is an example detailed description of this run.'
    }
  ]
};

export const highscoreDocument = {
  type: 'highscore',
  gameTitle: 'Game',
  category: 'Category',
  yAxisTickInterval: 100000,
  records: [
    {
      id: 0,
      type: 'score',
      mark: 100000,
      playerName: 'Scorer',
      platform: 'Arcade',
      version: 'U',
      year: 1970,
      month: 0,
      day: 1,
      avatar: undefined,
      vodUrl: undefined,
      isMilestone: false,
      tooltipNote: undefined,
      labelText: undefined,
      detailedText: 'This is an example detailed description of this score.'
    }
  ]
};