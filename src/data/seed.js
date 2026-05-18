export const PRODUCTS = [
    { id:'1', name:'Aqua Libre',    slug:'aqua-libre',    inspo:'Dior Sauvage',          family:'Fresh & Citrus',   category:"Men's",   intensity:60, top:['Bergamot','Sea Salt'],   heart:['Lavender','Pink Pepper'],  base:['Ambroxan','Cedar'],      description:'An electrifying rush of fresh bergamot over a woody, mineral base. Commanding yet effortless.', sizes:[{label:'5ml',price:380},{label:'30ml',price:2200},{label:'50ml',price:3300},{label:'100ml',price:5600}], featured:true,  bestseller:true,  inStock:true },
    { id:'2', name:'Noir Sillage',  slug:'noir-sillage',  inspo:'Baccarat Rouge 540',    family:'Oud & Amber',      category:'Unisex',  intensity:85, top:['Saffron','Jasmine'],    heart:['Amberwood','Ambergris'],   base:['Fir Resin','Cedar'],     description:'The jewel of eSibha. Radiant saffron opens into a warm amber heart that lasts well beyond 12 hours.', sizes:[{label:'5ml',price:450},{label:'30ml',price:2800},{label:'50ml',price:4200},{label:'100ml',price:7200}], featured:true,  bestseller:true,  inStock:true },
    { id:'3', name:'Rose Lumière',  slug:'rose-lumiere',  inspo:'YSL Mon Paris',         family:'Floral',           category:"Women's", intensity:55, top:['Pear','Raspberry'],     heart:['Rose','Peony'],            base:['White Musk','Patchouli'],description:'A Parisian romance — luminous rose over a sensual, earthy finish.', sizes:[{label:'5ml',price:380},{label:'30ml',price:2400},{label:'50ml',price:3600},{label:'100ml',price:6000}], featured:true,  bestseller:false, inStock:true },
    { id:'4', name:'Cedar Mystère', slug:'cedar-mystere', inspo:'Tom Ford Oud Wood',     family:'Woody & Oriental', category:"Men's",   intensity:80, top:['Oud','Cardamom'],       heart:['Sandalwood','Vetiver'],    base:['Amber','Musk'],          description:'Rare oud tempered with smoky cardamom, grounded in deeply resonant vetiver.', sizes:[{label:'5ml',price:520},{label:'30ml',price:3200},{label:'50ml',price:4800},{label:'100ml',price:8200}], featured:false, bestseller:true,  inStock:true },
    { id:'5', name:'Velvet Musc',   slug:'velvet-musc',   inspo:'Narciso Rodriguez Her', family:'Musk',             category:"Women's", intensity:50, top:['Bergamot','Pear'],      heart:['Musc','Osmanthus'],        base:['Vetiver','Cedarwood'],   description:'Skin-close and intimate — a second-skin musk that becomes entirely your own.', sizes:[{label:'5ml',price:400},{label:'30ml',price:2600},{label:'50ml',price:3800},{label:'100ml',price:6400}], featured:false, bestseller:false, inStock:true },
    { id:'6', name:'Ambra Dorata',  slug:'ambra-dorata',  inspo:'Tom Ford Black Orchid', family:'Oud & Amber',      category:'Unisex',  intensity:90, top:['Truffle','Bergamot'],   heart:['Black Orchid','Spice'],    base:['Patchouli','Sandalwood'],description:'The darkest jewel in the collection. Truffle and black orchid over rich patchouli.', sizes:[{label:'5ml',price:480},{label:'30ml',price:3000},{label:'50ml',price:4500},{label:'100ml',price:7600}], featured:false, bestseller:true,  inStock:true },
    { id:'7', name:'Bleu Céleste',  slug:'bleu-celeste',  inspo:'Bleu de Chanel',        family:'Fresh & Citrus',   category:"Men's",   intensity:65, top:['Citrus','Mint'],        heart:['Ginger','Nutmeg'],         base:['Labdanum','Vetiver'],    description:'Mediterranean clarity — citrus top notes evolving into warm, woody sophistication.', sizes:[{label:'5ml',price:400},{label:'30ml',price:2600},{label:'50ml',price:3800},{label:'100ml',price:6400}], featured:true,  bestseller:false, inStock:true },
    { id:'8', name:'Jardin Blanc',  slug:'jardin-blanc',  inspo:'Chloé Eau de Parfum',   family:'Floral',           category:"Women's", intensity:45, top:['Freesia','Litchi'],     heart:['Peony','Rose'],            base:['Oakmoss','Virginia Cedar'],description:'A white garden in morning light — dewy florals over a mossy, natural drydown.', sizes:[{label:'5ml',price:360},{label:'30ml',price:2200},{label:'50ml',price:3200},{label:'100ml',price:5600}], featured:false, bestseller:false, inStock:true },
  ];
  
  export const GIFT_PACKS = [
    { id:'g1', name:'The Discovery Set',   description:'5 × 5ml travel vials — curated by our perfumers.',  price:2200, contents:['Noir Sillage','Rose Lumière','Aqua Libre','Cedar Mystère','Velvet Musc'], inStock:true },
    { id:'g2', name:'The Signature Duo',   description:'2 × 30ml bottles of your choice, gift-boxed.',      price:5800, contents:['Any 2 × 30ml'],                                                          inStock:true },
    { id:'g3', name:'The Full Collection', description:'All 8 fragrances in 5ml vials.',                     price:3600, contents:['All 8 fragrances × 5ml'],                                               inStock:true },
  ];
  
  export const QUIZ_QUESTIONS = [
    { id:'q1', question:'What time of day do you wear fragrance most?', options:[{label:'Morning commute',value:'fresh'},{label:'Office hours',value:'woody'},{label:'Evening out',value:'oud'},{label:'All day, every day',value:'musk'}] },
    { id:'q2', question:'Which word describes your ideal scent?',        options:[{label:'Clean',value:'fresh'},{label:'Romantic',value:'floral'},{label:'Intense',value:'oud'},{label:'Subtle',value:'musk'}] },
    { id:'q3', question:'Where do you see yourself wearing it?',          options:[{label:'By the sea',value:'fresh'},{label:'In a garden',value:'floral'},{label:'In a dark lounge',value:'oud'},{label:'Wherever I go',value:'woody'}] },
    { id:'q4', question:'Your ideal intensity?',                          options:[{label:'Whisper-soft',value:'musk'},{label:'Noticeable',value:'fresh'},{label:'Memorable',value:'floral'},{label:'Unforgettable',value:'oud'}] },
  ];
  
  export const JOURNAL_POSTS = [
    { id:'j1', slug:'art-of-the-sillage',      title:'The Art of the Sillage',                 category:'Education',  date:'May 2024', excerpt:'What separates a fragrance that lingers in a room for hours from one that vanishes in minutes?' },
    { id:'j2', slug:'oud-black-gold',           title:'Oud: The Black Gold of Perfumery',       category:'Ingredients',date:'Apr 2024', excerpt:'Sourced from the Aquilaria tree, oud is the rarest raw material in the fragrance world.' },
    { id:'j3', slug:'how-to-layer-fragrances',  title:'How to Layer Fragrances',                category:'Guide',      date:'Mar 2024', excerpt:'The Japanese art of kōdō has much to teach about building a personal scent profile.' },
    { id:'j4', slug:'why-dupes-are-the-future', title:'Why Inspired Fragrances Are the Future', category:'Opinion',    date:'Feb 2024', excerpt:'The luxury fragrance industry is built on exclusivity. We believe in democratising it.' },
    { id:'j5', slug:'winter-scents-guide',      title:'Our Favourite Winter Scents',            category:'Seasonal',   date:'Jan 2024', excerpt:'As the temperature drops, the fragrances that feel most natural shift dramatically.' },
    { id:'j6', slug:'guide-to-scent-families',  title:'A Guide to Scent Families',              category:'Education',  date:'Dec 2023', excerpt:'From fresh citrus to dark orientals — understanding the fragrance wheel.' },
  ];
  
  export const LAB_NOTES = {
    top:  ['Bergamot','Lemon','Mandarin','Grapefruit','Mint','Black Pepper','Ginger','Pink Pepper','Cardamom','Neroli'],
    heart:['Rose','Jasmine','Peony','Iris','Violet','Lavender','Geranium','Ylang Ylang','Tuberose','Magnolia'],
    base: ['Sandalwood','Cedarwood','Patchouli','Vetiver','Musk','Amber','Oud','Vanilla','Benzoin','Tonka Bean'],
  };
  
  export const FINDER_LIBRARY = {
    'baccarat rouge':'2','baccarat':'2','sauvage':'1','dior sauvage':'1',
    'mon paris':'3','oud wood':'4','tom ford oud':'4','narciso':'5',
    'narciso rodriguez':'5','black orchid':'6','bleu de chanel':'7',
    'bleu chanel':'7','chloe':'8',
  };