export const CATEGORIES = [
  'Africa',
  'Americas',
  'ArtandDesign',
  'Arts',
  'AsiaPacific',
  'Automobiles',
  'Baseball',
  'Books/Review',
  'Business',
  'Climate',
  'CollegeBasketball',
  'CollegeFootball',
  'Dance',
  'Dealbook',
  'DiningandWine',
  'Economy',
  'Education',
  'EnergyEnvironment',
  'Europe',
  'FashionandStyle',
  'Golf',
  'Health',
  'Hockey',
  'HomePage',
  'Jobs',
  'Lens',
  'MediaandAdvertising',
  'MiddleEast',
  'MostEmailed',
  'MostShared',
  'MostViewed',
  'Movies',
  'Music',
  'NYRegion',
  'Obituaries',
  'PersonalTech',
  'Politics',
  'ProBasketball',
  'ProFootball',
  'RealEstate',
  'Science',
  'SmallBusiness',
  'Soccer',
  'Space',
  'Sports',
  'SundayBookReview',
  'Sunday-Review',
  'Technology',
  'Television',
  'Tennis',
  'Theater',
  'TMagazine',
  'Travel',
  'Upshot',
  'US',
  'Weddings',
  'Well',
  'World',
  'YourMoney',
];
export interface NewsFilter {
  page: number;
  q?: string;
  fq?: string;
  begin_date?: string; //20120101
  end_date?: string; //20120101
}

interface MultiMedia {
  rank?: number;
  subtype?: string;
  caption?: string;
  type: string;
  url: string; //"images/2024/04/06/opinion/06kirchick/06kirchick-articleLarge.jpg",
  height: number; // 600,
  width: number; // 600,
}
interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}
export interface Article {
  _id: string;
  web_url: string;
  news_desk: NYTimesCategory;
  snippet?: string;
  source?: string;
  multimedia?: MultiMedia[];
  keywords: Keyword[];
  pub_date: string; //"2024-04-06T11:00:24+0000";
  section_name: string; //Sports
  byline: {
    original: string; //author(s)
  };
}

export interface NewsRes {
  status: string;
  response: { docs: Article[] };
}

export type NYTimesCategory =
  | 'Adventure Sports'
  | 'Arts & Leisure'
  | 'Arts'
  | 'Automobiles'
  | 'Blogs'
  | 'Books'
  | 'Booming'
  | 'Business Day'
  | 'Business'
  | 'Cars'
  | 'Circuits'
  | 'Classifieds'
  | 'Connecticut'
  | 'Crosswords & Games'
  | 'Culture'
  | 'DealBook'
  | 'Dining'
  | 'Editorial'
  | 'Education'
  | 'Energy'
  | 'Entrepreneurs'
  | 'Environment'
  | 'Escapes'
  | 'Fashion & Style'
  | 'Fashion'
  | 'Favorites'
  | 'Financial'
  | 'Flight'
  | 'Food'
  | 'Foreign'
  | 'Generations'
  | 'Giving'
  | 'Global Home'
  | 'Health & Fitness'
  | 'Health'
  | 'Home & Garden'
  | 'Home'
  | 'Jobs'
  | 'Key'
  | 'Letters'
  | 'Long Island'
  | 'Magazine'
  | 'Market Place'
  | 'Media'
  | "Men's Health"
  | 'Metro'
  | 'Metropolitan'
  | 'Movies'
  | 'Museums'
  | 'National'
  | 'Nesting'
  | 'Obits'
  | 'Obituaries'
  | 'Obituary'
  | 'OpEd'
  | 'Opinion'
  | 'Outlook'
  | 'Personal Investing'
  | 'Personal Tech'
  | 'Play'
  | 'Politics'
  | 'Regionals'
  | 'Retail'
  | 'Retirement'
  | 'Science'
  | 'Small Business'
  | 'Society'
  | 'Sports'
  | 'Style'
  | 'Sunday Business'
  | 'Sunday Review'
  | 'Sunday Styles'
  | 'T Magazine'
  | 'T Style'
  | 'Technology'
  | 'Teens'
  | 'Television'
  | 'The Arts'
  | 'The Business of Green'
  | 'The City Desk'
  | 'The City'
  | 'The Marathon'
  | 'The Millennium'
  | 'The Natural World'
  | 'The Upshot'
  | 'The Weekend'
  | 'The Year in Pictures'
  | 'Theater'
  | 'Then & Now'
  | 'Thursday Styles'
  | 'Times Topics'
  | 'Travel'
  | 'U.S.'
  | 'Universal'
  | 'Upshot'
  | 'UrbanEye'
  | 'Vacation'
  | 'Washington'
  | 'Wealth'
  | 'Weather'
  | 'Week in Review'
  | 'Week'
  | 'Weekend'
  | 'Westchester'
  | 'Wireless Living'
  | "Women's Health"
  | 'Working'
  | 'Workplace'
  | 'World'
  | 'Your Money';
