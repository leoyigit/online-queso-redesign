/* ============================================================
   Online Queso — shared content data.
   Single source of truth for the static site generator (build.js).
   Plain CommonJS so Node can require it; the browser pages are
   pre-rendered from this data and don't load it directly.
   ============================================================ */

var SITE = 'https://onlinequeso.com';

// ---- Category metadata ---------------------------------------------------
// `path` is the on-disk / URL folder slug for the category, e.g.
//   /blogs/tips-and-tricks/index.html
var catMeta = {
  news:     { name: 'News, Trends & Stories', path: 'news', tagline: 'The stories behind the brands.', kind: 'Story 16:9', desc: 'Origin stories, market shifts, and the moves shaping commerce. The brands everyone talks about — and the lessons hiding inside them.' },
  tips:     { name: 'Tips, Tricks & Advice', path: 'tips-and-tricks', tagline: 'Playbooks you can run tomorrow.', kind: 'Guide 16:9', desc: 'Tactical, no-fluff advice from operators in the trenches. Frameworks, teardowns, and the unglamorous work that actually moves the number.' },
  podcasts: { name: 'Podcasts', path: 'podcasts', tagline: 'John Roman, unfiltered.', kind: 'Episode 16:9', desc: 'Long-form conversations on building, scaling, and surviving in eCommerce — featuring John Roman and a rotating cast of operators.' },
  asom:     { name: 'ASOM', path: 'asom', tagline: 'Signals with Amer & John.', kind: 'Signal 16:9', desc: 'A weekly read on what is actually happening in eCommerce and business — predictions, hot takes, and the signals worth your attention.' },
  cards:    { name: 'Sports Cards, NFTs & Crypto', path: 'sports-cards', tagline: 'The hobby, by the numbers.', kind: 'Market 16:9', desc: 'What’s heating up, what’s cooling off, and the record-breaking sales worth knowing about across cards, NFTs, and crypto.' },
  travel:   { name: 'Food & Travel', path: 'food-travel', tagline: 'A healthy obsession.', kind: 'Review 16:9', desc: 'Hotels, pizza, and the occasional wake-up call from the road. The non-business obsessions that keep things human.' }
};

