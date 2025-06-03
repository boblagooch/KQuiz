import React, { useState } from 'react';
import { 
  Shuffle, 
  Wine, 
  Coffee, 
  Beer, 
  Droplets, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Target, 
  Star, 
  ChevronLeft, 
  CheckCircle, 
  XCircle, 
  Sparkles 
} from 'lucide-react';

const KachkaQuizGame = () => {
  const [gameState, setGameState] = useState('splash');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('mixed');
  const [questionCount, setQuestionCount] = useState(20);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questionBank = {
    vodka: [
      // CIROC Questions
      {
        question: "What makes Ciroc vodka uniquely sweet compared to other vodkas?",
        options: ["It's made from snap-frost grapes", "It's triple filtered through diamonds", "It's aged in sugar barrels", "It contains added honey"],
        correct: 0,
        explanation: "Ciroc is made from snap-frost grapes (Mauzac Blanc and Ugni Blanc), which have higher sugar content, accounting for its sweeter flavor profile.",
        difficulty: "easy"
      },
      {
        question: "How many times is Ciroc vodka distilled?",
        options: ["3 times", "4 times", "5 times", "6 times"],
        correct: 2,
        explanation: "Ciroc is distilled five times - four times in column stills, then a fifth time in traditional copper pot stills similar to cognac production.",
        difficulty: "medium"
      },
      {
        question: "Where is Ciroc vodka produced?",
        options: ["Champagne region, France", "Cognac region, France", "Bordeaux region, France", "Loire Valley, France"],
        correct: 1,
        explanation: "Ciroc is distilled at the historic Distillerie de Chevanceaux in the Cognac region of France, using traditional wine-making expertise.",
        difficulty: "medium"
      },

      // FÉTE Questions  
      {
        question: "What unique base ingredient does Féte vodka use?",
        options: ["Wheat", "Potato", "Sugar cane", "Corn"],
        correct: 2,
        explanation: "Féte vodka from Eugene, Oregon is made from sugar cane and distilled 3 times, with lava rock water filtration.",
        difficulty: "medium"
      },
      {
        question: "What distinctive feature does Féte vodka contain?",
        options: ["Silver flakes", "24K gold flakes", "Platinum particles", "Diamond dust"],
        correct: 1,
        explanation: "Féte vodka contains 24K gold flakes, making it a visually striking premium spirit from Oregon.",
        difficulty: "easy"
      },
      {
        question: "What type of water filtration does Féte vodka use?",
        options: ["Glacier water", "Spring water", "Lava rock water", "Distilled water"],
        correct: 2,
        explanation: "Féte vodka from Eugene, Oregon uses lava rock water filtration, giving it a distinctive clean character.",
        difficulty: "hard"
      },

      // NEMIROFF Questions
      {
        question: "How many times is Nemiroff vodka distilled?",
        options: ["3 times", "5 times", "7 times", "9 times"],
        correct: 2,
        explanation: "Nemiroff from Ukraine is distilled 7 times and uses an 11-stage filtration process with silver and platinum.",
        difficulty: "medium"
      },
      {
        question: "What metals are used in Nemiroff's filtration process?",
        options: ["Gold and silver", "Silver and platinum", "Platinum and gold", "Copper and silver"],
        correct: 1,
        explanation: "Nemiroff uses an 11-stage filtration process with silver and platinum, contributing to its exceptional purity.",
        difficulty: "hard"
      },
      {
        question: "Where is Nemiroff vodka from?",
        options: ["Russia", "Poland", "Ukraine", "Belarus"],
        correct: 2,
        explanation: "Nemiroff is a premium Ukrainian vodka brand, known for its meticulous distillation and filtration process.",
        difficulty: "easy"
      },

      // MINKE Questions
      {
        question: "What unusual base does Irish Minke vodka use?",
        options: ["Potato", "Wheat", "Whey (dairy)", "Barley"],
        correct: 2,
        explanation: "Minke vodka from Ireland is uniquely made from whey (dairy byproduct), distilled 5 times for a creamy, ocean-inspired character.",
        difficulty: "hard"
      },
      {
        question: "How many times is Minke vodka distilled?",
        options: ["3 times", "4 times", "5 times", "6 times"],
        correct: 2,
        explanation: "Minke vodka is distilled 5 times from whey, creating its signature creamy texture and smooth finish.",
        difficulty: "medium"
      },
      {
        question: "What flavor profile does Minke vodka's whey base contribute?",
        options: ["Spicy and bold", "Creamy and smooth", "Citrusy and bright", "Earthy and mineral"],
        correct: 1,
        explanation: "The whey base gives Minke vodka a distinctive creamy, ocean-inspired character that sets it apart from grain-based vodkas.",
        difficulty: "medium"
      },

      // BELUGA Questions
      {
        question: "What unique filtration material does Beluga Noble use?",
        options: ["Diamond dust", "Quartz sand", "Volcanic rock", "Charcoal only"],
        correct: 1,
        explanation: "Beluga Noble undergoes dual filtration through quartz sand, followed by triple filtration through silver-enriched charcoal.",
        difficulty: "medium"
      },
      {
        question: "How long does Beluga Noble rest after distillation?",
        options: ["15 days", "30 days", "45 days", "60 days"],
        correct: 1,
        explanation: "Beluga Noble vodka is extensively rested for 30 days, giving it time to mature and acquire its balanced flavor and aroma.",
        difficulty: "hard"
      },
      {
        question: "What base grain is Beluga Noble made from?",
        options: ["Rye", "Wheat", "Corn", "Barley malt"],
        correct: 3,
        explanation: "Beluga Noble is uniquely crafted with barley malt spirit, delicately infused with honey, oat extracts, and milk thistle.",
        difficulty: "medium"
      },

      // REYKA Questions
      {
        question: "What type of water does Reyka vodka use?",
        options: ["Spring water", "Glacier water", "Artesian water", "Volcanic spring water"],
        correct: 3,
        explanation: "Reyka vodka from Iceland uses pure volcanic spring water, contributing to its clean, crisp character.",
        difficulty: "medium"
      },
      {
        question: "What unique filtration does Reyka use?",
        options: ["Charcoal filtration", "Volcanic rock filtration", "Sand filtration", "Crystal filtration"],
        correct: 1,
        explanation: "Reyka is filtered through volcanic rock, which removes impurities while maintaining the vodka's character.",
        difficulty: "medium"
      },

      // HAKU Questions
      {
        question: "What base ingredient is Haku vodka made from?",
        options: ["Rice", "Wheat", "Potato", "Barley"],
        correct: 0,
        explanation: "Haku is a Japanese vodka made from 100% Japanese white rice, giving it a soft, clean, and subtly sweet profile.",
        difficulty: "medium"
      },
      {
        question: "What does 'Haku' mean in Japanese?",
        options: ["Pure", "White", "Clear", "Clean"],
        correct: 1,
        explanation: "Haku means 'white' in Japanese, referring to the pure white rice used in its production and the pristine character of the vodka.",
        difficulty: "hard"
      },

      // PURITY Questions
      {
        question: "How many times is Purity vodka distilled?",
        options: ["17 times", "24 times", "34 times", "51 times"],
        correct: 2,
        explanation: "Purity vodka from Sweden is distilled an exceptional 34 times, making it one of the most distilled vodkas in the world.",
        difficulty: "hard"
      },
      {
        question: "What type of ingredients does Purity vodka use?",
        options: ["Conventional grain", "Organic winter wheat", "Potato", "Spring wheat"],
        correct: 1,
        explanation: "Purity is made from organic winter wheat and uses sustainable production methods, reflecting Swedish environmental values.",
        difficulty: "medium"
      },

      // ABSOLUT ELYX Questions
      {
        question: "What makes Absolut Elyx unique among vodkas?",
        options: ["Made from single estate wheat", "Uses vintage copper still from 1921", "Called 'liquid silk'", "All of the above"],
        correct: 3,
        explanation: "Absolut Elyx is made from single estate winter wheat, distilled in a vintage copper still from 1921, and known as 'liquid silk' for its smooth texture.",
        difficulty: "medium"
      },
      {
        question: "The Råbelöf estate has been cultivating wheat since which century?",
        options: ["13th century", "14th century", "15th century", "16th century"],
        correct: 2,
        explanation: "The Råbelöf estate in southern Sweden has been cultivating winter wheat since the 1400s (15th century), providing ideal grain for Elyx.",
        difficulty: "hard"
      },
      {
        question: "What special material is used in Absolut Elyx's distillation process?",
        options: ["Gold packets", "Silver filters", "Sacrificial copper packets", "Diamond dust"],
        correct: 2,
        explanation: "Thousands of sacrificial copper packets are used to remove unwanted compounds, contributing to Elyx's rich final product.",
        difficulty: "medium"
      },
      {
        question: "How is Absolut Elyx's vintage still operated?",
        options: ["Computer controlled", "Entirely by hand", "Semi-automated", "Voice activated"],
        correct: 1,
        explanation: "The vintage copper still from 1921 is operated entirely by hand using traditional skills, relying on human intuition and feel.",
        difficulty: "medium"
      },

      // DOUBLE CROSS Questions
      {
        question: "How many times is Double Cross vodka distilled and filtered?",
        options: ["5 times each", "6 times each", "7 times each", "8 times each"],
        correct: 2,
        explanation: "Double Cross is both distilled 7 times and filtered 7 times, creating exceptional smoothness and purity.",
        difficulty: "medium"
      },
      {
        question: "What unique filtration material does Double Cross use?",
        options: ["Quartz crystal", "Diamond dust", "Volcanic rock", "Silver mesh"],
        correct: 1,
        explanation: "Double Cross uses diamond dust micro-filters along with activated charcoal and limestone for unprecedented filtration capability.",
        difficulty: "medium"
      },
      {
        question: "What water source does Double Cross vodka use?",
        options: ["Glacier water", "Spring water", "Tatra Mountain spring water from 200-ft aquifers", "Artesian well water"],
        correct: 2,
        explanation: "Double Cross uses Tatra Mountain spring water sourced from 200-foot deep aquifers in Slovakia's heart.",
        difficulty: "hard"
      },
      {
        question: "Double Cross bottles feature what cultural element?",
        options: ["Czech poetry", "300-year-old Slovakian poetry", "Musical notes", "Mountain imagery"],
        correct: 1,
        explanation: "Double Cross bottles feature text from a 300-year-old Slovakian poem etched into the glass, emphasizing its cultural heritage.",
        difficulty: "hard"
      },

      // POLUGAR Questions
      {
        question: "What was Polugar originally called in Russian history?",
        options: ["Little water", "Bread wine", "Grain spirit", "Russian fire"],
        correct: 1,
        explanation: "Polugar was called 'bread wine' and was the original Russian spirit before modern vodka was invented in the 1870s.",
        difficulty: "medium"
      },
      {
        question: "In what year was Polugar production banned in Russia?",
        options: ["1870", "1885", "1895", "1905"],
        correct: 2,
        explanation: "In 1895, Tsar Alexander III introduced a state monopoly and completely banned Polugar production, destroying all traditional copper pot stills.",
        difficulty: "hard"
      },
      {
        question: "What unique clarification method does Polugar use?",
        options: ["Charcoal filtration", "Fresh egg white and birch coal", "Diamond filtration", "Silver filtration"],
        correct: 1,
        explanation: "Polugar is clarified using fresh egg white and birch coal, a traditional method used by Russian nobility from the 17th-19th centuries.",
        difficulty: "hard"
      },
      {
        question: "How many times is Polugar distilled in copper pot stills?",
        options: ["2 times", "3 times", "4 times", "5 times"],
        correct: 1,
        explanation: "Polugar is triple distilled in copper pot stills reconstructed from 18th-century drawings, preserving traditional methods.",
        difficulty: "medium"
      },
      {
        question: "What does 'Polugar' literally mean in Russian?",
        options: ["Pure grain", "Half burned", "Noble spirit", "Bread essence"],
        correct: 1,
        explanation: "'Polu' means 'half' and 'gar' means 'combustion' - referring to the old method of testing alcohol strength by burning half the liquid.",
        difficulty: "hard"
      }
    ],

    wine: [
      // GEORGIAN WINES
      {
        question: "What traditional winemaking vessel gives Georgian wines their distinctive character?",
        options: ["Oak barrels", "Steel tanks", "Qvevri (clay amphora)", "Stone vats"],
        correct: 2,
        explanation: "Qvevri are large clay amphoras buried underground, used for fermentation and aging. This UNESCO-recognized method dates back 8,000 years.",
        difficulty: "medium"
      },
      {
        question: "How long do grapes typically ferment in qvevri for white wines?",
        options: ["2-4 weeks", "2-3 months", "5-6 months", "1 year"],
        correct: 2,
        explanation: "In traditional Georgian winemaking, white grapes ferment with skins in qvevri for 5-6 months, creating the distinctive amber color.",
        difficulty: "hard"
      },
      {
        question: "What is the difference between Kakhetian and Imeretian winemaking methods?",
        options: ["Temperature control", "Grape varieties used", "Amount of skins and stems used", "Fermentation vessels"],
        correct: 2,
        explanation: "Kakhetian method uses 100% of grape skins and stems, while Imeretian uses only about 10% of skins and no stems, creating lighter wines.",
        difficulty: "hard"
      },

      // SPECIFIC WINES ON MENU
      {
        question: "Georgian Sun Rkatsiteli-Mtsvane uses which winemaking technique?",
        options: ["Skin contact in stainless steel", "Traditional qvevri only", "Oak barrel aging", "Carbonic maceration"],
        correct: 0,
        explanation: "Georgian Sun uses skin contact fermentation in stainless steel, creating amber tones with stonefruit and earthy characteristics.",
        difficulty: "medium"
      },
      {
        question: "What grape varieties are in Iberieli 'Golden Blend'?",
        options: ["Rkatsiteli and Mtsvane only", "Saperavi and Kisi", "Rkatsiteli, Mtsvane, Kisi, and Khikhvi", "Chinuri and Goruli Mtsvane"],
        correct: 2,
        explanation: "Georgian Golden Blend combines Georgia's four most cherished white varietals in equal proportion: Rkatsiteli, Mtsvane, Kisi, and Khikhvi.",
        difficulty: "hard"
      },
      {
        question: "ASAP Riesling from Slovakia uses what unique technique?",
        options: ["Carbonic maceration", "3-day skin contact", "Malolactic fermentation", "Cold fermentation"],
        correct: 1,
        explanation: "ASAP Riesling uses 3-day skin contact and lees-aging, creating bergamot, quince, and honey notes with a smoky character.",
        difficulty: "medium"
      },

      // AUSTRIAN WINES
      {
        question: "What grape variety is Kogl Grauburgunder made from?",
        options: ["Pinot Grigio", "Pinot Gris", "Riesling", "Chardonnay"],
        correct: 1,
        explanation: "Kogl Grauburgunder is made from Pinot Gris grapes and is oak-aged using biodynamic methods.",
        difficulty: "easy"
      },
      {
        question: "Which farming method does Kogl Grauburgunder use?",
        options: ["Conventional", "Organic", "Biodynamic", "Sustainable"],
        correct: 2,
        explanation: "Kogl Grauburgunder is produced using biodynamic farming methods, going beyond organic to follow lunar cycles and natural preparations.",
        difficulty: "medium"
      },
      {
        question: "What does 'Bambule' mean in relation to Judith Beck's Furmint?",
        options: ["To celebrate", "To cause a ruckus", "To ferment naturally", "To age gracefully"],
        correct: 1,
        explanation: "'Bambule' means to cause a ruckus - this wine is so good you just might! It's a textured, saline Furmint with walnut and thyme notes.",
        difficulty: "hard"
      },

      // SLOVENIAN WINES
      {
        question: "What makes Harkamp 'Sardines' wine distinctive?",
        options: ["Fishy aroma", "Salty, mineral character", "Aged in the sea", "Made near the ocean"],
        correct: 1,
        explanation: "Harkamp Sardines is a blend of Pinot Gris and Pinot Blanc with distinctive salty and mineral notes, reminiscent of oyster liquor.",
        difficulty: "medium"
      },
      {
        question: "Slobodné Vinárstov 'Vronski' is known for what characteristic?",
        options: ["High alcohol", "Skin contact complexity", "Botrytis character", "High acidity"],
        correct: 1,
        explanation: "Vronski features loads of herbs and stone fruit with a firmly textured palate from skin-contact fermentation of Sauvignon Blanc.",
        difficulty: "medium"
      }
    ],

    flights: [
      {
        question: "The 'Northern Neighbors' flight features vodkas from which countries?",
        options: ["Finland, Sweden, Iceland", "Norway, Sweden, Denmark", "Russia, Poland, Lithuania", "Canada, Alaska, Greenland"],
        correct: 0,
        explanation: "Northern Neighbors includes Koskenkorva (Finland), Purity (Sweden), and Reyka (Iceland) - showcasing Nordic vodka traditions.",
        difficulty: "easy"
      },
      {
        question: "What inspired the name 'Shinkansen' for the Japanese vodka flight?",
        options: ["Mount Fuji", "Japan's bullet train", "Cherry blossoms", "Samurai swords"],
        correct: 1,
        explanation: "Shinkansen is named after Japan's famous bullet train, featuring Japanese vodkas Kissui, Haku, and Tenjaku.",
        difficulty: "medium"
      },
      {
        question: "Which flight showcases local Oregon distilleries?",
        options: ["Northern Neighbors", "Made In Oregon", "French Connection", "Shinkansen"],
        correct: 1,
        explanation: "Made In Oregon features local producers: Timberline, Fete, and Aimsir Astrid, celebrating Oregon's craft distilling scene.",
        difficulty: "easy"
      },
      {
        question: "What does the Russian saying 'Bog troitsu lyubit' mean in relation to flights?",
        options: ["God loves vodka", "Three is lucky", "God loves a trinity", "Drink in threes"],
        correct: 2,
        explanation: "'God loves a trinity' - the inspiration for Kachka's flights of three 30ml pours to sip, shoot, ponder, compare, and enjoy.",
        difficulty: "hard"
      },
      {
        question: "Which flight represents premium French vodka craftsmanship?",
        options: ["Northern Neighbors", "Made In Oregon", "French Connection", "Shinkansen"],
        correct: 2,
        explanation: "French Connection showcases Bomond, Ciroc, and Jean Marc XO - representing different styles of French vodka excellence.",
        difficulty: "medium"
      },
      {
        question: "What makes the 'Made In Oregon' flight special for locals?",
        options: ["Lowest price point", "Uses local water sources", "Showcases Oregon terroir", "All of the above"],
        correct: 3,
        explanation: "The Oregon flight features Timberline, Fete, and Aimsir Astrid - all using local ingredients and water sources, representing Oregon's terroir.",
        difficulty: "medium"
      }
    ],

    infusions: [
      {
        question: "Which Kachka house infusion is bottled and sold at retail stores?",
        options: ["Horseradish", "Sour Cherry", "Birch", "Tarragon"],
        correct: 0,
        explanation: "Kachka's Horseradish Vodka is bottled and available at retail liquor stores throughout the West Coast.",
        difficulty: "easy"
      },
      {
        question: "What base vodka does Kachka use for most house infusions?",
        options: ["Tito's", "Taaka", "Svedka", "Absolut"],
        correct: 1,
        explanation: "Kachka uses Taaka vodka as the base for house infusions like Zubrovka, Rhubarb, Pertsovka, and Tarragon.",
        difficulty: "medium"
      },
      {
        question: "How long does the Rhubarb vodka infusion process take?",
        options: ["1 day", "2 days", "5 days", "1 week"],
        correct: 2,
        explanation: "Rhubarb vodka is infused for 5 days with simple syrup added to balance the tart rhubarb flavor.",
        difficulty: "medium"
      },
      {
        question: "Which house infusion is described as 'bold, herbal, and unsweetened'?",
        options: ["Zubrovka", "Tarragon", "Pertsovka", "Earl Grey"],
        correct: 1,
        explanation: "Tarragon vodka is infused for just 1 day and remains unsweetened, creating a bold herbal profile.",
        difficulty: "medium"
      },
      {
        question: "What traditional Polish grass is used in Zubrovka infusion?",
        options: ["Sweet grass", "Bison grass", "Prairie grass", "Rye grass"],
        correct: 1,
        explanation: "Zubrovka is infused with bison grass (Hierochloe odorata), a traditional Polish flavoring that gives a sweet, vanilla-like aroma.",
        difficulty: "hard"
      },
      {
        question: "What spice blend is featured in Kachka's Pertsovka infusion?",
        options: ["Black pepper only", "Hot peppers and honey", "Mixed peppercorns", "Chili and herbs"],
        correct: 1,
        explanation: "Pertsovka is a traditional Russian infusion featuring hot peppers balanced with honey for a spicy-sweet profile.",
        difficulty: "medium"
      },
      {
        question: "What tea variety is used in Kachka's Earl Grey infusion?",
        options: ["Ceylon Earl Grey", "English Breakfast", "Earl Grey with bergamot", "Lady Grey"],
        correct: 2,
        explanation: "The Earl Grey infusion uses classic Earl Grey tea with bergamot oil, creating a citrusy, floral vodka perfect for tea lovers.",
        difficulty: "medium"
      },
      {
        question: "What part of the birch tree is used in the Birch infusion?",
        options: ["Bark", "Leaves", "Sap", "Twigs"],
        correct: 0,
        explanation: "Birch infusion uses bark from birch trees, creating an earthy, slightly sweet flavor reminiscent of wintergreen.",
        difficulty: "hard"
      }
    ],

    beer: [
      {
        question: "What style of beer is Rosenstadt?",
        options: ["Helles Lager", "IPA", "Wheat Beer", "Stout"],
        correct: 0,
        explanation: "Rosenstadt is a Helles lager - a traditional German-style light, crisp beer perfect for pairing with Eastern European cuisine.",
        difficulty: "easy"
      },
      {
        question: "Gyumri is known as what in Armenia?",
        options: ["The champagne of beers", "The king of lagers", "The golden brew", "The mountain beer"],
        correct: 0,
        explanation: "Gyumri is known as 'the champagne of beers' in Armenia, representing premium Armenian brewing tradition.",
        difficulty: "medium"
      },
      {
        question: "What does the name 'Rosenstadt' translate to in English?",
        options: ["Rose garden", "City of roses", "Rose castle", "Rose valley"],
        correct: 1,
        explanation: "Rosenstadt translates to 'City of Roses' in German, a fitting name for a beer served in Portland, the City of Roses.",
        difficulty: "hard"
      },
      {
        question: "When was the Gyumri-Garejour brewery established?",
        options: ["1898", "1952", "1970", "1974"],
        correct: 2,
        explanation: "The Gyumri-Garejour company was established in 1970, making it one of Armenia's largest beer producers and the second largest brewery in Armenia.",
        difficulty: "medium"
      },
      {
        question: "What gives Gyumri beer its unique taste according to the brewery?",
        options: ["Special hops variety", "Local Gyumri water", "Extended fermentation", "Mountain air"],
        correct: 1,
        explanation: "The local water in Gyumri significantly contributes to the unique taste due to its optimal chemical composition for brewing.",
        difficulty: "medium"
      },
      {
        question: "What international standard does Gyumri brewery follow?",
        options: ["ISO 9001:2008", "ISO 22000-2018", "ISO 14001", "ISO 45001"],
        correct: 1,
        explanation: "Gyumri brewery conforms to the international standard ISO 22000-2018 for Quality Management Systems, ensuring pure beer without additives.",
        difficulty: "hard"
      },
      {
        question: "What natural disaster affected the Gyumri brewery in 1988?",
        options: ["Flood", "Fire", "Earthquake", "Volcanic eruption"],
        correct: 2,
        explanation: "A destructive earthquake in 1988 nearly razed the brewery, but reconstruction efforts commenced post-privatization in 1995.",
        difficulty: "hard"
      },
      {
        question: "The original Gyumri brewery tradition dates back to which year?",
        options: ["1898", "1905", "1915", "1920"],
        correct: 0,
        explanation: "The old brewery of Gyumri dates back to 1898, though the current Gyumri-Garejour company was established in 1970.",
        difficulty: "hard"
      }
    ],

    na: [
      {
        question: "What is 'Rassol' and why is it considered nature's hangover cure?",
        options: ["Pickle brine with electrolytes", "Herbal tea", "Fruit juice", "Mineral water"],
        correct: 0,
        explanation: "Rassol is pickle brine, rich in electrolytes and traditionally used in Eastern Europe as a hangover remedy.",
        difficulty: "easy"
      },
      {
        question: "What are the main ingredients in Yellow Barrel Kvass?",
        options: ["Cabbage, salt, vinegar", "Rye bread, yeast, sugar", "Beets, carrots, herbs", "Barley, hops, water"],
        correct: 1,
        explanation: "Yellow Barrel Kvass is made from rye bread, yeast, and sugar, following traditional Eastern European bread fermentation methods.",
        difficulty: "medium"
      },
      {
        question: "Which flavors are most prominent in Becherovka?",
        options: ["Mint and eucalyptus", "Clove, cinnamon, orange", "Vanilla and caramel", "Citrus and honey"],
        correct: 1,
        explanation: "Becherovka has a distinctive bittersweet profile with prominent clove, cinnamon, and orange flavors from its secret herb blend.",
        difficulty: "easy"
      },
      {
        question: "What is kvass traditionally made from?",
        options: ["Fermented vegetables", "Fermented bread", "Fermented fruit", "Fermented grains"],
        correct: 1,
        explanation: "Kvass is a traditional Slavic fermented beverage made from bread, typically rye bread, creating a mildly alcoholic, refreshing drink.",
        difficulty: "medium"
      },
      {
        question: "Tkemali lemonade is made from what type of fruit?",
        options: ["Regular lemons", "Sour plums", "Sour cherries", "Green apples"],
        correct: 1,
        explanation: "Tkemali lemonade is made from Georgian sour plums (tkemali), creating a tart, refreshing beverage popular in Georgian cuisine.",
        difficulty: "medium"
      },
      {
        question: "What gives Tarjun its distinctive flavor?",
        options: ["Mint", "Tarragon", "Dill", "Fennel"],
        correct: 1,
        explanation: "Tarjun is Kachka's house-made sour tarragon soda, featuring the distinctive anise-like flavor of fresh tarragon.",
        difficulty: "medium"
      },
      {
        question: "What makes Borjomi water special?",
        options: ["It's artesian water", "It's volcanic mineral water", "It's glacier water", "It's spring water"],
        correct: 1,
        explanation: "Borjomi is a naturally carbonated volcanic mineral water from Georgia, known for its unique mineral content and therapeutic properties.",
        difficulty: "hard"
      },
      {
        question: "What alcohol content does traditional kvass have?",
        options: ["0% (no alcohol)", "0.5-1% ABV", "2-3% ABV", "5-6% ABV"],
        correct: 1,
        explanation: "Traditional kvass has very low alcohol content (0.5-1% ABV) from natural fermentation, making it suitable as a daily beverage.",
        difficulty: "hard"
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'Shuffle All', icon: Shuffle, color: 'bg-purple-700' },
    { id: 'vodka', name: 'Vodka', icon: Droplets, color: 'bg-blue-700' },
    { id: 'wine', name: 'Wine', icon: Wine, color: 'bg-red-700' },
    { id: 'flights', name: 'Flights', icon: Target, color: 'bg-green-700' },
    { id: 'infusions', name: 'Infusions', icon: Coffee, color: 'bg-orange-700' },
    { id: 'beer', name: 'Beer', icon: Beer, color: 'bg-amber-700' },
    { id: 'na', name: 'Non-Alcoholic', icon: Star, color: 'bg-teal-700' }
  ];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = (categoryId) => {
    setSelectedCategory(categoryId);
    let selectedQuestions = [];
    
    if (categoryId === 'all') {
      Object.values(questionBank).forEach(categoryQuestions => {
        selectedQuestions = [...selectedQuestions, ...categoryQuestions];
      });
    } else {
      selectedQuestions = [...(questionBank[categoryId] || [])];
    }
    
    if (selectedDifficulty !== 'mixed') {
      selectedQuestions = selectedQuestions.filter(q => q.difficulty === selectedDifficulty);
    }
    
    selectedQuestions = shuffleArray(selectedQuestions).slice(0, questionCount);
    
    setQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setWrongAnswers([]);
    setGameState('playing');
  };

  const selectAnswer = (answerIndex) => {
    if (showResult) return;

    const question = questions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    const answerRecord = {
      question: question.question,
      selectedAnswer: answerIndex,
      correctAnswer: question.correct,
      isCorrect,
      explanation: question.explanation,
      options: question.options
    };
    
    setAnswers([...answers, answerRecord]);
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setWrongAnswers([...wrongAnswers, answerRecord]);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      setShowResult(false);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameState('complete');
      }
    }, 2500);
  };

  const resetGame = () => {
    setGameState('splash');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setQuestions([]);
    setWrongAnswers([]);
    setShowResult(false);
  };

  const getScoreMessage = () => {
    const percentage = Math.round((score / questions.length) * 100);
    if (percentage >= 90) return { 
      title: "Vodka Sommelier! 🏆", 
      message: "You know Kachka's menu like the back of your hand! Slava would be proud.", 
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200"
    };
    if (percentage >= 80) return { 
      title: "Menu Master! 🌟", 
      message: "Excellent knowledge! You're ready to guide any guest through our offerings.", 
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200"
    };
    if (percentage >= 70) return { 
      title: "Getting There! 📚", 
      message: "Good foundation! A few more tastings and you'll be an expert.", 
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200"
    };
    if (percentage >= 60) return { 
      title: "Keep Learning! 💪", 
      message: "Not bad! Time to dive deeper into our incredible beverage program.", 
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200"
    };
    return { 
      title: "Study Time! 📖", 
      message: "No worries - even babushka had to learn recipes! Review and try again.", 
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200"
    };
  };

  if (gameState === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-slate-100 rounded-3xl shadow-2xl p-8 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-slate-300">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full mx-auto mb-6 flex items-center justify-center transform rotate-12 shadow-lg relative border-2 border-amber-400">
                <Wine className="w-12 h-12 text-white" />
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold text-slate-800 mb-3 tracking-tight">Kachka</h1>
              <h2 className="text-xl text-slate-600 font-medium">Menu Knowledge Quiz</h2>
            </div>
            
            <p className="text-slate-500 mb-8 leading-relaxed">
              Test your knowledge of our incredible beverage program! From vodkas to wines, flights to infusions.
            </p>
            
            <button 
              onClick={() => setGameState('category')}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-amber-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 group border border-amber-500"
            >
              Start Quiz 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-8 text-sm text-slate-400 font-medium">
              За здоровье! (To your health!)
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'category') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-100 rounded-3xl shadow-2xl p-6 border border-slate-300">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setGameState('splash')}
                className="p-3 hover:bg-slate-200 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <h2 className="text-xl font-bold text-slate-800">Game Settings</h2>
              <div className="w-11"></div>
            </div>
            
            <div className="mb-8 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Difficulty Level</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-3 rounded-xl text-sm font-medium bg-slate-50 border-2 border-slate-200 text-slate-700 focus:border-amber-500 focus:outline-none transition-all duration-200"
                >
                  <option value="mixed">Mixed Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Questions</label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full p-3 rounded-xl text-sm font-medium bg-slate-50 border-2 border-slate-200 text-slate-700 focus:border-amber-500 focus:outline-none transition-all duration-200"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={20}>20 Questions</option>
                  <option value={30}>30 Questions</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Choose Category</h3>
              <div className="space-y-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const totalQuestions = category.id === 'all' 
                    ? Object.values(questionBank).flat().length
                    : questionBank[category.id]?.length || 0;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => startGame(category.id)}
                      className="w-full p-4 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-4 group border border-slate-200"
                    >
                      <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-opacity-30 border-white`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-slate-800 text-lg">{category.name}</h3>
                        <p className="text-sm text-slate-500 font-medium">{totalQuestions} questions</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-100 rounded-3xl shadow-2xl overflow-hidden border border-slate-300">
            <div className="h-2 bg-slate-300">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-orange-700 transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={() => setGameState('category')}
                  className="p-3 hover:bg-slate-200 rounded-full transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <div className="text-center">
                  <div className="text-sm text-slate-500 font-medium">Question {currentQuestion + 1} of {questions.length}</div>
                  <div className="text-sm font-bold text-slate-700">Score: {score}/{currentQuestion}</div>
                </div>
                <div className="w-11"></div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 leading-relaxed">
                  {question.question}
                </h3>
              </div>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-2xl transition-all duration-300 transform hover:scale-105 border ${
                      showResult
                        ? index === question.correct
                          ? 'bg-emerald-100 border-2 border-emerald-400 text-emerald-800'
                          : answers[answers.length - 1]?.selectedAnswer === index
                          ? 'bg-rose-100 border-2 border-rose-400 text-rose-800'
                          : 'bg-slate-200 text-slate-600 border-slate-300'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-amber-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                        showResult && index === question.correct
                          ? 'bg-emerald-500 text-white'
                          : showResult && answers[answers.length - 1]?.selectedAnswer === index && index !== question.correct
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-400 text-white'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium">{option}</span>
                      {showResult && index === question.correct && (
                        <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto" />
                      )}
                      {showResult && answers[answers.length - 1]?.selectedAnswer === index && index !== question.correct && (
                        <XCircle className="w-5 h-5 text-rose-500 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-300">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>Did you know?</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'complete') {
    const scoreMessage = getScoreMessage();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-100 rounded-3xl shadow-2xl p-8 text-center border border-slate-300">
            <div className="mb-6">
              <Trophy className={`w-16 h-16 mx-auto mb-4 ${scoreMessage.color}`} />
              <h2 className={`text-2xl font-bold mb-2 ${scoreMessage.color}`}>
                {scoreMessage.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {scoreMessage.message}
              </p>
            </div>

            <div className={`${scoreMessage.bgColor} border rounded-2xl p-6 mb-6 border-opacity-50`}>
              <div className="text-3xl font-bold text-slate-800 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-lg font-semibold text-slate-600 mb-2">
                {percentage}% Correct
              </div>
              <div className="w-full bg-slate-300 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-amber-600 to-orange-700 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            {wrongAnswers.length > 0 && (
              <div className="mb-6">
                <button
                  onClick={() => setGameState('review')}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 border border-blue-600"
                >
                  Review Wrong Answers ({wrongAnswers.length})
                </button>
              </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-3 px-6 rounded-2xl font-semibold hover:from-amber-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border border-amber-500"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              
              <button 
                onClick={() => setGameState('category')}
                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 px-6 rounded-2xl font-semibold transition-all duration-300 border border-slate-300"
              >
                Choose Different Category
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'review') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-100 rounded-3xl shadow-2xl p-6 border border-slate-300">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setGameState('complete')}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <h2 className="text-xl font-bold text-slate-800">Review Wrong Answers</h2>
              <div className="w-9"></div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wrongAnswers.map((answer, index) => (
                <div key={index} className="bg-rose-50 border border-rose-300 rounded-2xl p-4">
                  <h3 className="font-semibold text-slate-800 mb-3 leading-relaxed">
                    {answer.question}
                  </h3>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span className="text-sm text-rose-700 font-medium">
                        Your answer: {answer.options[answer.selectedAnswer]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-emerald-700 font-medium">
                        Correct answer: {answer.options[answer.correctAnswer]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                    <p className="text-sm text-blue-800 leading-relaxed">
                      <strong>Explanation:</strong> {answer.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {wrongAnswers.length === 0 && (
              <div className="text-center py-8">
                <Trophy className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">Perfect Score!</h3>
                <p className="text-slate-600">You got every question right. Excellent work!</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200">
              <button
                onClick={() => setGameState('complete')}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 border border-slate-500"
              >
                Back to Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default KachkaQuizGame;