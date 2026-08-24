const TEAMS_DATA = [
  {
    id: 'fc-augsburg',
    name: 'FC Augsburg',
    shortName: 'Augsburg',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/fc-augsburg-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/fc-augsburg-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/fc-augsburg-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/fc-augsburg-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/fc-augsburg-third.png',
        url: 'https://www.footballkitarchive.com/fc-augsburg-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'bayer-leverkusen',
    name: 'Bayer 04 Leverkusen',
    shortName: 'Leverkusen',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/bayer-04-leverkusen-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/bayer-leverkusen-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/bayer-04-leverkusen-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/bayer-leverkusen-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/bayer-04-leverkusen-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/bayer-leverkusen-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'bayern-munchen',
    name: 'Bayern München',
    shortName: 'Bayern',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/bayern-munchen-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/bayern-munchen-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/bayern-munchen-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/bayern-munchen-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/bayern-munchen-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/bayern-munchen-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'borussia-dortmund',
    name: 'Borussia Dortmund',
    shortName: 'BVB',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/borussia-dortmund-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/borussia-dortmund-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/borussia-dortmund-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/borussia-dortmund-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/borussia-dortmund-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/borussia-dortmund-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'borussia-monchengladbach',
    name: 'Borussia Mönchengladbach',
    shortName: 'Gladbach',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/borussia-monchengladbach-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/borussia-monchengladbach-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/borussia-monchengladbach-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/borussia-monchengladbach-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/borussia-monchengladbach-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/borussia-monchengladbach-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'eintracht-frankfurt',
    name: 'Eintracht Frankfurt',
    shortName: 'Frankfurt',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/eintracht-frankfurt-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/eintracht-frankfurt-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/eintracht-frankfurt-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/eintracht-frankfurt-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/eintracht-frankfurt-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/eintracht-frankfurt-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'sc-freiburg',
    name: 'SC Freiburg',
    shortName: 'Freiburg',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/sc-freiburg-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/sc-freiburg-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/sc-freiburg-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/sc-freiburg-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/sc-freiburg-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/sc-freiburg-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'hamburger-sv',
    name: 'Hamburger SV',
    shortName: 'HSV',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/hamburger-sv-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/hamburger-sv-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/hamburger-sv-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/hamburger-sv-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/hamburger-sv-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/hamburger-sv-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'tsg-1899-hoffenheim',
    name: 'TSG 1899 Hoffenheim',
    shortName: 'Hoffenheim',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/tsg-1899-hoffenheim-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/tsg-1899-hoffenheim-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/tsg-1899-hoffenheim-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/tsg-1899-hoffenheim-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/tsg-1899-hoffenheim-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/tsg-1899-hoffenheim-2026-27-third-kit/'
      }
    }
  },
  {
    id: '1-fc-koln',
    name: '1. FC Köln',
    shortName: 'Köln',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/1-fc-koln-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-koln-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/1-fc-koln-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-koln-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/1-fc-koln-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-koln-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'rb-leipzig',
    name: 'RB Leipzig',
    shortName: 'Leipzig',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/rb-leipzig-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/rb-leipzig-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/rb-leipzig-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/rb-leipzig-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/rb-leipzig-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/rb-leipzig-2026-27-third-kit/'
      }
    }
  },
  {
    id: '1-fsv-mainz-05',
    name: '1. FSV Mainz 05',
    shortName: 'Mainz',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/1-fsv-mainz-05-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fsv-mainz-05-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/1-fsv-mainz-05-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fsv-mainz-05-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/1-fsv-mainz-05-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fsv-mainz-05-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'sc-paderborn-07',
    name: 'SC Paderborn 07',
    shortName: 'Paderborn',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/sc-paderborn-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/sc-paderborn-07-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/sc-paderborn-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/sc-paderborn-07-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/sc-paderborn-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/sc-paderborn-07-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'fc-schalke-04',
    name: 'FC Schalke 04',
    shortName: 'Schalke',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/schalke-04-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/fc-schalke-04-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/schalke-04-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/fc-schalke-04-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/schalke-04-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/fc-schalke-04-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'sv-elversberg',
    name: 'SV Elversberg',
    shortName: 'Elversberg',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/sv-elversberg-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/sv-elversberg-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/sv-elversberg-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/sv-elversberg-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/sv-elversberg-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/sv-elversberg-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'vfb-stuttgart',
    name: 'VfB Stuttgart',
    shortName: 'Stuttgart',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/vfb-stuttgart-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfb-stuttgart-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/vfb-stuttgart-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfb-stuttgart-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/vfb-stuttgart-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfb-stuttgart-2026-27-third-kit/'
      }
    }
  },
  {
    id: '1-fc-union-berlin',
    name: '1. FC Union Berlin',
    shortName: 'Union',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/union-berlin-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-union-berlin-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/union-berlin-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-union-berlin-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/union-berlin-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-union-berlin-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'werder-bremen',
    name: 'Werder Bremen',
    shortName: 'Bremen',
    league: 'bundesliga',
    kits: {
      home: {
        img: 'images/bundesliga/werder-bremen-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/werder-bremen-2026-27-home-kit/'
      },
      away: {
        img: 'images/bundesliga/werder-bremen-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/werder-bremen-2026-27-away-kit/'
      },
      third: {
        img: 'images/bundesliga/werder-bremen-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/werder-bremen-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'arminia-bielefeld',
    name: 'Arminia Bielefeld',
    shortName: 'Bielefeld',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/arminia-bielefeld-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/arminia-bielefeld-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/arminia-bielefeld-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/arminia-bielefeld-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/arminia-bielefeld-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/arminia-bielefeld-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'vfl-bochum',
    name: 'VfL Bochum',
    shortName: 'Bochum',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/vfl-bochum-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfl-bochum-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/vfl-bochum-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfl-bochum-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/vfl-bochum-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfl-bochum-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'eintracht-braunschweig',
    name: 'Eintracht Braunschweig',
    shortName: 'Braunschweig',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/eintracht-braunschweig-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/eintracht-braunschweig-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/eintracht-braunschweig-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/eintracht-braunschweig-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/eintracht-braunschweig-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/eintracht-braunschweig-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'sv-darmstadt-98',
    name: 'SV Darmstadt 98',
    shortName: 'Darmstadt',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/sv-darmstadt-98-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/sv-darmstadt-98-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/sv-darmstadt-98-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/sv-darmstadt-98-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/sv-darmstadt-98-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/sv-darmstadt-98-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'dynamo-dresden',
    name: 'Dynamo Dresden',
    shortName: 'Dresden',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/sg-dynamo-dresden-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/dynamo-dresden-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/sg-dynamo-dresden-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/dynamo-dresden-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/sg-dynamo-dresden-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/dynamo-dresden-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'energie-cottbus',
    name: 'Energie Cottbus',
    shortName: 'Cottbus',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/energie-cottbus-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/energie-cottbus-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/energie-cottbus-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/energie-cottbus-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/energie-cottbus-third.png',
        url: 'https://www.footballkitarchive.com/energie-cottbus-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'greuther-furth',
    name: 'SpVgg Greuther Fürth',
    shortName: 'Fürth',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/greuther-furth-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/greuther-furth-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/greuther-furth-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/greuther-furth-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/greuther-furth-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/greuther-furth-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'hannover-96',
    name: 'Hannover 96',
    shortName: 'Hannover',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/hannover-96-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/hannover-96-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/hannover-96-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/hannover-96-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/hannover-96-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/hannover-96-2026-27-third-kit/'
      }
    }
  },
  {
    id: '1-fc-heidenheim',
    name: '1. FC Heidenheim',
    shortName: 'Heidenheim',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/1-fc-heidenheim-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-heidenheim-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/1-fc-heidenheim-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-heidenheim-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/1-fc-heidenheim-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-heidenheim-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'hertha-berlin',
    name: 'Hertha BSC',
    shortName: 'Hertha',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/hertha-bsc-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/hertha-berlin-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/hertha-bsc-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/hertha-berlin-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/hertha-bsc-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/hertha-berlin-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'holstein-kiel',
    name: 'Holstein Kiel',
    shortName: 'Kiel',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/holstein-kiel-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/holstein-kiel-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/holstein-kiel-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/holstein-kiel-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/holstein-kiel-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/holstein-kiel-2026-27-third-kit/'
      }
    }
  },
  {
    id: '1-fc-kaiserslautern',
    name: '1. FC Kaiserslautern',
    shortName: 'FCK',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/1-fc-kaiserslautern-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-kaiserslautern-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/1-fc-kaiserslautern-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-kaiserslautern-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/1-fc-kaiserslautern-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-kaiserslautern-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'karlsruher-sc',
    name: 'Karlsruher SC',
    shortName: 'KSC',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/karlsruher-sc-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/karlsruher-sc-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/karlsruher-sc-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/karlsruher-sc-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/karlsruher-sc-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/karlsruher-sc-2026-27-third-kit/'
      }
    }
  },
  {
    id: '1-fc-magdeburg',
    name: '1. FC Magdeburg',
    shortName: 'Magdeburg',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/1-fc-magdeburg-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-magdeburg-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/1-fc-magdeburg-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-magdeburg-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/1-fc-magdeburg-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-magdeburg-2026-27-third-kit/'
      }
    }
  },
  {
    id: '1-fc-nurnberg',
    name: '1. FC Nürnberg',
    shortName: 'Nürnberg',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/1-fc-nurnberg-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-nurnberg-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/1-fc-nurnberg-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-nurnberg-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/1-fc-nurnberg-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/1-fc-nurnberg-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'vfl-osnabruck',
    name: 'VfL Osnabrück',
    shortName: 'Osnabrück',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/vfl-osnabruck-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfl-osnabruck-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/vfl-osnabruck-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfl-osnabruck-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/vfl-osnabruck-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfl-osnabruck-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'fc-st-pauli',
    name: 'FC St. Pauli',
    shortName: 'St. Pauli',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/fc-st-pauli-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/fc-st-pauli-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/fc-st-pauli-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/fc-st-pauli-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/fc-st-pauli-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/fc-st-pauli-2026-27-third-kit/'
      }
    }
  },
  {
    id: 'vfl-wolfsburg',
    name: 'VfL Wolfsburg',
    shortName: 'Wolfsburg',
    league: '2bundesliga',
    kits: {
      home: {
        img: 'images/2bundesliga/vfl-wolfsburg-2026-27-home-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfl-wolfsburg-2026-27-home-kit/'
      },
      away: {
        img: 'images/2bundesliga/vfl-wolfsburg-2026-27-away-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfl-wolfsburg-2026-27-away-kit/'
      },
      third: {
        img: 'images/2bundesliga/vfl-wolfsburg-2026-27-third-kit.jpg',
        url: 'https://www.footballkitarchive.com/vfl-wolfsburg-2026-27-third-kit/'
      }
    }
  },
];

const CATEGORIES = [
  { id: 'bundesliga-home', label: 'Bundesliga — Home', league: 'bundesliga', kitType: 'home', icon: '🏠' },
  { id: 'bundesliga-away', label: 'Bundesliga — Away', league: 'bundesliga', kitType: 'away', icon: '✈️' },
  { id: 'bundesliga-third', label: 'Bundesliga — Third', league: 'bundesliga', kitType: 'third', icon: '🎽' },
  { id: '2bundesliga-home', label: '2. Bundesliga — Home', league: '2bundesliga', kitType: 'home', icon: '🏠' },
  { id: '2bundesliga-away', label: '2. Bundesliga — Away', league: '2bundesliga', kitType: 'away', icon: '✈️' },
  { id: '2bundesliga-third', label: '2. Bundesliga — Third', league: '2bundesliga', kitType: 'third', icon: '🎽' },
];