// ---- Posts ---------------------------------------------------------------
var posts = [
  { id:'phia', cat:'news', title:'Phia Success Story: How Two Stanford Roommates Built a $185 Million AI Shopping Startup', author:'Lhea Ignacio', date:'A day ago', read:'7 min read', excerpt:'Most startup stories begin with a pitch deck. Phia began with frustration — and a $185M idea two Stanford roommates couldn’t ignore.', url:'/blogs/news/phoebe-gates-sophia-kianni-phia-success-story' },
  { id:'ralph', cat:'news', title:'Ralph Lauren Success Story: Building a Billion-Dollar Empire by Selling a Lifestyle', author:'John Roman', date:'A week ago', read:'8 min read', excerpt:'He didn’t sell shirts. He sold a world — and turned a tie business into a global lifestyle empire.', url:'/blogs/news/ralph-lauren-success-story-billion-dollar-lifestyle-brand' },
  { id:'carols', cat:'news', title:'Carol’s Daughter Success Story: How Lisa Price Built a Beauty Empire from a Brooklyn Kitchen', author:'John Roman', date:'2 weeks ago', read:'6 min read', excerpt:'A hobby in a Brooklyn kitchen became a beauty brand big enough for L’Oréal to buy.', url:'/blogs/news/carols-daughter-success-story-lisa-price-brooklyn-kitchen-to-loreal-exit' },
  { id:'tupperware', cat:'news', title:'How Tupperware Built an Iconic Product That Led to Its Business Collapse', author:'John Roman', date:'3 weeks ago', read:'7 min read', excerpt:'The product was perfect. The business model was a time bomb. Here’s what went wrong.', url:'/blogs/news/tupperware-business-collapse-iconic-product' },
  { id:'ikea', cat:'news', title:'The IKEA Machine: Powerful Psychology Secrets Behind IKEA’s Billion-Dollar Success Story', author:'John Roman', date:'A month ago', read:'9 min read', excerpt:'The meatballs, the maze, the flat-pack frustration — none of it is an accident.', url:'/blogs/news/ikea-psychology-retail-empire' },
  { id:'clooney', cat:'news', title:'How George Clooney and the Casamigos Founders Built a Billion-Dollar Tequila Brand And Why Crazy Mountain Could Be Next', author:'John Roman', date:'A month ago', read:'6 min read', excerpt:'A "friends drinking tequila" story that ended in a billion-dollar exit — and why Crazy Mountain could be next.', url:'/blogs/news/george-clooney-casamigos-billion-dollar-brand-crazy-mountain' },

  { id:'csuite', cat:'tips', title:'What Your C-Suite Actually Needs to Know About Google Ads', author:'John Roman', date:'A month ago', read:'5 min read', excerpt:'Strip away the jargon. Here’s the version of Google Ads your leadership team actually needs.', url:'/blogs/tips-and-tricks/what-your-c-suite-actually-needs-to-know-about-google-ads' },
  { id:'costline', cat:'tips', title:'From Cost Line to Profit Line', author:'John Roman', date:'A month ago', read:'4 min read', excerpt:'How to turn the function everyone treats as overhead into a line that actually makes money.', url:'/blogs/tips-and-tricks/from-cost-line-to-profit-line' },
  { id:'whatnot8', cat:'tips', title:'How We Built a 7-Figure Whatnot Channel - Part 8: The Crossroads', author:'John Roman', date:'A month ago', read:'6 min read', excerpt:'Every channel hits a wall. Here’s the decision that decides whether you break through it.', url:'/blogs/tips-and-tricks/how-we-built-a-7-figure-whatnot-channel-part-8-the-crossroads' },
  { id:'ltv', cat:'tips', title:'Scale LTV With Subscriptions For ANY Business | Insights from SubSummit', author:'John Roman', date:'2 months ago', read:'7 min read', excerpt:'Insights from SubSummit on bolting recurring revenue onto a business that wasn’t built for it.', url:'/blogs/tips-and-tricks/scale-ltv-with-subscriptions-for-any-business-insights-from-subsummit' },
  { id:'machine', cat:'tips', title:'Build the Machine So Your Family Never Pays the Price', author:'John Roman', date:'2 months ago', read:'5 min read', excerpt:'Systems beat heroics. Build the thing that runs without you — so you can actually go home.', url:'/blogs/tips-and-tricks/build-the-machine-so-your-family-never-pays-the-price' },
  { id:'teardown', cat:'tips', title:'Sales Teardowns, Rejection, and the Letter That Proved the Point', author:'John Roman', date:'2 months ago', read:'6 min read', excerpt:'A rejection letter, a teardown, and a lesson in selling that stuck.', url:'/blogs/tips-and-tricks/sales-teardowns-rejection-and-the-letter-that-proved-the-point' },
  { id:'strongaudit', cat:'tips', title:'What a Strong Audit Actually Includes', author:'John Roman', date:'3 months ago', read:'5 min read', excerpt:'What separates a real, useful audit from a glorified sales pitch dressed up as one.', url:'/blogs/tips-and-tricks/what-a-strong-audit-actually-includes' },
  { id:'audittricks', cat:'tips', title:'5 Audit Tricks Agencies Use to Win Your Business', author:'John Roman', date:'3 months ago', read:'5 min read', excerpt:'The five sleights of hand agencies pull in audits — and how to see through each one.', url:'/blogs/tips-and-tricks/5-audit-tricks-agencies-use-to-win-your-business' },

  { id:'cac', cat:'podcasts', title:'How John Roman Used Content + Community to Lower CAC', author:'John Roman', date:'2 months ago', read:'42 min listen', excerpt:'The content-and-community flywheel that quietly dragged acquisition costs down.', url:'/blogs/podcasts/how-john-roman-used-content-community-to-lower-cac' },
  { id:'liveshop', cat:'podcasts', title:'From $0 to $4 Million: How Live Shopping Is Changing Ecommerce', author:'John Roman', date:'2 months ago', read:'38 min listen', excerpt:'A from-scratch look at the live-shopping channel rewriting the eCommerce playbook.', url:'/blogs/podcasts/from-0-to-4-million-how-live-shopping-is-changing-ecommerce' },
  { id:'membership', cat:'podcasts', title:'The Death of the Subscription Box & The Rise of Membership', author:'John Roman', date:'3 months ago', read:'45 min listen', excerpt:'Why the subscription box is fading and what replaces it.', url:'/blogs/podcasts/the-death-of-the-subscription-box-the-rise-of-membership' },
  { id:'whatnotpod', cat:'podcasts', title:'Live Selling on Whatnot and Why It’s Way Easier to Profit Than on TikTok Shop', author:'John Roman', date:'4 months ago', read:'40 min listen', excerpt:'A candid comparison of where live commerce actually pays off.', url:'/blogs/podcasts/live-selling-on-whatnot-and-why-its-way-easier-to-profit-than-on-tiktok-shop-john-roman' },
  { id:'battlbox', cat:'podcasts', title:'How BattlBox Built a $20M Subscription Empire', author:'John Roman', date:'5 months ago', read:'44 min listen', excerpt:'The playbook behind a $20M subscription business — retention, content, and a cult following.', url:'/blogs/podcasts/how-battlbox-built-a-20m-subscription-empire' },
  { id:'futurelive', cat:'podcasts', title:'The Future of Live Shopping and Digital Retail with John Roman', author:'John Roman', date:'7 months ago', read:'39 min listen', excerpt:'Where live shopping and digital retail are actually headed — from someone building it.', url:'/blogs/podcasts/the-future-of-live-shopping-and-digital-retail-with-john-roman' },
  { id:'ep271', cat:'podcasts', title:'Episode 271: Why BattlBox’s AOV Quadrupled on Whatnot', author:'John Roman', date:'7 months ago', read:'41 min listen', excerpt:'The mechanics behind a 4x jump in average order value on Whatnot.', url:'/blogs/podcasts/episode-271-why-battlbox-s-aov-quadrupled-on-whatnot' },
  { id:'noads', cat:'podcasts', title:'This CEO Built a 7-Figure Brand Without Paid Ads (At First) | John Roman', author:'John Roman', date:'A year ago', read:'46 min listen', excerpt:'How a 7-figure brand got off the ground before a single dollar went to paid ads.', url:'/blogs/podcasts/this-ceo-built-a-7-figure-brand-without-paid-ads-at-first-john-roman' },

  { id:'cardsjun8', cat:'cards', title:'The Top 5 Sports Cards Heating Up (Week of June 8th, 2026)', author:'John Roman', date:'A day ago', read:'4 min read', excerpt:'Five cards moving fast this week — and the comps behind the climb.', url:'/blogs/sports-cards-nfts-crypto/top-5-sports-cards-heating-up-week-of-june-8th-2026' },
  { id:'cardsjun1', cat:'cards', title:'The Top 5 Sports Cards Heating Up (Week of June 1st, 2026)', author:'John Roman', date:'A week ago', read:'4 min read', excerpt:'This week’s movers across the hobby, ranked.', url:'/blogs/sports-cards-nfts-crypto/top-5-sports-cards-heating-up-week-of-june-1st-2026' },
  { id:'wemby', cat:'cards', title:'$5.11 Million Record: The Story Behind the Victor Wembanyama 2023 Panini Prizm Black 1/1 Rookie Card', author:'John Roman', date:'2 weeks ago', read:'5 min read', excerpt:'How a single rookie card became a record-shattering $5.11M sale.', url:'/blogs/sports-cards-nfts-crypto/victor-wembanyama-prizm-black-1-1-rookie-card-5-11-million-sale' },
  { id:'cardsmay25', cat:'cards', title:'The Top 5 Sports Cards Heating Up (Week of May 25th, 2026)', author:'John Roman', date:'2 weeks ago', read:'4 min read', excerpt:'The cards climbing fastest this week, with the sales to back it up.', url:'/blogs/sports-cards-nfts-crypto/top-5-sports-cards-heating-up-week-of-may-25-2026' },
  { id:'cardsmay18', cat:'cards', title:'The Top 5 Sports Cards Heating Up (Week of May 18th, 2026)', author:'John Roman', date:'3 weeks ago', read:'4 min read', excerpt:'This week’s five hottest cards across the hobby.', url:'/blogs/sports-cards-nfts-crypto/top-5-sports-cards-heating-up-week-of-may-18-2026' },
  { id:'cardsmay11', cat:'cards', title:'The Top 5 Sports Cards Heating Up (Week of May 11th, 2026)', author:'John Roman', date:'4 weeks ago', read:'4 min read', excerpt:'Five names heating up — and why the market is paying attention.', url:'/blogs/sports-cards-nfts-crypto/top-5-sports-cards-heating-up-week-of-may-11-2026' },

  { id:'ep81', cat:'asom', title:'EP 81: Goodbye', author:'Amer & John', date:'4 months ago', read:'52 min listen', excerpt:'The signal that closes a chapter — and what comes next.', url:'/blogs/signals-w-amer-john/ep-81-goodbye' },
  { id:'ep79', cat:'asom', title:'EP 79: SaaS and Agency Pricing Is Broken and No One Wants to Say It', author:'Amer & John', date:'5 months ago', read:'48 min listen', excerpt:'A blunt take on why pricing models are quietly failing everyone.', url:'/blogs/signals-w-amer-john/ep-79-saas-and-agency-pricing-is-broken-and-no-one-wants-to-say-it' },
  { id:'ep78', cat:'asom', title:'EP 78: 2026 Goals, Real Numbers, and the Lessons 2025 Taught Us', author:'Amer & John', date:'5 months ago', read:'50 min listen', excerpt:'Real numbers, honest goals, and the lessons that actually stuck.', url:'/blogs/signals-w-amer-john/ep-78-2026-goals-real-numbers-and-the-lessons-2025-taught-us' },
  { id:'ep77', cat:'asom', title:'EP 77: Here’s What We Think Is Happening in 2026 (Ecom and Business Predictions)', author:'Amer & John', date:'5 months ago', read:'49 min listen', excerpt:'The predictions Amer and John are willing to put on the record for 2026.', url:'/blogs/signals-w-amer-john/ep-77-here-s-what-we-think-is-happening-in-2026-ecom-and-business-predictions' },
  { id:'ep75', cat:'asom', title:'EP 75: Websites Are Dead, Long Live AI Commerce', author:'Amer & John', date:'6 months ago', read:'47 min listen', excerpt:'Why the classic website may be on its way out — and what AI commerce replaces it with.', url:'/blogs/signals-w-amer-john/ep-75-websites-are-dead-long-live-ai-commerce' },

  { id:'ivens', cat:'travel', title:'A Truly Thoughtful Stay at The Ivens Lisbon | A Luxury Family-Friendly Review', author:'John Roman', date:'4 months ago', read:'6 min read', excerpt:'A luxury stay that somehow nailed the family-friendly part too.', url:'/blogs/food-travel/the-ivens-lisbon-hotel-review' },
  { id:'chatgpt', cat:'travel', title:'Using the ChatGPT App in Portugal: An Unexpected Wake-Up Call About Thinking vs Auto', author:'John Roman', date:'4 months ago', read:'5 min read', excerpt:'Seven real travel moments that reframed how to actually use AI on the road.', url:'/blogs/food-travel/using-chatgpt-app-in-portugal-thinking-vs-auto' },
  { id:'viator', cat:'travel', title:'Viator Sintra Full-Day Private Tour Review: A Family-Friendly Day Trip from Lisbon Worth Every Penny', author:'John Roman', date:'5 months ago', read:'6 min read', excerpt:'A full day in Sintra, the family-friendly way — and whether the private tour earns its price.', url:'/blogs/food-travel/viator-sintra-full-day-private-tour-review-lisbon' },
  { id:'pizza', cat:'travel', title:'Pizza Review: Modern Apizza - New Haven, CT | Online Queso Scores', author:'John Roman', date:'9 months ago', read:'4 min read', excerpt:'New Haven apizza, scored on the Online Queso scale. Does Modern live up to the legend?', url:'/blogs/food-travel/pizza-review-modern-apizza-new-haven-ct-online-queso-scores' }
];

