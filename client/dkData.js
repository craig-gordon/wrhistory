const data = [
  {
    id: 0,
    score: 874300,
    player: 'Billy Mitchell',
    platform: 'Arcade',
    verified: true,
    venue: 'live',
    year: 1982,
    month: 8,
    day: 13,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed:  `This was an historic record set during the famous Time magazine photoshoot 
    gathering. Mitchell's score, which dwarfed any proven, existing Donkey Kong score, stood 
    for 18 years.`
  },
  {
    id: 1,
    score: 879200,
    player: 'Tim Sczerby',
    platform: 'Arcade',
    verified: true,
    venue: 'video'
    year: 2000,
    month: 8,
    day: 17,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed:  `Tim Sczerby would only hold the DK record this one time, unlike every other 
    competitor that has held the title. This score was notably omitted from the King of Kong 
    documentary.`
  },
  {
    id: 2,
    score: 947200,
    player: 'Steve Wiebe',
    platform: 'Arcade (Double Donkey Kong)',
    verified: false,
    venue: 'video',
    year: 2003,
    month: 6,
    day: 30,
    avatar: undefined,
    vodUrl: undefined,
    note: `TG verification redacted due to the use of DDK board.`,
    detailed: `Steve Wiebe's first DK record. This score was initially verified by Twin 
    Galaxies, but was later redacted due to the discovery that Wiebe had played on a Double 
    Donkey Kong board, which has both Donkey Kong and Donkey Kong Jr on it.`
  },
  {
    id: 3,
    score: 933900,
    player: 'Billy Mitchell',
    platform: 'Arcade',
    verified: true,
    venue: 'live',
    year: 2004,
    month: 5,
    day: 7,
    avatar: undefined,
    vodUrl: undefined,
    note: `Officially recognized by TG over Wiebe's 947,200 score.`,
    detailed: `This score was performed live at the Midwest Gaming Classic event. Although 
    this score was lower than Wiebe's 947,200 score, it was recognized by TG as the official
    record.`
  },
  {
    id: 4,
    score: 985000,
    player: 'Steve Wiebe',
    platform: 'Arcade',
    verified: false,
    venue: 'video',
    year: 2004,
    month: 5,
    day: 29,
    avatar: undefined,
    vodUrl: undefined,
    note: `Submitted to TG but not verified before Wiebe's next submission.`,
    detailed: `Twin Galaxies adjudication took a longer time to verify Wiebe's next submissions 
    after the DDK score debacle. This score was never officially verified because Wiebe submitted 
    another improvement before the verification process had concluded.`
  },
  {
    id: 5,
    score: 999500,
    player: 'Steve Wiebe',
    platform: 'Arcade',
    verified: false,
    venue: 'video',
    year: 2004,
    month: 6,
    day: 29,
    avatar: undefined,
    vodUrl: undefined,
    note: `Submitted to TG but again not verified before Wiebe's next submission.`,
    detailed: `Oh so close to 1 million! This score suffered the same fate as the previous score – 
    Wiebe submitted yet another improvement before TG could finish its verification process.`
  },
  {
    id: 6,
    score: 1006600,
    player: 'Steve Wiebe',
    platform: 'Arcade',
    verified: false,
    venue: 'video',
    year: 2004,
    month: 7,
    day: 4,
    avatar: undefined,
    vodUrl: undefined,
    note: `The first legitimate 1 million point score!`,
    detailed: `The first 1 million point game believed to be legitimate. This score, as well as the 
    previous two scores that remained unverified, were played on a genuine original Donkey Kong PCB. 
    This score was submitted to TG, but was ultimately rejected because the DK PCB Wiebe had played 
    on had been provided to him by Roy Schildt, who was greatly mistrusted by the personnel at TG.`
  },
  {
    id: 7,
    score: 985600,
    player: 'Steve Wiebe',
    platform: 'Arcade',
    verified: true,
    venue: 'live',
    year: 2005,
    month: 6,
    day: 3,
    avatar: undefined,
    vodUrl: undefined,
    note: `Steve's first officially verified record.`,
    detailed: `Fed up with all the rejected and unverified scores, Steve traveled to the 7th 
    Annual American Classic Arcade Museum Tournament, held at the famous Funspot arcade. This 
    score was immediately verified and unquestionably proved Wiebe's prowess to the entire 
    classic gaming community.`
  },
  {
    id: 8,
    score: 1047200,
    player: 'Billy Mitchell',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2005,
    month: 6,
    day: 4,
    avatar: undefined,
    vodUrl: undefined,
    note: `Now known to have been played on emulator.`,
    detailed: `The infamous taped Billy Mitchell score. This was allegedly played on 
    June 7, 2004, but Mitchell held the tape in his own possession until Wiebe achieved his 
    new officially recognized record score at Funspot. Chronologically, this was the first 
    million point game ever played, as its claimed performance date is before Wiebe's rejected 
    1.006 score. However, in 2017, it was conclusively discovered by the Donkey Kong Forum that 
    this score had been played on emulator, likely MAME. After verifying this fact, Twin Galaxies 
    removed all of Billy's scores from their database and retroactively acknowledged Steve Wiebe 
    as the official first person in history to score over a million points in Donkey Kong.`
  },
  {
    id: 9,
    score: 1049100,
    player: 'Steve Wiebe',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2006,
    month: 8,
    day: 3,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `Steve's first wholly undisputed record in Donkey Kong, unaffected by verification 
    rejections or secret score tapes.`
  },
  {
    id: 10,
    score: 1050200,
    player: 'Billy Mitchell',
    platform: 'Arcade',
    verified: true,
    venue: 'live',
    year: 2007,
    month: 7,
    day: 13,
    avatar: undefined,
    vodUrl: undefined,
    note: `Now known to have been played on emulator.`,
    detailed: `This score was reportedly played live at a mortgage broker's convention with the 
    video feed projected on a screen at the event. Mitchell was purportedly playing from another 
    room, but no known witnesses have surfaced that can independently verify this to be the case. 
    Like Mitchell's previous 1.047 score, this score was later discovered to have been played on 
    emulator, and is no longer considered a legitimate score.`
  },
  {
    id: 11,
    score: 1061700,
    player: 'Hank Chien',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2010,
    month: 2,
    day: 26,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `The first time a relatively unknown competitor claimed the DK Arcade record since 
    King of Kong had propelled the game into the public eye. Hank had previously been playing on 
    MAME, but made the switch to Arcade and achieved this 11k improvement over Billy's previous 
    score.`
  },
  {
    id: 12,
    score: 1062800,
    player: 'Billy Mitchell',
    platform: 'Arcade',
    verified: true,
    venue: 'live',
    year: 2010,
    month: 7,
    day: 31,
    avatar: undefined,
    vodUrl: undefined,
    note: `Now known to have been played on emulator.`,
    detailed: `Allegedly played at a Boomers theme park in Florida. Billy claimed that immediately 
    after achieving this score, he started a Donkey Kong Jr game and reclaimed that record as well 
    from Mark Kiehl. However, this score, too, was found by the Donkey Kong community to have been 
    played on emulator, and so it was removed from Twin Galaxies' leaderboard.`
  },
  {
    id: 13,
    score: 1064500,
    player: 'Steve Wiebe',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2010,
    month: 8,
    day: 30,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `Wiebe's last DK record. This set an additional milestone as the quickest to beat the 
    incumbent score in the history of competitive Donkey Kong, happening only 30 days after Billy's 
    1.062 score.`
  },
  {
    id: 14,
    score: 1068000,
    player: 'Hank Chien',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2010,
    month: 12,
    day: 27,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `The beginning of Hank's nearly 4 year reign as the champion of Donkey Kong.`
  },
  {
    id: 15,
    score: 1090400,
    player: 'Hank Chien',
    platform: 'Arcade',
    verified: true,
    venue: 'live',
    year: 2011,
    month: 2,
    day: 27,
    avatar: undefined,
    vodUrl: undefined,
    note: 'Played on the legendary Funspot DK machine.',
    detailed: `This score was performed live at Funspot on the same Donkey Kong machine that Wiebe 
    had achieved his first "official" record, the 985k score. Despite the increasing rarity of new 
    DK records being set during live performances, this would not be the last time a new DK record 
    was set on Funspot's venerable machine.`
  },
  {
    id: 16,
    score: 1110100,
    player: 'Hank Chien',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2012,
    month: 5,
    day: 18,
    avatar: undefined,
    vodUrl: undefined,
    note: 'First 1.1 million score.',
    detailed: `Chien achieved this milestone score while training for Kong Off 2.`    
  },
  {
    id: 17,
    score: 1127700,
    player: 'Hank Chien',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2010,
    month: 7,
    day: 25,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `Chien tightened his stranglehold on the DK record with this relatively small improvement 
    of 17k points.`
  },
  {
    id: 18,
    score: 1138600,
    player: 'Hank Chien',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2010,
    month: 11,
    day: 1,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `Chien improved the record one last time. After this, the baton would be passed to new 
    blood.`
  },
  {
    id: 19,
    score: 1141800,
    player: 'Robbie Lakeman',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2014,
    month: 9,
    day: 5,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `Robbie Lakeman, a golfer and professional poker player, declared in August 2013 that he 
    felt capable of "taking on Hank." He would make good on that declaration a little more than a year 
    later, besting Hank's score by 3200 points.`
  },
  {
    id: 20,
    score: 1144800,
    player: 'Robbie Lakeman',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2014,
    month: 12,
    day: 1,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `Lakeman achieved this small improvement a few months after initially claiming the record.`
  },
  {
    id: 21,
    score: 1158400,
    player: 'Robbie Lakeman',
    platform: 'Arcade',
    verified: true,
    venue: 'live',
    year: 2015,
    month: 6,
    day: 24,
    avatar: undefined,
    vodUrl: undefined,
    note: `Played on the legendary Funspot DK machine`,
    detailed: `10 years prior, Steve Wiebe achieved his first officially recognized DK record on Funspot's 
    DK machine. 5 years prior, Hank Chien obtained his own live performance DK record, also on Funspot's 
    machine. Lakeman followed in his predecessors' footsteps by achieving the 3rd live DK record to be set 
    on Funspot's hallowed Donkey Kong machine. This also happened to be Lakeman's 3rd DK record.`
  },
  {
    id: 22,
    score: 1170500,
    player: 'Wes Copeland',
    platform: 'Arcade',
    verified: true,
    venue: 'stream',
    year: 2015,
    month: 9,
    day: 17,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `It was assumed at this point that Lakeman would soon reach the mythical 1.2 million mark, 
    effectively shutting down any competitor's chances. Wes Copeland had started playing Donkey Kong near 
    the end of 2013, and 2 years later, he finally took the crown during a Donkey Kong Online Open 
    tournament.`
  },
  {
    id: 23,
    score: 1172100,
    player: 'Robbie Lakeman',
    platform: 'Arcade',
    verified: true,
    venue: 'stream',
    year: 2015,
    month: 9,
    day: 18,
    avatar: undefined,
    vodUrl: undefined,
    note: `Achieved 6 hours after Copeland's previous record.`,
    detailed: `In one of the most stunning rebuttals in the history of videogame record-chasing, Lakeman 
    fired back with a 1600 point improvement a mere 6 hours after Copeland obtained his first record score. 
    Copeland remarked feeling "mentally scarred" from being beaten so swiftly after his long road to the 
    top.`
  },
  {
    id: 24,
    score: 1177200,
    player: 'Robbie Lakeman',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2015,
    month: 10,
    day: 21,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `Lakeman would not give Copeland any breathing room to regain the top score, improving his 
    own previous mark by 5100 points.`
  },
  {
    id: 25,
    score: 1190000,
    player: 'Wes Copeland',
    platform: 'Arcade',
    verified: true,
    venue: 'stream',
    year: 2016,
    month: 1,
    day: 4,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `After the unexpected and abrupt rebuke administered to him by Lakeman a few months prior, 
    Copeland proceeded to close the majority of the gap to the vaunted "1.2", bringing the record from 
    1.177 to an even 1.9 in one fell swoop.`
  },
  {
    id: 26,
    score: 1190200,
    player: 'Robbie Lakeman',
    platform: 'Arcade',
    verified: true,
    venue: 'video',
    year: 2016,
    month: 4,
    day: 11,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `Lakeman struck back 3 months later, squeaking by Copeland's score with the smallest record 
    improvement in Donkey Kong to date, a diminutive 200 points.`    
  },
  {
    id: 27,
    score: 1195100,
    player: 'Wes Copeland',
    platform: 'Arcade',
    verified: true,
    venue: 'stream',
    year: 2016,
    month: 4,
    day: 19,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `The Copeland/Lakeman rivalry continued to rage on fiercely, with 1.2 ever on the horizon. 
    Who would be the first to cross that fabled rubicon? Copeland once again took back the record, but he 
    was unable to close the deal, stopping at the doorstep of 1.2 with a tantalizing 1.195 score.`
  },
  {
    id: 28,
    score: 1218000,
    player: 'Wes Copeland',
    platform: 'Arcade',
    verified: true,
    venue: 'stream',
    year: 2016,
    month: 5,
    day: 5,
    avatar: undefined,
    vodUrl: undefined,
    note: `The first 1.2 million point score.`,
    detailed: `Finally, Copeland did it, positively smashing past the 1.2 barrier. News outlets proceeded 
    to declare the Donkey Kong high score record "dead" with Copeland's "perfect game." Although Copeland's 
    game was impeccably executed, as history has proven time and time again, no high score or speedrun worth 
    its salt is ever truly dead...`
  },
  {
    id: 29,
    score: 1230100,
    player: 'Robbie Lakeman',
    platform: 'Arcade',
    verified: true,
    venue: 'stream',
    year: 2017,
    month: 12,
    day: 21,
    avatar: undefined,
    vodUrl: undefined,
    note: undefined,
    detailed: `Copeland's 1.218 mark stood for 1.5 years, certainly a long tenure for modern Donkey Kong. 
    While Copeland "retired" from the game and rested on his laurels, Lakeman eventually retaliated with a 
    staggering 1.23 score, proving that the Donkey Kong high score can always be beaten with enough tenacity. 
    Incredibly, Lakeman achieved this score on his first credit of that day's session, streaming his gameplay 
    on Facebook.`
  },
  {
    id: 30,
    score: 1247700,
    player: 'Robbie Lakeman',
    platform: 'Arcade',
    verified: true,
    venue: 'stream',
    year: 2018,
    month: 2,
    day: 2,
    avatar: undefined,
    vodUrl: undefined,
    note: `Current world record.`,
    detailed: `Lakeman was not content simply beating what had been called "the perfect game." He once again 
    crushed the existing mark with the current best score ever achieved in Donkey Kong: 1,247,700.`
  }
];

export default data;