// Real featured-image paths from the live site's Shopify CDN, keyed by post id.
var IMG = {
  phia:'/cdn/shop/articles/Phia_Success_Story_Thumbnail_455f3994-64e9-4398-810d-54640961b07a_800x.png?v=1781546874',
  ralph:'/cdn/shop/articles/Ralph_Lauren_Success_Story_Thumbnail_800x.png?v=1781024510',
  carols:'/cdn/shop/articles/Carol_s_Daughter_Thumbnail_df53505b-6de2-40d0-8de6-91b8109ce3f2_800x.png?v=1779988832',
  tupperware:'/cdn/shop/articles/Tupperware_Thumbnail_800x.png?v=1779824180',
  ikea:'/cdn/shop/articles/The_IKEA_Machine_8b5826aa-4b5a-4589-8f18-d033d68c3be1_800x.png?v=1779104131',
  clooney:'/cdn/shop/articles/Crazy_Mountain_Thumbnail_f6c5e567-662a-4983-834c-e419b36884da_800x.png?v=1778499449',
  csuite:'/cdn/shop/articles/What_Your_C-Suite_fb46df2e-7b6f-484d-9780-7fd90b905244_800x.png?v=1777914870',
  costline:'/cdn/shop/articles/CS_Profit_Center_bd8e38a4-b94e-4246-8048-83f9842fdfcc_800x.png?v=1777483325',
  whatnot8:'/cdn/shop/articles/Whatnot_Part_08_a29a6b8e-82e1-461e-a903-764c3e9ba21a_800x.png?v=1776958271',
  ltv:'/cdn/shop/articles/Winning_With_Shopify_The_LTV_800x.png?v=1777640705',
  machine:'/cdn/shop/articles/Build_the_Machine_800x.png?v=1774439790',
  teardown:'/cdn/shop/articles/Sales_Teardowns_800x.png?v=1774018967',
  strongaudit:'/cdn/shop/articles/Audit_003_800x.png?v=1772460393',
  audittricks:'/cdn/shop/articles/Audit_002_800x.png?v=1773064412',
  cac:'/cdn/shop/articles/How_to_Scale_a_Business_Podcast_80b55b75-8a33-421c-aebc-beb3abf81f93_800x.png?v=1776699938',
  liveshop:'/cdn/shop/articles/Winning_With_Shopify_Live_Shopping_8e1b2cdb-d016-4888-82b9-f89df7cf8487_800x.png?v=1775475505',
  membership:'/cdn/shop/articles/The_Watson_Weekly_800x.png?v=1772109094',
  whatnotpod:'/cdn/shop/articles/Millionaire_University_800x.png?v=1771258656',
  battlbox:'/cdn/shop/articles/The_Retention_Edge_800x.png?v=1770734388',
  futurelive:'/cdn/shop/articles/Firing_the_Man_Podcast_800x.png?v=1762521480',
  ep271:'/cdn/shop/articles/Why_BattlBox_s_AOV_800x.png?v=1762258926',
  noads:'/cdn/shop/articles/Ecoffee_with_Experts_800x.png?v=1749565346',
  ep81:'/cdn/shop/articles/ASOM_80_800x.png?v=1769167490',
  ep79:'/cdn/shop/articles/ASOM_79_800x.png?v=1767896575',
  ep78:'/cdn/shop/articles/ASOM_78_800x.png?v=1767359456',
  ep77:'/cdn/shop/articles/ASOM_77_800x.png?v=1766150081',
  ep75:'/cdn/shop/articles/ASOM_75_800x.png?v=1764863245',
  cardsjun8:'/cdn/shop/articles/Top_5_Week_of_June_8th_2026_1185b299-c205-4083-b468-9bff79e31047_800x.png?v=1781527777',
  cardsjun1:'/cdn/shop/articles/Top_5_Week_of_June_1st_2026_800x.png?v=1780927401',
  wemby:'/cdn/shop/articles/Wembanyama_2023_Panini_Prizm_Black_Thumbnail_800x.png?v=1780404540',
  cardsmay25:'/cdn/shop/articles/Top_5_Week_of_May_25th_2026_800x.png?v=1780335623',
  cardsmay18:'/cdn/shop/articles/Top_5_Week_of_May_18th_2026_800x.png?v=1779715479',
  cardsmay11:'/cdn/shop/articles/Top_5_Week_of_May_11th_2026_800x.png?v=1779108744',
  ivens:'/cdn/shop/articles/The_Ivens_Lisbon_800x.png?v=1768397426',
  chatgpt:'/cdn/shop/articles/ChatGPT_App_in_Portugal_800x.png?v=1768396068',
  viator:'/cdn/shop/articles/Viator_Sintra_Thumbnail_800x.png?v=1767894938',
  pizza:'/cdn/shop/articles/Modern_Apizza_800x.png?v=1755784300'
};

posts.forEach(function (p) {
  if (IMG[p.id]) { p.img = SITE + IMG[p.id]; }
  // Article slug = last segment of the real onlinequeso URL.
  p.slug = p.url.split('/').filter(Boolean).pop();
});

// Output / link path for a post: /blogs/<category-path>/<slug>.html
function postPath(p) { return '/blogs/' + catMeta[p.cat].path + '/' + p.slug + '.html'; }
// Output / link path for a category index: /blogs/<category-path>/
function catPath(slug) { return '/blogs/' + catMeta[slug].path + '/'; }

module.exports = { SITE: SITE, catMeta: catMeta, posts: posts, IMG: IMG, postPath: postPath, catPath: catPath };
