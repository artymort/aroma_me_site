'use strict';
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const query = new URLSearchParams(location.search);
const page = document.body.dataset.page;
const asset = name => 'assets/scent-journal/' + (name === 'rose-study' ? 'rose-study-v2' : name) + '.png';
// Official Lucide SVG paths. See assets/scent-journal/LUCIDE-LICENSE.txt.
const paths = {
  "search": "<path d=\"m21 21-4.34-4.34\" />\n  <circle cx=\"11\" cy=\"11\" r=\"8\" />",
  "heart": "<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\" />",
  "arrow": "<path d=\"M5 12h14\" />\n  <path d=\"m12 5 7 7-7 7\" />",
  "left": "<path d=\"m12 19-7-7 7-7\" />\n  <path d=\"M19 12H5\" />",
  "close": "<path d=\"M18 6 6 18\" />\n  <path d=\"m6 6 12 12\" />",
  "menu": "<path d=\"M4 5h16\" />\n  <path d=\"M4 12h16\" />\n  <path d=\"M4 19h16\" />",
  "compare": "<circle cx=\"5\" cy=\"6\" r=\"3\" />\n  <path d=\"M12 6h5a2 2 0 0 1 2 2v7\" />\n  <path d=\"m15 9-3-3 3-3\" />\n  <circle cx=\"19\" cy=\"18\" r=\"3\" />\n  <path d=\"M12 18H7a2 2 0 0 1-2-2V9\" />\n  <path d=\"m9 15 3 3-3 3\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "leaf": "<path d=\"M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20\" />\n  <path d=\"M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13\" />",
  "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\" />\n  <path d=\"M12 2v2\" />\n  <path d=\"M12 20v2\" />\n  <path d=\"m4.93 4.93 1.41 1.41\" />\n  <path d=\"m17.66 17.66 1.41 1.41\" />\n  <path d=\"M2 12h2\" />\n  <path d=\"M20 12h2\" />\n  <path d=\"m6.34 17.66-1.41 1.41\" />\n  <path d=\"m19.07 4.93-1.41 1.41\" />",
  "moon": "<path d=\"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401\" />",
  "flower": "<path d=\"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1\" />\n  <circle cx=\"12\" cy=\"8\" r=\"2\" />\n  <path d=\"M12 10v12\" />\n  <path d=\"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z\" />\n  <path d=\"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z\" />",
  "plus": "<path d=\"M5 12h14\" />\n  <path d=\"M12 5v14\" />",
  "book": "<path d=\"M12 5v16\" />\n  <path d=\"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z\" />"
};
const icon = name => '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.arrow) + '</svg>';
const perfumes = [
 {id:'santal', name:'Santal 33', brand:'Le Labo', year:2011, group:'Древесный, фужерный', source:12201, gender:'Унисекс', line:'Classic Collection',
  image:'Fragrant_image/Le Labo/Santal 33 Le Labo.jpg', tags:['Древесный','Сухой','Кожаный'], mood:'wood',
  notes:['Сандал','Кожа','Папирус','Кедр','Кардамон','Фиалка','Ирис','Амбра'],
  description:'Сухое дерево, пряный воздух и мягкая кожа. Не сладкий сандал, а более шероховатый, дымный и спокойный образ.',
  feeling:'Тёплая деревянная мастерская, кожаная куртка и сухая трава.',
  sourceUrl:'https://www.fragrantica.ru/perfume/Le-Labo/Santal-33-12201.html'},
 {id:'bal', name:"Bal d’Afrique", brand:'Byredo', year:2009, group:'Цветочный, древесный', source:6458, gender:'Унисекс',
  image:"Fragrant_image/Byredo/Bal d'Afrique Byredo.jpg", tags:['Цитрусовый','Цветочный','Древесный'], mood:'fresh',
  top:['Бергамот','Бархатцы','Бучу'], heart:['Фиалка','Цикламен'], base:['Ветивер','Кедр'],
  description:'Светлый цитрусово-цветочный аромат с мягкой древесной основой. Свежесть здесь не холодная, а солнечная и округлая.',
  feeling:'Тёплый свет, свежие цветы и мягкая древесная поверхность.',
  sourceUrl:'https://www.fragrantica.ru/perfume/Byredo/Bal-d-Afrique-6458.html'},
 {id:'baccarat', name:'Baccarat Rouge 540', brand:'Maison Francis Kurkdjian', year:2015, group:'Амбровый, цветочный', source:33519, gender:'Унисекс', line:'Baccarat Rouge 540',
  image:'Fragrant_image/Maison Francis Kurkdjian/Baccarat Rouge 540 Maison Francis Kurkdjian.jpg', tags:['Амбровый','Сладкий','Воздушный'], mood:'sweet',
  top:['Шафран','Жасмин'], heart:['Амбервуд','Серая амбра','Гедион'], base:['Еловая смола','Кедр','Сахар','Ambroxan','Дубовый мох'],
  description:'Воздушная сладость, пряный шафран и тёплое амбровое дерево. Контраст прозрачности и насыщенного, обволакивающего следа.',
  feeling:'Тёплое стекло, сахарная корочка и пряный золотистый воздух.',
  sourceUrl:'https://www.fragrantica.ru/perfume/Maison-Francis-Kurkdjian/Baccarat-Rouge-540-33519.html'},
 {id:'cherry', name:'Lost Cherry', brand:'Tom Ford', year:2018, group:'Амбровый, цветочный', source:51411, gender:'Унисекс', line:'Private Blend',
  image:'Fragrant_image/Tom Ford/Lost Cherry Tom Ford.jpg', tags:['Вишнёвый','Сладкий','Миндальный'], mood:'sweet',
  top:['Горький миндаль','Чёрная вишня','Вишнёвый ликёр'], heart:['Вишня','Слива','Турецкая роза','Жасмин самбак'], base:['Ваниль','Бобы тонка','Корица','Перуанский бальзам','Сандал','Бензоин','Кедр','Пачули','Ветивер'],
  description:'Сочная вишня и горький миндаль, за которыми появляется тёплая пряная сладость. Яркий фруктовый характер, а не ощущение свежей воды.',
  feeling:'Спелая вишня, миндальная выпечка и тёплое дерево.',
  sourceUrl:'https://www.fragrantica.ru/perfume/Tom-Ford/Lost-Cherry-51411.html'},
 {id:'blanche', name:'Blanche', brand:'Byredo', year:2009, group:'Цветочный, альдегидный', source:6686, gender:'Унисекс',
  image:'Fragrant_image/Byredo/Blanche Byredo.jpg', tags:['Чистый','Цветочный','Мускусный'], mood:'clean',
  top:['Альдегиды','Роза','Розовый перец'], heart:['Пион','Фиалка','Апельсиновый цвет'], base:['Мускус','Древесные ноты','Сандал'],
  description:'Чистое бельё, мягкие цветы и спокойный мускусный фон. Светлый аромат с ощущением свежевыстиранной ткани.',
  feeling:'Белая рубашка, чистая кожа и прохладный утренний свет.',
  sourceUrl:'https://www.fragrantica.ru/perfume/Byredo/Blanche-6686.html'},
 {id:'aventus', name:'Aventus', brand:'Creed', year:2010, group:'Шипровый, фруктовый', source:9828, gender:'Мужские', line:'Aventus',
  image:'Fragrant_image/Creed/Aventus Creed.jpg', tags:['Фруктовый','Древесный','Свежий'], mood:'fresh',
  top:['Бергамот','Чёрная смородина','Яблоко','Лимон','Розовый перец'], heart:['Ананас','Пачули','Марокканский жасмин'], base:['Берёза','Мускус','Дубовый мох','Кедр','Ambroxan'],
  description:'Свежие фрукты на древесно-мшистой основе. Яркое начало сменяется более сухим и фактурным звучанием.',
  feeling:'Фруктовая свежесть, сухое дерево и прохладный воздух.',
  sourceUrl:'https://www.fragrantica.ru/perfume/Creed/Aventus-9828.html'},
 {id:'chance', name:'Chance Eau Tendre', brand:'Chanel', year:2010, group:'Цветочный, фруктовый', source:8069, gender:'Женские', line:'Chance',
  image:'Fragrant_image/Chanel/Chance Eau Tendre Chanel.jpg', tags:['Цветочный','Мягкий','Фруктовый'], mood:'flower',
  top:['Айва','Грейпфрут'], heart:['Гиацинт','Жасмин'], base:['Мускус','Ирис','Кедр','Амбра'],
  description:'Мягкие цветы, лёгкая фруктовая кислинка и нежная мускусная основа. Спокойное, светлое и округлое звучание.',
  feeling:'Нежный букет у открытого окна и свежий фруктовый воздух.',
  sourceUrl:'https://www.fragrantica.ru/perfume/Chanel/Chance-Eau-Tendre-8069.html'}
];
const noteData = [
 {id:'rose', name:'Роза', image:'rose-study', line:'От свежего лепестка до густого, тёмного букета.', text:'Роза - не один запах. В парфюмерной композиции она может напоминать свежие лепестки, зелёный стебель, нежную пудру или густое варенье. Впечатление зависит от используемых материалов и их окружения.', terms:['Роза','Пион'], feeling:'Цветочный, мягкий, иногда фруктовый или пряный.'},
 {id:'bergamot', name:'Бергамот', image:'bergamot-study', line:'Цитрусовая свежесть с лёгкой зелёной горчинкой.', text:'Бергамот даёт яркое цитрусовое впечатление: свежая цедра, зелёная горчинка и лёгкая цветочная грань. Это не сладкий апельсиновый сок, а скорее аромат его кожуры и листьев.', terms:['Бергамот'], feeling:'Свежий, цитрусовый, зелёный, чуть горький.'},
 {id:'cedar', name:'Кедр', image:'wood-study', line:'Сухое дерево, тепло и тонкая карандашная стружка.', text:'Кедровую ноту часто описывают через сухую древесину и карандашную стружку. Она помогает представить структуру аромата: меньше сливочной мягкости, больше сухости и фактуры.', terms:['Кедр'], feeling:'Древесный, сухой, спокойный, слегка смолистый.'}
];
// Visual sample for the note directory. Each six-panel image provides one distinct photo per note.
const notePreview = [
 {id:'rose',name:'Роза',group:'Цветочные',line:'Свежие лепестки, мягкость и иногда тонкая пряность.',sheet:'classics',col:0,row:0},
 {id:'jasmine',name:'Жасмин',group:'Цветочные',line:'Белый цветок с насыщенным, тёплым звучанием.',sheet:'flowers',col:0,row:0},
 {id:'lavender',name:'Лаванда',group:'Цветочные',line:'Прохладная трава с узнаваемой цветочной гранью.',sheet:'flowers',col:1,row:0},
 {id:'iris',name:'Ирис',group:'Цветочные',line:'Сухая пудра, мягкая прохлада и бархатистость.',sheet:'flowers',col:2,row:0},
 {id:'orange-blossom',name:'Цветок апельсина',group:'Цветочные',line:'Светлые белые цветы с медовой теплотой.',sheet:'flowers',col:0,row:1},
 {id:'peony',name:'Пион',group:'Цветочные',line:'Нежный цветочный букет с ощущением свежести.',sheet:'flowers',col:1,row:1},
 {id:'violet',name:'Фиалка',group:'Цветочные',line:'Тихая цветочная сладость и лёгкая пудра.',sheet:'flowers',col:2,row:1},
 {id:'bergamot',name:'Бергамот',group:'Цитрусы и фрукты',line:'Звонкая цедра с зелёной горчинкой.',sheet:'classics',col:1,row:0},
 {id:'lemon',name:'Лимон',group:'Цитрусы и фрукты',line:'Яркая кислинка и свежесть лимонной кожуры.',sheet:'fruits-a',col:0,row:0},
 {id:'mandarin',name:'Мандарин',group:'Цитрусы и фрукты',line:'Сочный цитрус с более мягкой сладостью.',sheet:'fruits-a',col:1,row:0},
 {id:'grapefruit',name:'Грейпфрут',group:'Цитрусы и фрукты',line:'Сочная свежесть с характерной горечью.',sheet:'classics',col:0,row:1},
 {id:'orange',name:'Апельсин',group:'Цитрусы и фрукты',line:'Тёплая цитрусовая сладость и яркая цедра.',sheet:'classics',col:1,row:1},
 {id:'blackcurrant',name:'Черная смородина',group:'Цитрусы и фрукты',line:'Тёмные ягоды с терпким зелёным оттенком.',sheet:'fruits-a',col:2,row:0},
 {id:'pineapple',name:'Ананас',group:'Цитрусы и фрукты',line:'Сочный тропический фрукт с искристой кислинкой.',sheet:'fruits-a',col:0,row:1},
 {id:'apple',name:'Яблоко',group:'Цитрусы и фрукты',line:'Хрустящая фруктовая свежесть.',sheet:'fruits-a',col:1,row:1},
 {id:'fig',name:'Инжир',group:'Цитрусы и фрукты',line:'Молочная мякоть, зелёный лист и мягкая сладость.',sheet:'fruits-a',col:2,row:1},
 {id:'cedar',name:'Кедр',group:'Древесные',line:'Сухое дерево и тонкая карандашная стружка.',sheet:'classics',col:2,row:0},
 {id:'sandalwood',name:'Сандал',group:'Древесные',line:'Гладкое, тёплое дерево с кремовой мягкостью.',sheet:'woods-spices',col:0,row:0},
 {id:'patchouli',name:'Пачули',group:'Древесные',line:'Землистая глубина и влажная зелень.',sheet:'woods-spices',col:1,row:0},
 {id:'vetiver',name:'Ветивер',group:'Древесные',line:'Сухие корни, трава и прохладная дымность.',sheet:'woods-spices',col:2,row:0},
 {id:'cinnamon',name:'Корица',group:'Пряные',line:'Тёплая сладкая пряность с сухой древесной гранью.',sheet:'woods-spices',col:0,row:1},
 {id:'cardamom',name:'Кардамон',group:'Пряные',line:'Прохладная, чуть лимонная пряность.',sheet:'woods-spices',col:1,row:1},
 {id:'saffron',name:'Шафран',group:'Пряные',line:'Сухое пряное тепло с кожаным оттенком.',sheet:'woods-spices',col:2,row:1},
 {id:'ginger',name:'Имбирь',group:'Пряные',line:'Острая свежесть с тёплым покалыванием.',sheet:'classics',col:2,row:1},
 {id:'vanilla',name:'Ваниль',group:'Гурманские',line:'Тёплая мягкая сладость, от сливочной до сухой.',sheet:'gourmand-greens',col:0,row:0},
 {id:'coffee',name:'Кофе',group:'Гурманские',line:'Обжаренные зёрна, горчинка и тёплая глубина.',sheet:'gourmand-greens',col:1,row:0},
 {id:'cacao',name:'Какао',group:'Гурманские',line:'Сухой шоколадный порошок и горькие зёрна.',sheet:'gourmand-greens',col:2,row:0},
 {id:'tonka',name:'Бобы тонка',group:'Гурманские',line:'Мягкая сладость с оттенком миндаля и сена.',sheet:'gourmand-greens',col:2,row:1},
 {id:'mint',name:'Мята',group:'Зелёные',line:'Холодная зелень и ощущение свежего воздуха.',sheet:'gourmand-greens',col:0,row:1},
 {id:'rosemary',name:'Розмарин',group:'Зелёные',line:'Хвойная свежесть и терпкая пряная зелень.',sheet:'gourmand-greens',col:1,row:1}
];
const noteVisualIds=['rose','jasmine','lavender','bergamot','lemon','mandarin','grapefruit','orange','coffee','rosemary'];
const noteVisuals=noteVisualIds.map(id=>notePreview.find(note=>note.id===id)).map(note=>({
 ...note,
 photo:'assets/note-concepts/'+note.id+'-macro.webp'
}));
let noteDirectory=[];
const noteEntryUrl=note=>{
 const visual=noteVisuals.find(item=>normalized(item.name)===normalized(note.name));
 const editorial=noteData.find(item=>normalized(item.name)===normalized(note.name));
 return visual||editorial?'notes.html?id='+encodeURIComponent((visual||editorial).id):'notes.html?note='+encodeURIComponent(note.name);
};
const noteListEntry=note=>'<a class="note-list-entry" href="'+noteEntryUrl(note)+'"><span class="note-list-name">'+esc(note.name)+'</span><small>'+note.count.toLocaleString('ru-RU')+'</small></a>';
const stories = [
 {id:'atelier', title:'Как рождается аромат', subtitle:'От первого впечатления до готовой композиции.', image:'atelier-study', category:'В мастерской', time:'6 минут',
  intro:'Готовый аромат кажется единым целым. Но за этим впечатлением стоит работа с множеством материалов, пропорций и проб. Посмотрим на процесс без сложных формул.',
  sections:[['Сначала - идея','Будущий аромат может начаться с образа: прохладный сад, тёплое дерево, знакомый человек или конкретный парфюмерный материал. Этот образ помогает сформулировать направление, но ещё не является рецептом.'],
  ['Материалы, а не список цветов','Парфюмер работает и с натуральными, и с синтетическими материалами. Название ноты на странице аромата описывает обонятельное впечатление, а не всегда указывает на физический ингредиент во флаконе.'],
  ['Проба, время, новая проба','Композицию оценивают на блоттере и коже, сразу и спустя время. Меняют пропорции, убирают лишнее, ищут баланс. То, что красиво в начале, должно складываться в целостное впечатление и позже.'],
  ['Как это помогает выбирать','Не стоит читать пирамиду как точный рецепт или обещание, что каждый компонент обязательно будет заметен. Лучше сопоставлять ноты с описанием характера аромата и собственным впечатлением при тестировании.']]},
 {id:'rose', title:'У розы много голосов', subtitle:'Почему одна нота звучит так по-разному.', image:'rose-study', category:'Ноты крупным планом', time:'4 минуты',
  intro:'Роза может быть прохладной и зелёной, нежной и пудровой, тёмной и пряной. Одно знакомое слово скрывает целый диапазон впечатлений.',
  sections:[['Не только букет','Нота розы может быть построена из разных материалов. Её окружение тоже меняет восприятие: цитрусы дают свежесть, древесина - сухость, сладкие и пряные грани - более плотное звучание.'],
  ['Как описать свою розу','Попробуйте выбрать простые слова: свежая или густая, зелёная или сладкая, прозрачная или насыщенная. Они помогут точнее искать аромат, чем одно название цветка.'],
  ['Пирамида - начало знакомства','Два аромата с розой в составе не обязательно похожи. Смотрите на остальные ноты и общую характеристику, затем сравнивайте собственные ощущения на коже.']]},
 {id:'citrus', title:'Свежесть бывает разной', subtitle:'Цедра, листья и воздух в цитрусовых ароматах.', image:'bergamot-study', category:'Гид по ароматам', time:'5 минут',
  intro:'«Хочу свежий аромат» - хороший старт, но не единственное направление. Свежесть может быть цитрусовой, зелёной, мыльной или воздушной.',
  sections:[['Цитрусы: не только лимон','Лимон, грейпфрут и бергамот создают разные впечатления. Для поиска удобно мыслить образами: кислая мякоть, горькая цедра, зелёный лист или солнечная сладость.'],
  ['Что остаётся после старта','Яркое цитрусовое начало может смениться цветами, мускусом или древесиной. Поэтому важно тестировать аромат не только в первые минуты.'],
  ['Найдите свою свежесть','Если цитрусовые ноты кажутся слишком резкими, можно исследовать чистые мускусные и мягкие цветочные композиции. Не существует одной обязательной формулы «аромата на каждый день».']]},
 {id:'wood', title:'Тёплая сторона дерева', subtitle:'Сандал, кедр и ветивер на понятном языке.', image:'wood-study', category:'Энциклопедия', time:'4 минуты',
  intro:'Древесные ароматы - не один тип запаха. Сухая стружка, мягкая сливочная фактура и землистый корень дают совершенно разные ощущения.',
  sections:[['Сухость или мягкость','Кедр часто ассоциируется с сухим деревом, сандал - с более мягкой, округлой фактурой. Это ориентиры, а не универсальные правила: композиция способна сильно изменить впечатление.'],
  ['Ветивер - отдельный характер','Ветивер может давать землистые, зелёные, сухие и дымные грани. Его часто воспринимают как древесную ноту, хотя исходный натуральный материал получают из корней растения.'],
  ['Сравнивайте в контексте','Одинаковая нота не делает два аромата одинаковыми. Важно её окружение: цветы, специи, мускус и амбровые материалы меняют характер древесной основы.']]}
];
function readState(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
let favorites = readState('aromame-favorites-v2', []).filter(id => typeof id==='string');
let compareIds = readState('aromame-compare-v2', []).filter(id => typeof id==='string').slice(0,2);
const writeState = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)) } catch { /* The current session still works if browser storage is disabled. */ } };
const getPerfume = id => perfumes.find(p => p.id === id);
const originalPerfumes=new Map(perfumes.map(p=>[p.id,p]));
let catalogManifestPromise;
let catalogIndexPromise;
const catalogBrandRequests=new Map();
async function catalogJson(file) {
 const response=await fetch('assets/data/catalog/'+file+'?v=2');
 if(!response.ok)throw new Error('Catalog request failed: '+response.status);
 return response.json();
}
function catalogManifest() { return catalogManifestPromise ||= catalogJson('manifest.json'); }
function catalogIndex() { return catalogIndexPromise ||= catalogJson('index.json').then(data=>data.perfumes).catch(error=>{catalogIndexPromise=null;throw error;}); }
function mergeCatalog(entries) {
 const positions=new Map(perfumes.map((p,i)=>[p.id,i]));
 for(const entry of entries) {
  const original=originalPerfumes.get(entry.id);
  const p={description:'',feeling:'',sourceUrl:'',imported:true,...entry};
  if(p.id==='csv-472')p.image='Fragrant_image/Creed/Silver%20Mountain%20Water%20Creed%20cutout.png?v=1';
  if(p.id==='csv-899')p.image='Fragrant_image/Creed/Virgin%20Island%20Water%202007%20Creed%20cutout.png?v=1';
  if(original)Object.assign(p,{description:original.description,feeling:original.feeling,line:original.line,imported:false});
  const position=positions.get(p.id);
  if(position===undefined){positions.set(p.id,perfumes.length);perfumes.push(p);}else perfumes[position]=p;
 }
}
async function loadCatalogBrand(brand) {
 const manifest=await catalogManifest();
 const entry=manifest.brands.find(b=>b.name===brand);
 if(!entry)return;
 if(!catalogBrandRequests.has(brand))catalogBrandRequests.set(brand,catalogJson(entry.file).then(mergeCatalog).catch(error=>{catalogBrandRequests.delete(brand);throw error;}));
 await catalogBrandRequests.get(brand);
}
async function loadCatalogForPage() {
 const manifest=await catalogManifest();
 if(page==='catalog'&&!query.get('brand'))mergeCatalog(await catalogIndex());
 const ids=new Set([...favorites,...compareIds,...['id','a','b'].map(key=>query.get(key)).filter(Boolean)]);
 const brands=new Set(manifest.brands.filter(b=>b.ids.some(id=>ids.has(id))).map(b=>b.name));
 if(page==='catalog'&&query.get('brand'))brands.add(query.get('brand'));
 await Promise.all([...brands].map(loadCatalogBrand));
 const valid=new Set(manifest.brands.flatMap(b=>b.ids));
 favorites=favorites.filter(id=>valid.has(id));compareIds=compareIds.filter(id=>valid.has(id));
}
const allNotes = p => p.notes || [...(p.top||[]),...(p.heart||[]),...(p.base||[])];
const perfumeUrl = p => 'perfume.html?id='+p.id;
const noteTags = items => '<div class="chips">'+items.map(n=>'<a class="chip" href="'+noteEntryUrl({name:n})+'">'+esc(n)+'</a>').join('')+'</div>';
const buttonLink = (text,url,secondary=false) => '<a class="button'+(secondary?' secondary':'')+'" href="'+url+'">'+text+icon('arrow')+'</a>';
const breadcrumb = title => '<nav class="breadcrumb" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span aria-hidden="true">/</span><span aria-current="page">'+esc(title)+'</span></nav>';
const noteBreadcrumb = title => '<nav class="breadcrumb" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span aria-hidden="true">/</span><a href="notes.html">Ноты</a><span aria-hidden="true">/</span><span aria-current="page">'+esc(title)+'</span></nav>';
const pageHeading = (title,text='') => '<div class="page-heading">'+breadcrumb(title)+'<h1>'+esc(title)+'</h1>'+(text?'<p>'+text+'</p>':'')+'</div>';
function header() {
 const links=[['catalog','Ароматы'],['brands','Бренды'],['notes','Ноты'],['selection','Подбор'],['journal','Журнал'],['compare','Сравнить']];
 const activePage=page==='catalog'&&query.get('brand')?'brands':page==='perfume'?'catalog':page==='article'?'journal':page;
 return '<a class="skip" href="#main">К содержимому</a><header class="header"><div class="container header-inner"><a class="logo" href="index.html" aria-label="aroma:me - главная"><img src="newlogo.svg?v=1" alt="aroma:me" width="160" height="18"></a><nav class="nav" id="main-nav" aria-label="Основная навигация">'+links.map(([id,t])=>'<a data-label="'+esc(t)+'" data-nav="'+id+'" class="'+(id===activePage?'active':'')+'" href="'+id+'.html"'+(id===activePage?' aria-current="page"':'')+'><span class="nav-label">'+esc(t)+'</span></a>').join('')+'</nav><div class="header-actions"><button class="icon-button" data-open-search aria-label="Поиск">'+icon('search')+'</button><a class="icon-button" href="favorites.html" aria-label="Избранное">'+icon('heart')+'<span class="favorite-count" '+(!favorites.length?'hidden':'')+'>'+favorites.length+'</span></a><button class="icon-button mobile-menu" aria-controls="main-nav" aria-expanded="false" aria-label="Открыть меню">'+icon('menu')+'</button></div></div></header>';
}
function footer() {
 return '<footer class="footer container"><div class="footer-top"><a href="index.html" class="logo"><img src="newlogo.svg?v=1" alt="aroma:me" width="132" height="15"></a><nav aria-label="Навигация в подвале"><a href="catalog.html">Ароматы</a><a href="notes.html">Ноты</a><a href="compare.html">Сравнение</a><a href="journal.html">Журнал</a><a href="selection.html">Подбор</a></nav></div><div class="footer-bottom"><span>Больше, чем ароматы.</span><span>Дизайн-прототип · Подбор без подключения ИИ · Цены магазинов не загружаются</span></div></footer>';
}
function searchForm(id,placeholder='Найти аромат, бренд или ноту',value='') {
 return '<div class="search-wrap"><form class="search-form" action="catalog.html" role="search">'+icon('search')+'<input id="'+id+'" name="q" type="search" autocomplete="off" aria-label="'+esc(placeholder)+'" placeholder="'+esc(placeholder)+'" value="'+esc(value)+'" aria-controls="'+id+'-suggestions" aria-expanded="false"><button class="search-submit" aria-label="Найти">'+icon('arrow')+'</button></form><div class="search-suggestions" id="'+id+'-suggestions" hidden aria-label="Подсказки поиска"></div></div>';
}
function productCard(p, previewDetails=false) {
 const genderLabel={'Женские':'Женский аромат','Мужские':'Мужской аромат','Унисекс':'Унисекс'}[p.gender];
 const facts=[genderLabel,Number.isInteger(p.year)?p.year:null].filter(Boolean).join(' · ');
 const details=previewDetails&&facts?'<p class="product-facts">'+esc(facts)+'</p>':'';
 const tagLabel=previewDetails&&p.tags.length?'<span class="product-tags-label">Характер: </span>':'';
 return '<article class="product'+(previewDetails?' product-preview':'')+'"><button class="icon-button save '+(favorites.includes(p.id)?'selected':'')+'" data-save="'+p.id+'" aria-label="'+(favorites.includes(p.id)?'Убрать из избранного':'Добавить в избранное')+': '+esc(p.name)+'" aria-pressed="'+favorites.includes(p.id)+'">'+icon('heart')+'</button><a class="product-image" href="'+perfumeUrl(p)+'" aria-label="'+esc(p.brand+' '+p.name)+'"><img src="'+esc(p.image)+'" alt="'+esc(p.brand+' '+p.name)+'" loading="lazy" decoding="async"></a><p class="product-brand">'+esc(p.brand)+'</p><h3><a href="'+perfumeUrl(p)+'">'+esc(p.name)+'</a></h3>'+details+'<p class="product-tags">'+tagLabel+p.tags.map(esc).join(' · ')+'</p><button class="product-compare" data-compare="'+p.id+'" aria-pressed="'+compareIds.includes(p.id)+'">'+icon(compareIds.includes(p.id)?'check':'plus')+'<span>'+(compareIds.includes(p.id)?'В сравнении':'Сравнить')+'</span></button></article>';
}
function storyCard(s) {
 return '<article class="story-card"><a href="article.html?id='+s.id+'"><img src="'+asset(s.image)+'" alt="'+esc(s.title)+'" loading="lazy"><div class="story-meta"><span>'+s.category+'</span><span>'+s.time+'</span></div><h3>'+s.title+'</h3></a><p>'+s.subtitle+'</p></article>';
}
function journalCover(s, index) {
 const titleId = 'journal-cover-' + s.id;
 return '<article class="journal-cover'+(index===0?' journal-cover-lead':'')+'"><a class="journal-cover-link" href="article.html?id='+s.id+'" aria-labelledby="'+titleId+'"><img class="journal-cover-image" src="'+asset(s.image)+'" alt="" loading="lazy"><div class="journal-cover-copy"><div class="story-meta"><span>'+esc(s.category)+'</span><span>'+esc(s.time)+'</span></div><h3 id="'+titleId+'">'+esc(s.title)+'</h3><p>'+esc(s.subtitle)+'</p></div><span class="round journal-cover-arrow">'+icon('arrow')+'</span></a></article>';
}
function noteCard(n) {
 const photo=noteVisuals.find(visual=>visual.id===n.id)?.photo||asset(n.image);
 return '<a class="note-card" href="notes.html?id='+n.id+'"><img src="'+photo+'" alt="'+n.name+'" loading="lazy"><h3>'+n.name+'</h3><p>'+n.line+'</p></a>';
}
function notePreviewPhoto(n) {
 if(n.photo)return '<span class="note-preview-photo"><img src="'+esc(n.photo)+'" alt="'+esc(n.name)+'" loading="lazy"></span>';
 return '<span class="note-preview-photo" role="img" aria-label="'+esc(n.name)+'" style="background-image:url(assets/note-prototype/'+n.sheet+'.webp);background-position:'+n.col*50+'% '+n.row*100+'%"></span>';
}
function notePreviewCard(n) {
 return '<a class="note-preview-card" href="notes.html?id='+encodeURIComponent(n.id)+'">'+notePreviewPhoto(n)+'<h2>'+esc(n.name)+'</h2><p>'+esc(n.line)+'</p></a>';
}
function mobileHome() {
 const action=(title,description,href,symbol)=>'<a class="home-action" href="'+href+'"><span class="home-action-symbol">'+icon(symbol)+'</span><div><h2>'+title+'</h2><p>'+description+'</p></div>'+icon('arrow')+'</a>';
 return '<div class="home-mobile"><section class="home-mobile-intro"><h1>Твой мир<br>ароматов<br>начинается<br><span>здесь</span></h1><p>Узнавайте больше о нотах и истории ароматов, сравнивайте их между собой и сохраняйте те, которые хочется попробовать или уже любите.</p></section><div class="home-mobile-search">'+searchForm('mobile-home-search')+'</div>'+
 '<section class="home-pair"><a href="compare.html?a=santal&amp;b=bal"><img src="'+asset('gateway-compare-real-v2')+'" alt="Реальные флаконы Le Labo Santal 33 и Byredo Bal d’Afrique"><div class="home-pair-meta"><span>Разбираем пару</span><span>Ароматы</span></div><h2>Сандал или ветивер?</h2><p class="home-pair-names">Santal 33 · Bal d’Afrique</p><p>Два древесных аромата с разным характером. Посмотрите на ноты и сравните их рядом.</p></a>'+buttonLink('Сравнить эту пару','compare.html?a=santal&b=bal')+'</section>'+
 '<section class="home-mobile-section"><div class="home-mobile-heading"><h2>Попробуйте</h2></div><nav class="home-actions" aria-label="Попробуйте инструменты aroma:me">'+action('Сравнить ароматы','Выберите два и посмотрите разницу.','compare.html','compare')+action('Подобрать ароматы','Начните с того, что вам нравится.','selection.html','search')+action('Исследовать ноты','Знакомые запахи на понятном языке.','notes.html','leaf')+action('Читать журнал','Люди, истории и мир парфюмерии.','journal.html','book')+'</nav></section>'+
 '<section class="home-mobile-section"><div class="home-mobile-heading"><h2>Ещё почитать</h2><a href="journal.html">Все истории</a></div><div class="home-reading">'+stories.slice(0,3).map(s=>'<a href="article.html?id='+s.id+'"><img src="'+asset(s.image)+'" alt="" loading="lazy"><div><h3>'+s.title+'</h3><p>'+s.category+' · '+s.time+'</p></div></a>').join('')+'</div></section></div>';
}
function home() {
 const slides=[
  {image:'cover-cherry',label:'',title:'У каждого аромата - свой мир',href:'catalog.html'},
  {image:'rose-study',label:'Ноты крупным планом',title:'У розы много голосов',href:'article.html?id=rose'},
  {image:'bergamot-study',label:'Гид по ароматам',title:'Свежесть бывает разной',href:'article.html?id=citrus',light:true}
 ];
 const gateways=[
  ['Сравнить<br>ароматы','Рассмотрите два аромата рядом.','compare.html','gateway-compare-real-v2','compare-gateway'],
  ['Подобрать<br>аромат','Начните с того, что вам нравится.','selection.html','gateway-selection-real-v2','selection-gateway'],
  ['Исследовать<br>ноты','Знакомые запахи на понятном языке.','notes.html','gateway-notes-v1','pale notes-gateway'],
  ['Читать<br>журнал','Люди, истории и мир парфюмерии.','journal.html','gateway-journal-real-v2','journal-gateway']
 ];
 return '<main id="main" class="container"><section class="hero"><div class="hero-copy"><h1>Твой мир<br> ароматов<br> начинается<br> <span>здесь</span></h1><p>Узнавайте больше о нотах и истории ароматов, сравнивайте их между<br>собой и сохраняйте те, которые хочется попробовать<br class="desktop-break"> или уже любите.</p>'+searchForm('home-search')+'</div><div class="hero-carousel" role="region" aria-roledescription="карусель" aria-label="Редакционные обложки">'+slides.map((s,i)=>'<a class="slide '+(i===0?'active ':'')+(s.light?'light':'')+'" href="'+s.href+'" data-slide="'+i+'" aria-hidden="'+(i!==0)+'" tabindex="'+(i===0?'0':'-1')+'"><img src="'+asset(s.image)+'" alt="'+(i===0?'Стеклянный флакон и ботаническая ветвь на ягодном фоне':esc(s.title))+'"'+(i===0?' fetchpriority="high"':' loading="lazy"')+'><div class="slide-caption">'+(s.label?'<span>'+s.label+'</span>':'')+'<strong>'+s.title+'</strong></div></a>').join('')+'<div class="carousel-control"><span class="slide-number"><b id="slide-number">01</b> <span>- 03</span></span><button class="round" data-slide-prev aria-label="Предыдущий баннер">'+icon('left')+'</button><button class="round" data-slide-next aria-label="Следующий баннер">'+icon('arrow')+'</button><div class="dots">'+slides.map((s,i)=>'<button class="dot '+(i===0?'active':'')+'" data-slide-to="'+i+'" aria-label="Баннер '+(i+1)+': '+s.title+'" aria-pressed="'+(i===0)+'"></button>').join('')+'</div></div></div></section><section class="gateways" aria-label="Исследуйте мир ароматов">'+gateways.map(([t,desc,url,img,cls])=>'<a class="gateway '+cls+'" href="'+url+'"><img src="'+asset(img)+'" alt="" loading="lazy"><h2>'+t+'</h2><p>'+desc+'</p><span class="round">'+icon('arrow')+'</span></a>').join('')+'</section>'+
 '<section class="section home-journal" aria-labelledby="home-journal-title"><div class="section-head"><div><h2 id="home-journal-title">Главное в журнале</h2></div><a class="text-link" href="journal.html">Все истории '+icon('arrow')+'</a></div><div class="journal-cover-grid">'+stories.slice(0,3).map(journalCover).join('')+'</div></section>'+
 '<section class="section compare-promo"><div><h2>Похожи.<br>Но не одинаковы.</h2><p>Одни и те же ноты могут звучать по-разному. Сравните характер, состав и впечатление от двух ароматов.</p>'+buttonLink('Сравнить эту пару','compare.html?a=santal&b=bal')+'</div><div class="compare-mini"><a href="perfume.html?id=santal"><img src="'+esc(perfumes[0].image)+'" alt="Santal 33 Le Labo" loading="lazy"><strong>Santal 33</strong><small>Le Labo</small></a><span class="compare-vs">vs</span><a href="perfume.html?id=bal"><img src="'+esc(perfumes[1].image)+'" alt="Bal d’Afrique Byredo" loading="lazy"><strong>Bal d’Afrique</strong><small>Byredo</small></a></div></section>'+
 '<section class="section"><div class="section-head"><div><h2>Знакомство с ароматами</h2><p>Четыре разных характера. Какой ближе вам?</p></div><a class="text-link" href="catalog.html">В каталог '+icon('arrow')+'</a></div><div class="product-grid">'+perfumes.slice(0,4).map(productCard).join('')+'</div></section>'+
 '<section class="section"><div class="section-head"><div><h2>За именем ноты</h2><p>Узнайте, как пахнут знакомые ингредиенты.</p></div><a class="text-link" href="notes.html">Все ноты '+icon('arrow')+'</a></div><div class="notes-grid">'+noteData.map(noteCard).join('')+'</div></section>'+
 '<section class="section picker-promo"><div><h2>Не название.<br>Ваше ощущение.</h2><p>Начните со свежести, мягкости или тепла. Несколько простых вопросов помогут выбрать направление.</p>'+buttonLink('Найти свой аромат','selection.html')+'</div><img src="'+asset('cover-cherry')+'" alt="Редакционный натюрморт с флаконом" loading="lazy"></section></main>';
}
function normalized(s) { return s.toLocaleLowerCase('ru').replace(/ё/g,'е').replace(/[’']/g,'').replace(/\s*&\s*/g,' ').trim() }
function searchMatches(p, text) {
 const terms=normalized(text).split(/\s+/).filter(Boolean);
 const hay=normalized([p.name,p.brand,p.group,...p.tags,...allNotes(p),p.description,p.feeling].join(' '));
 return terms.every(t => hay.includes(t));
}
function catalog() {
 const text=query.get('q')||'', brand=query.get('brand')||'', mood=query.get('mood')||'';
 if(brand && typeof brandCatalogTemplate==='function')return brandCatalogTemplate(brand);
 if(!brand && typeof allCatalogTemplate==='function')return allCatalogTemplate();
 return '<main id="main" class="container">'+pageHeading(brand||'Ароматы','Начните со знакомого названия, любимой ноты или ощущения.')+'<div class="catalog-toolbar">'+searchForm('catalog-search','Аромат, бренд или нота…',text)+'<div class="chips" aria-label="Характер аромата">'+[['','Все'],['fresh','Свежие'],['wood','Древесные'],['flower','Цветочные'],['sweet','Сладкие'],['clean','Чистые']].map(([id,label])=>'<button class="chip '+(id===mood?'active':'')+'" data-mood="'+id+'" aria-pressed="'+(id===mood)+'">'+label+'</button>').join('')+'</div><span class="catalog-count" id="catalog-count"></span></div>'+(brand?'<p class="search-feedback">Бренд: '+esc(brand)+' · <a class="text-link" href="catalog.html">Сбросить</a></p>':'')+'<div class="product-grid catalog-grid" id="catalog-results"></div></main>';
}
function brandsPage() {
 return '<main id="main" class="container brands-page">'+pageHeading('Бренды','Найдите знакомый бренд или откройте для себя новый.')+'<form class="search-form brand-search-form" role="search" aria-label="Поиск бренда"><label class="sr-only" for="brand-search">Найти бренд</label>'+icon('search')+'<input id="brand-search" name="q" type="search" autocomplete="off" placeholder="Найти бренд" aria-controls="brand-results"><button class="icon-button brand-search-clear" type="button" data-brand-clear aria-label="Очистить поиск" hidden>'+icon('close')+'</button><button class="search-submit" aria-label="Найти бренд">'+icon('arrow')+'</button></form><section class="brand-featured" aria-labelledby="brand-featured-title" hidden><h2 id="brand-featured-title">Начните со знакомого</h2><div class="brand-featured-grid"></div></section><section class="brand-directory" aria-labelledby="brand-directory-title"><div class="brand-directory-heading"><h2 id="brand-directory-title">Все бренды</h2><span id="brand-total"></span></div><nav class="brand-alphabet" aria-label="Выбрать первую букву бренда"></nav><div class="brand-results-heading"><p id="brand-status" role="status" aria-live="polite">Загружаем бренды...</p><button type="button" class="text-link brand-reset" data-brand-reset hidden>Сбросить фильтры</button></div><div id="brand-results" aria-busy="true"></div><nav class="brand-pagination" aria-label="Страницы списка брендов"></nav></section></main>';
}
function notesPage() {
 const n=noteData.find(n=>n.id===query.get('id'));
 if(n){
  const relevant=perfumes.filter(p=>allNotes(p).some(x=>n.terms.some(t=>normalized(x).includes(normalized(t)))));
  const photo=noteVisuals.find(visual=>visual.id===n.id)?.photo||asset(n.image);
  return '<main id="main" class="container notes-page"><div class="page-heading">'+noteBreadcrumb(n.name)+'<h1>'+esc(n.name)+'</h1></div><section class="note-detail"><img src="'+photo+'" alt="'+n.name+'"><div><p>'+n.text+'</p><p>'+n.feeling+'</p><a class="text-link" href="notes.html">Все ноты '+icon('arrow')+'</a></div></section><section class="section"><div class="section-head"><h2>В каких ароматах встречается</h2></div><div class="product-grid">'+relevant.map(productCard).join('')+'</div></section></main>';
 }
 const previewNote=noteVisuals.find(note=>note.id===query.get('id'));
 if(previewNote){
  document.title=previewNote.name+' · aroma:me';
  return '<main id="main" class="container notes-page"><div class="page-heading">'+noteBreadcrumb(previewNote.name)+'<h1>'+esc(previewNote.name)+'</h1></div><section class="note-detail note-preview-detail">'+notePreviewPhoto(previewNote)+'<div><p>'+esc(previewNote.line)+'</p><p>Нота описывает впечатление от аромата. Название не всегда означает, что в композиции есть именно этот натуральный ингредиент.</p><a class="text-link" href="catalog.html?q='+encodeURIComponent(previewNote.name)+'">Ароматы с этой нотой '+icon('arrow')+'</a></div></section><p class="notice">Это пробная карточка. Подробное описание ноты дополним после проверки содержания.</p><a class="text-link" href="notes.html">Все ноты '+icon('arrow')+'</a></main>';
 }
 if(query.has('id'))return notFound('Нота не найдена','notes.html','Все ноты');
 return '<main id="main" class="container notes-page">'+pageHeading('Ноты','Найдите знакомую ноту, узнайте её характер и посмотрите ароматы, в которых она встречается.')+'<section class="notes-section" aria-labelledby="popular-notes-title"><div class="notes-section-heading"><h2 id="popular-notes-title">Популярные ноты</h2><p>Из ароматов каталога</p></div><div class="note-list-grid" id="popular-notes" aria-busy="true"></div></section><section class="notes-section" aria-labelledby="all-notes-title"><div class="notes-section-heading notes-directory-heading"><h2 id="all-notes-title">Все ноты</h2><label class="notes-search">'+icon('search')+'<span class="sr-only">Поиск ноты</span><input id="note-search" type="search" placeholder="Поиск" autocomplete="off"></label></div><p class="sr-only" id="notes-results-count" role="status" aria-live="polite"></p><div class="note-preview-grid" id="note-preview-grid">'+noteVisuals.map(notePreviewCard).join('')+'</div><nav class="note-pagination" id="note-pagination" aria-label="Страницы списка нот"></nav></section></main>';
}
function journalPage() {
 return '<main id="main" class="container">'+pageHeading('Журнал','О людях, материалах и маленьких открытиях в мире парфюмерии.')+'<div class="journal-grid">'+stories.map(storyCard).join('')+'</div></main>';
}
function articlePage() {
 const s=stories.find(s=>s.id===query.get('id'));
 if(!s)return notFound('Материал не найден','journal.html','Вернуться в журнал');
 document.title=s.title+' · aroma:me';
 return '<main id="main" class="container"><article class="article"><header class="article-title">'+breadcrumb('Журнал')+'<div class="story-meta"><span>'+s.category+'</span><span>'+s.time+'</span></div><h1>'+s.title+'</h1></header><img class="article-cover" src="'+asset(s.image)+'" alt="'+s.title+'"><div class="article-body"><p>'+s.intro+'</p>'+s.sections.map(([h,t])=>'<h2>'+h+'</h2><p>'+t+'</p>').join('')+'<p class="callout">Описания помогают ориентироваться, но не заменяют знакомство с ароматом на коже. Восприятие запаха индивидуально.</p>'+buttonLink('Исследовать ароматы','catalog.html')+'<p class="notice">Редакционный материал для демонстрации сайта.</p></div></article><section class="section"><div class="section-head"><h2>Продолжить читать</h2><a class="text-link" href="journal.html">В журнал '+icon('arrow')+'</a></div><div class="notes-grid">'+stories.filter(x=>x.id!==s.id).slice(0,3).map(storyCard).join('')+'</div></section></main>';
}
function noteVisualComposition(p) {
 const seen=new Set();
 const pictured=allNotes(p).map(name=>noteVisuals.find(note=>normalized(note.name)===normalized(name))).filter(note=>{
  if(!note||seen.has(note.id))return false;
  seen.add(note.id);return true;
 }).slice(0,5);
 if(pictured.length<2)return '';
 return '<section class="section perfume-note-visuals" aria-labelledby="perfume-note-visuals-title"><div class="section-head"><div><h2 id="perfume-note-visuals-title">Ноты крупным планом</h2><p>Несколько нот этого аромата. Полный заявленный список - ниже.</p></div></div><div class="perfume-note-visual-grid">'+pictured.map(note=>'<a href="notes.html?id='+encodeURIComponent(note.id)+'">'+notePreviewPhoto(note)+'<span>'+esc(note.name)+'</span></a>').join('')+'</div></section>';
}
function perfumeSeasonSection(p) {
 const scores=p.seasonScores||{};
 const seasons=['Весна','Лето','Осень','Зима'].filter(name=>Number.isFinite(scores[name]));
 if(!seasons.length)return '';
 return '<section class="section perfume-seasons" aria-labelledby="perfume-seasons-title"><div class="section-head"><div><h2 id="perfume-seasons-title">Время года</h2><p>Оценки сезонности из исходной базы. В фильтре аромат относится к сезону с наибольшим значением. При равенстве - к нескольким.</p></div></div><div class="perfume-season-grid">'+seasons.map(name=>'<div class="perfume-season'+(p.seasons?.includes(name)?' perfume-season-best':'')+'"><div class="perfume-season-label"><span>'+name+'</span><strong>'+scores[name].toLocaleString('ru-RU',{maximumFractionDigits:2})+'%</strong></div><div class="perfume-season-track"><span style="width:'+Math.max(0,Math.min(100,scores[name]))+'%"></span></div></div>').join('')+'</div></section>';
}
function perfumeNotePhases(p, labels=['Верхние ноты','Ноты сердца','Базовые ноты']) {
 const parts=[p.top||[],p.heart||[],p.base||[]];
 if(!parts.some(list=>list.length))return [['Ноты',p.notes||[]]];
 const pyramidNotes=new Set(parts.flat());
 const other=(p.notes||[]).filter(name=>!pyramidNotes.has(name));
 return [...parts.map((list,index)=>[labels[index],list]),...(other.length?[['Другие заявленные ноты',other]]:[])];
}
function sauvagePerfumePage(p) {
 document.title=p.name+' · '+p.brand+' · aroma:me';
 const brandUrl='catalog.html?brand='+encodeURIComponent(p.brand);
 const accents=[['свежий пряный',100],['амбровый',70.93],['цитрусовый',69.43],['фужерный',63.68],['мускусный',57.49],['древесный',54.47],['лаванда',46.63],['травяной',45.73],['теплый пряный',45.35]];
 const notePhotos={
  'Калабрийский бергамот':'assets/note-concepts/bergamot-macro.webp',
  'Перец':'assets/note-concepts/pepper-macro.png',
  'Лаванда':'assets/note-concepts/lavender-macro.webp'
 };
 const family=p.group ? p.group.charAt(0).toLocaleUpperCase('ru-RU')+p.group.slice(1) : '';
 const facts=[['Год',p.year],['Для кого','Мужской'],['Семейство',family],['Парфюмер',p.perfumer]].filter(([,value])=>value);
 const score=p.seasonScores||{};
 const seasons=['Весна','Лето','Осень','Зима'].filter(name=>Number.isFinite(score[name]));
 const phases=perfumeNotePhases(p);
 const related=perfumes.filter(x=>x.brand===p.brand&&x.id!==p.id).sort((a,b)=>(b.popularity??-1)-(a.popularity??-1)).slice(0,4);
 const previewOffers=[
  {shop:'ЛЭТУАЛЬ',className:'letu',price:18990},
  {shop:'Randewoo',className:'randewoo',price:16490},
  {shop:'Золотое Яблоко',className:'goldapple',price:14990}
 ].sort((a,b)=>b.price-a.price);
 return [
  '<main id="main" class="container sauvage-page">',
  '<div class="sauvage-heading"><nav class="breadcrumb" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span>/</span><a href="brands.html">Бренды</a><span>/</span><a href="'+brandUrl+'">'+esc(p.brand)+'</a><span>/</span><span aria-current="page">'+esc(p.name)+'</span></nav></div>',
  '<section class="sauvage-overview" aria-labelledby="sauvage-title">',
   '<div class="sauvage-bottle"><img src="'+esc(p.image)+'" alt="Флакон '+esc(p.brand+' '+p.name)+'"></div>',
   '<div class="sauvage-content">',
    '<div class="sauvage-intro"><div class="sauvage-identity"><a class="sauvage-brand" href="'+brandUrl+'">'+esc(p.brand)+'</a><h1 id="sauvage-title">'+esc(p.name)+'</h1></div><div class="sauvage-facts">'+facts.map(([label,value])=>'<div><span>'+label+'</span><strong>'+esc(value)+'</strong></div>').join('')+'</div></div>',
    '<section class="sauvage-accords"><div class="sauvage-section-heading"><h2>Основные аккорды</h2><span>По выраженности</span></div><ol class="sauvage-accord-list" aria-label="Аккорды по убыванию выраженности">'+accents.map(([name,score])=>'<li><span class="sauvage-accord-name">'+esc(name)+'</span><span class="sauvage-accord-track" aria-hidden="true"><span style="width:'+score+'%"></span></span></li>').join('')+'</ol></section>',
    '<section class="sauvage-notes" aria-label="Ноты аромата"><div class="sauvage-note-phases">'+phases.filter(([,notes])=>notes.length).map(([title,notes])=>'<div class="sauvage-note-phase"><h2>'+title+'</h2><ul>'+notes.map(name=>'<li><a href="'+noteEntryUrl({name})+'"><span>'+esc(name)+'</span>'+(notePhotos[name]?'<img src="'+notePhotos[name]+'" alt="" loading="lazy">':'')+'</a></li>').join('')+'</ul></div>').join('')+'</div></section>',
    '<div class="sauvage-actions"><button class="button" data-compare="'+p.id+'" aria-pressed="'+compareIds.includes(p.id)+'">'+icon('compare')+'<span>Добавить к сравнению</span></button><button class="button secondary sauvage-save" data-save="'+p.id+'" aria-pressed="'+favorites.includes(p.id)+'" title="В избранное">'+icon('heart')+'</button></div>',
   '</div>',
  '</section>',
  '<section class="sauvage-purchase" aria-labelledby="sauvage-purchase-title"><div class="sauvage-purchase-heading"><h2 id="sauvage-purchase-title">Где купить</h2><span>Макет - цены условные</span></div><ol class="sauvage-purchase-offers" aria-label="Магазины по убыванию цены">'+previewOffers.map(offer=>'<li><span class="sauvage-shop-logo sauvage-shop-logo-'+offer.className+'"><img src="assets/store-logos/'+offer.className+'.png" alt="" width="34" height="34"><span>'+esc(offer.shop)+'</span></span><strong>'+offer.price.toLocaleString('ru-RU')+' ₽</strong></li>').join('')+'</ol></section>',
  seasons.length?'<section class="sauvage-lower"><div class="sauvage-section-heading"><h2>Время года</h2><span>Оценки из исходной базы</span></div><div class="sauvage-season-grid">'+seasons.map(name=>'<div><div class="sauvage-season-label"><span>'+name+'</span><strong>'+score[name].toLocaleString('ru-RU',{maximumFractionDigits:2})+'%</strong></div><div class="sauvage-season-track"><span style="width:'+score[name]+'%"></span></div></div>').join('')+'</div></section>':'',
  '<p class="sauvage-source">Ноты и сезонные оценки взяты из исходной базы. Изображения показывают несколько заявленных нот, а не точный состав жидкости. <a href="'+esc(p.sourceUrl)+'" target="_blank" rel="noopener noreferrer">Исходная карточка</a></p>',
  related.length?'<section class="sauvage-lower"><div class="sauvage-section-heading"><h2>Еще у '+esc(p.brand)+'</h2><a class="text-link" href="'+brandUrl+'">Все ароматы '+icon('arrow')+'</a></div><div class="product-grid">'+related.map(productCard).join('')+'</div></section>':'',
  '</main>'
 ].join('');
}
function perfumePage() {
 const p=getPerfume(query.get('id'));
 if(!p)return notFound('Аромат не найден','catalog.html','Вернуться в каталог');
 if(p.id==='csv-31861')return sauvagePerfumePage(p);
 if(p.imported)return importedPerfumePage(p);
 document.title=p.name+' · '+p.brand+' · aroma:me';
 const similar=perfumes.filter(x=>x.id!==p.id).sort((a,b)=>b.tags.filter(t=>p.tags.includes(t)).length-a.tags.filter(t=>p.tags.includes(t)).length).slice(0,4);
 const phases=perfumeNotePhases(p,['Первое впечатление','Сердце','Основа']);
 return '<main id="main" class="container"><div class="page-heading" style="padding-bottom:0">'+breadcrumb(p.name)+'</div><section class="perfume-hero"><div class="perfume-visual"><img src="'+esc(p.image)+'" alt="'+esc(p.brand+' '+p.name)+'"><button class="icon-button save" data-save="'+p.id+'" aria-label="Добавить в избранное" aria-pressed="'+favorites.includes(p.id)+'">'+icon('heart')+'</button></div><div class="perfume-info"><a class="brand" href="catalog.html?brand='+encodeURIComponent(p.brand)+'">'+esc(p.brand)+'</a><h1>'+esc(p.name)+'</h1><div class="chips">'+p.tags.map(t=>'<span class="chip">'+t+'</span>').join('')+'</div><p>'+p.description+'</p><div class="action-row"><button class="button" data-compare="'+p.id+'">'+icon('compare')+'<span>Добавить к сравнению</span></button><a class="button secondary" href="#shops">Где купить '+icon('arrow')+'</a></div><div class="perfume-meta"><div><span>Год</span><strong>'+p.year+'</strong></div><div><span>Направление</span><strong>'+p.group+'</strong></div></div></div></section>'+perfumeSeasonSection(p)+noteVisualComposition(p)+'<section class="section"><div class="section-head"><h2>Из чего складывается впечатление</h2></div><div class="note-pyramid">'+phases.filter(([,list])=>list.length).map(([title,list])=>'<div><h3>'+title+'</h3>'+noteTags(list)+'</div>').join('')+'</div><p class="notice">Ноты и год взяты из вашей локальной базы. <a class="text-link" target="_blank" rel="noopener noreferrer" href="'+p.sourceUrl+'">Исходная карточка '+icon('arrow')+'</a></p></section><section class="section perfume-reading"><div><h3>Если представить этот запах</h3><p>'+p.feeling+'</p></div><div><h3>Важно услышать самому</h3><p>Это образное описание, а не обещание одинакового звучания на каждом человеке. Попробуйте аромат на коже и вернитесь к нему спустя время.</p></div></section><section class="section"><div class="section-head"><h2>Исследовать рядом</h2><a class="text-link" href="catalog.html">Все ароматы '+icon('arrow')+'</a></div><div class="product-grid">'+similar.map(productCard).join('')+'</div><p class="notice">Соседние ароматы выбраны по общим характеристикам. Это не результат RAG-подбора.</p></section><section class="section" id="shops"><div class="section-head"><div><h2>Где искать аромат</h2><p>Выберите магазин и проверьте наличие нужного объёма и концентрации.</p></div></div><div class="shop-grid">'+[['Золотое Яблоко','https://goldapple.ru/'],['Лэтуаль','https://www.letu.ru/'],['Рандеву','https://randewoo.ru/']].map(([name,url])=>'<div class="shop"><h3>'+name+'</h3><p>Поиск: '+esc(p.brand+' '+p.name)+'</p><a class="text-link" target="_blank" rel="noopener noreferrer" href="'+url+'">Открыть магазин '+icon('arrow')+'</a></div>').join('')+'</div><p class="notice">В прототипе нет загрузки цен, проверки наличия и партнёрских ссылок. Мы не продаём аромат сами.</p></section></main>';
}
function importedPerfumePage(p) {
 document.title=p.name+' · '+p.brand+' · aroma:me';
 const brandUrl='catalog.html?brand='+encodeURIComponent(p.brand);
 const phases=perfumeNotePhases(p);
 const meta=[['Год',p.year],['Направление',p.group],['Парфюмер',p.perfumer],['Концентрация',p.concentration]].filter(([,value])=>value);
 const related=perfumes.filter(x=>x.brand===p.brand&&x.id!==p.id).sort((a,b)=>(b.popularity??-1)-(a.popularity??-1)).slice(0,4);
 return '<main id="main" class="container"><div class="page-heading" style="padding-bottom:0"><nav class="breadcrumb" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span>/</span><a href="brands.html">Бренды</a><span>/</span><a href="'+brandUrl+'">'+esc(p.brand)+'</a><span>/</span><span aria-current="page">'+esc(p.name)+'</span></nav></div><section class="perfume-hero"><div class="perfume-visual"><img src="'+esc(p.image)+'" alt="'+esc(p.brand+' '+p.name)+'"><button class="icon-button save" data-save="'+p.id+'" aria-label="Добавить в избранное" aria-pressed="'+favorites.includes(p.id)+'">'+icon('heart')+'</button></div><div class="perfume-info"><a class="brand" href="'+brandUrl+'">'+esc(p.brand)+'</a><h1>'+esc(p.name)+'</h1><div class="chips">'+p.tags.map(t=>'<span class="chip">'+esc(t)+'</span>').join('')+'</div><div class="action-row" style="margin-top:28px"><button class="button" data-compare="'+p.id+'">'+icon('compare')+'<span>Добавить к сравнению</span></button></div>'+(meta.length?'<div class="perfume-meta" style="flex-wrap:wrap">'+meta.map(([label,value])=>'<div><span>'+label+'</span><strong>'+esc(value)+'</strong></div>').join('')+'</div>':'')+'</div></section>'+perfumeSeasonSection(p)+'<section class="section"><div class="section-head"><h2>Ноты аромата</h2></div><div class="note-pyramid">'+phases.filter(([,notes])=>notes.length).map(([title,notes])=>'<div><h3>'+title+'</h3>'+noteTags(notes)+'</div>').join('')+'</div>'+(allNotes(p).length?'':'<p>Список нот пока не указан.</p>')+'</section>'+(related.length?'<section class="section"><div class="section-head"><h2>Ещё у '+esc(p.brand)+'</h2><a class="text-link" href="'+brandUrl+'">Все ароматы '+icon('arrow')+'</a></div><div class="product-grid">'+related.map(productCard).join('')+'</div></section>':'')+'</main>';
}
function comparePage() {
 const a=getPerfume(query.get('a'))||getPerfume(compareIds[0])||perfumes[0], b=getPerfume(query.get('b'))||getPerfume(compareIds[1])||perfumes[1];
 return '<main id="main" class="container">'+pageHeading('Аромат рядом с ароматом','Смотрите на различия в характере и нотах, а не только на знакомые названия.')+'<div class="compare-selects"><div><label class="field-label" for="compare-a">Первый аромат</label><select id="compare-a">'+perfumes.map(p=>'<option value="'+p.id+'" '+(p.id===a.id?'selected':'')+'>'+esc(p.brand+' · '+p.name)+'</option>').join('')+'</select></div><div><label class="field-label" for="compare-b">Второй аромат</label><select id="compare-b">'+perfumes.map(p=>'<option value="'+p.id+'" '+(p.id===b.id?'selected':'')+'>'+esc(p.brand+' · '+p.name)+'</option>').join('')+'</select></div></div><div id="comparison"></div><p class="notice">Сравнивайте направления и заявленные ноты ароматов.</p></main>';
}
function comparison(a,b) {
 const common=allNotes(a).filter(n=>allNotes(b).some(x=>normalized(x)===normalized(n)));
 const row=(label,va,vb)=>'<div class="compare-row"><strong>'+label+'</strong><div>'+va+'</div><div>'+vb+'</div></div>';
 return '<div class="compare-head">'+[a,b].map(p=>'<div><img src="'+esc(p.image)+'" alt="'+esc(p.name)+'"><p class="product-brand">'+esc(p.brand)+'</p><h2>'+esc(p.name)+'</h2><a class="text-link" href="'+perfumeUrl(p)+'">Открыть аромат '+icon('arrow')+'</a></div>').join('')+'</div>'+
 row('Характер',a.tags.map(esc).join(' · '),b.tags.map(esc).join(' · '))+row('Впечатление',esc(a.description||a.group||'-'),esc(b.description||b.group||'-'))+((a.feeling||b.feeling)?row('Знакомый образ',esc(a.feeling||'-'),esc(b.feeling||'-')):'')+row('Ноты',noteTags(allNotes(a)),noteTags(allNotes(b)))+row('Год',a.year||'-',b.year||'-')+
 '<div class="compare-summary"><h3>'+(a.id===b.id?'Вы выбрали один и тот же аромат':common.length?'Есть общие ноты. Но это не всё.':'Разные отправные точки')+'</h3><p>'+(a.id===b.id?'Выберите второй аромат в списке выше, чтобы увидеть различия.':common.length?'В обеих композициях встречаются '+common.join(', ')+'. Их окружение и пропорции различаются, поэтому совпадение нот не означает одинаковое звучание.':'В заявленных списках нот нет точных совпадений. Ориентируйтесь на характер и образ, а не только на перечень компонентов.')+'</p></div>';
}
const quizQuestions=[
 {title:'Какое ощущение вам ближе?',text:'Выберите направление, которое хочется носить.', options:[['fresh','Свежесть','Цитрусы, зелень, воздух','leaf'],['flower','Мягкие цветы','Лепестки и нежность','flower'],['wood','Сухое дерево','Кожа, древесина, фактура','book'],['sweet','Тёплая сладость','Фрукты, ваниль, амбра','sun'],['clean','Чистота','Ткань, мускус, свет','sun']]},
 {title:'Для какого момента?',text:'Это поможет расставить акценты, а не ограничить ваш выбор.',options:[['daily','На каждый день','Спокойное знакомство с ароматом','sun'],['evening','Для особенного вечера','Более яркое настроение','moon'],['explore','Хочу новое','Можно выйти за привычные границы','leaf']]},
 {title:'Что точно не хочется?',text:'У всех свои границы комфорта.',options:[['no-sweet','Много сладости','Предпочитаю суше и свежее','leaf'],['no-wood','Выраженное дерево','Мне ближе другие направления','flower'],['any','Готов попробовать всё','Без дополнительных ограничений','plus']]}
];
let quizStep=0, quizAnswers=[];
function selectionPage() {
 return '<main id="main" class="container">'+pageHeading('Начнём с ощущения','Три вопроса, чтобы найти первое направление. Без сложных терминов.')+'<div class="quiz" id="quiz"></div></main>';
}
function renderQuiz() {
 const root=$('#quiz'); if(!root)return;
 if(quizStep===3) {
  const results=perfumes.map(p=>({p,score:(p.mood===quizAnswers[0]?6:0)+(quizAnswers[1]==='evening'&&p.mood==='sweet'?1:0)+(quizAnswers[1]==='daily'&&['fresh','clean','flower'].includes(p.mood)?1:0)-(quizAnswers[2]==='no-sweet'&&p.tags.includes('Сладкий')?8:0)-(quizAnswers[2]==='no-wood'&&p.tags.includes('Древесный')?8:0)})).sort((a,b)=>b.score-a.score).slice(0,3).map(x=>x.p);
  root.innerHTML='<div class="section-head"><div><h2>Ваше первое направление</h2><p>Начните знакомство с этих ароматов и сравните, что откликается.</p></div></div><div class="product-grid quiz-results">'+results.map(productCard).join('')+'</div><p class="notice">Это подбор по выбранным характеристикам из семи примеров, без ИИ. Сходство не гарантируется: попробуйте ароматы на коже.</p><div style="margin-top:30px"><button class="button secondary" data-quiz-restart>Пройти ещё раз '+icon('left')+'</button></div>';
  syncSaved(); return;
 }
 const q=quizQuestions[quizStep];
 root.innerHTML='<div class="quiz-progress" aria-label="Шаг '+(quizStep+1)+' из 3">'+quizQuestions.map((_,i)=>'<span class="'+(i<=quizStep?'done':'')+'"></span>').join('')+'</div><div class="quiz-question"><h2>'+q.title+'</h2><p>'+q.text+'</p><div class="quiz-options">'+q.options.map(([id,t,s,ico])=>'<button class="quiz-option '+(quizAnswers[quizStep]===id?'selected':'')+'" data-quiz-answer="'+id+'" aria-pressed="'+(quizAnswers[quizStep]===id)+'"><span class="round">'+icon(ico)+'</span><span><strong>'+t+'</strong><small>'+s+'</small></span></button>').join('')+'</div><div class="quiz-actions"><button class="button secondary" data-quiz-back '+(quizStep===0?'disabled':'')+'>'+icon('left')+'Назад</button><button class="button" data-quiz-next '+(!quizAnswers[quizStep]?'disabled':'')+'>'+(quizStep===2?'Посмотреть ароматы':'Дальше')+icon('arrow')+'</button></div></div>';
}
function favoritesPage() {
 return '<main id="main" class="container">'+pageHeading('Ваши ароматы','Сохранённое остаётся в этом браузере. Можно вернуться и рассмотреть всё рядом.')+'<div class="product-grid" id="favorites-grid"></div></main>';
}
function notFound(title,url,label) { return '<main id="main" class="container">'+pageHeading(title)+'<div class="empty"><p>В этой версии такой страницы пока нет.</p>'+buttonLink(label,url)+'</div></main>' }
const renderers={index:home,catalog,brands:brandsPage,notes:notesPage,journal:journalPage,article:articlePage,perfume:perfumePage,compare:comparePage,selection:selectionPage,favorites:favoritesPage};
function renderSite() {
$('#app').innerHTML=header()+(renderers[page]||home)()+footer()+
 '<dialog class="dialog" id="search-dialog" aria-labelledby="search-title"><div class="dialog-heading"><h2 id="search-title">Что ищем?</h2><button class="icon-button" data-close-search aria-label="Закрыть поиск">'+icon('close')+'</button></div>'+searchForm('global-search')+'<p>Ищите по названию, бренду или ноте. Например, «сандал» или «Byredo».</p></dialog><div class="toast" role="status" aria-live="polite" hidden></div><a class="compare-dock" href="compare.html" hidden>'+icon('compare')+'<span></span>'+icon('arrow')+'</a>';
// Keep the desktop composition while offering the approved mobile entry point.
if(page==='index' && !document.body.classList.contains('concept-page')) $('#main').insertAdjacentHTML('afterbegin',mobileHome());
}
let toastTimer;
function toast(message) { const el=$('.toast'); el.textContent=message; el.hidden=false; clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.hidden=true,3200) }
function syncSaved() {
 $$('[data-save]').forEach(b=>{ const active=favorites.includes(b.dataset.save); b.classList.toggle('selected',active); b.setAttribute('aria-pressed',String(active)); b.setAttribute('aria-label',(active?'Убрать из избранного: ':'Добавить в избранное: ')+(getPerfume(b.dataset.save)?.name||'')); if(b.classList.contains('sauvage-save'))b.title=active?'Убрать из избранного':'В избранное'; });
 const badge=$('.favorite-count'); badge.textContent=favorites.length; badge.hidden=!favorites.length;
 $$('[data-compare]').forEach(b=>{ const active=compareIds.includes(b.dataset.compare); b.setAttribute('aria-pressed',String(active)); const span=$('span',b); if(span)span.textContent=active?'В сравнении':'Добавить к сравнению'; if(b.classList.contains('product-compare'))b.innerHTML=icon(active?'check':'plus')+'<span>'+(active?'В сравнении':'Сравнить')+'</span>'; });
 const dock=$('.compare-dock'); dock.hidden=!compareIds.length || page==='compare'; $('span',dock).textContent='Сравнить · '+compareIds.length+' из 2';
}
function renderFavorites() {
 const root=$('#favorites-grid'); if(!root)return;
 root.innerHTML=favorites.length?perfumes.filter(p=>favorites.includes(p.id)).map(productCard).join(''):'<div class="empty"><h2>Здесь будет ваша коллекция</h2><p>Нажмите на сердечко рядом с ароматом, чтобы сохранить его.</p>'+buttonLink('Посмотреть ароматы','catalog.html')+'</div>';
 syncSaved();
}
let selectedMood=query.get('mood')||'';
let catalogLimit=30;
let notePage=Math.max(1,Number(query.get('page'))||1);
const notePageSize=30;
function renderNoteDirectory() {
 const root=$('#note-preview-grid'); if(!root)return;
 const search=$('#note-search');
 const text=normalized(search.value);
 const results=noteVisuals.filter(note=>!text||normalized(note.name).includes(text));
 const known=text&&noteDirectory.some(note=>normalized(note.name).includes(text));
 const pages=Math.ceil(results.length/notePageSize);
 notePage=Math.min(Math.max(1,Math.floor(notePage)),Math.max(1,pages));
 const visible=results.slice((notePage-1)*notePageSize,notePage*notePageSize);
 root.innerHTML=visible.length?visible.map(notePreviewCard).join(''):'<p class="note-directory-empty">'+(known?'Нота есть в базе, но изображение для неё пока не подготовлено.':'Нота не найдена. Попробуйте другое название.')+'</p>';
 $('#note-pagination').innerHTML=pages>1?'<button type="button" class="note-page-button" data-note-page="'+(notePage-1)+'" aria-label="Предыдущая страница"'+(notePage===1?' disabled':'')+'>'+icon('left')+'</button>'+Array.from({length:pages},(_,i)=>'<button type="button" class="note-page-button" data-note-page="'+(i+1)+'" aria-label="Страница '+(i+1)+'"'+(i+1===notePage?' aria-current="page"':'')+'>'+(i+1)+'</button>').join('')+'<button type="button" class="note-page-button" data-note-page="'+(notePage+1)+'" aria-label="Следующая страница"'+(notePage===pages?' disabled':'')+'>'+icon('arrow')+'</button>':'';
 $('#notes-results-count').textContent=text?'Найдено нот с изображениями: '+results.length:'';
 const url=new URL(location.href);
 search.value.trim()?url.searchParams.set('q',search.value.trim()):url.searchParams.delete('q');
 notePage>1?url.searchParams.set('page',String(notePage)):url.searchParams.delete('page');
 history.replaceState(null,'',url);
}
async function loadNoteDirectory() {
 if(!$('#popular-notes'))return;
 try {
  const response=await fetch('assets/data/note-directory.json?v=3');
  if(!response.ok)throw new Error('Note directory request failed');
  const directory=await response.json();
  noteDirectory=directory.notes;
  $('#popular-notes-title').parentElement.querySelector('p').textContent='Из '+Number(directory.perfumeCount).toLocaleString('ru-RU')+' ароматов каталога';
  $('#popular-notes').innerHTML=noteDirectory.slice(0,25).map(noteListEntry).join('');
  $('#popular-notes').setAttribute('aria-busy','false');
  renderNoteDirectory();
 } catch {
  $('#notes-results-count').textContent='Не удалось загрузить список популярных нот.';
  $('#popular-notes').setAttribute('aria-busy','false');
 }
}
function renderCatalog() {
 if(!$('#catalog-results'))return;
 const text=$('#catalog-search').value;
 const brand=query.get('brand')||'';
 const tagForMood={wood:'Древесный',flower:'Цветочный',sweet:'Сладкий',clean:'Чистый'};
 const results=perfumes.filter(p=>(!text||searchMatches(p,text))&&(!brand||p.brand===brand)&&(!selectedMood||p.mood===selectedMood||p.tags.includes(tagForMood[selectedMood]))).sort((a,b)=>(b.popularity??-1)-(a.popularity??-1)||a.name.localeCompare(b.name,'ru'));
 $('#catalog-count').textContent='Найдено: '+results.length;
 $('#catalog-results').innerHTML=results.length?results.slice(0,catalogLimit).map(productCard).join('')+(results.length>catalogLimit?'<div style="grid-column:1/-1;text-align:center"><button class="button secondary" data-catalog-more>Показать ещё</button></div>':''):'<div class="empty"><h2>Пока не нашли</h2><p>Попробуйте другое название, ноту или уберите фильтр.</p><button class="button secondary" data-reset-catalog>Сбросить поиск '+icon('left')+'</button></div>';
 syncSaved();
}
let activeSlide=0;
function setSlide(next) {
 const slides=$$('[data-slide]'); if(!slides.length)return;
 activeSlide=(next+slides.length)%slides.length;
 slides.forEach((s,i)=>{s.classList.toggle('active',i===activeSlide);s.setAttribute('aria-hidden',String(i!==activeSlide));s.tabIndex=i===activeSlide?0:-1});
 $$('[data-slide-to]').forEach((b,i)=>{b.classList.toggle('active',i===activeSlide);b.setAttribute('aria-pressed',String(i===activeSlide))});
 $('#slide-number').textContent=String(activeSlide+1).padStart(2,'0');
 $('.carousel-control').classList.toggle('light',slides[activeSlide].classList.contains('light'));
}
function updateComparison() {
 if(!$('#comparison'))return;
 const a=getPerfume($('#compare-a').value), b=getPerfume($('#compare-b').value);
 $('#comparison').innerHTML=comparison(a,b);
 compareIds=[...new Set([a.id,b.id])]; writeState('aromame-compare-v2',compareIds);
 const url=new URL(location.href);url.searchParams.set('a',a.id);url.searchParams.set('b',b.id);history.replaceState(null,'',url);
 syncSaved();
}
function bindSiteEvents() {
$$('.search-form input:not(#brand-search):not(#brand-catalog-search)').forEach(input=>{
 const suggestions=$('#'+input.id+'-suggestions');
 let searchRequest=0;
 const show=async()=>{
  const request=++searchRequest;
  const text=input.value.trim();
  if(!text){suggestions.hidden=true;input.setAttribute('aria-expanded','false');catalogIndex().catch(()=>{});return;}
  try {
   const results=(await catalogIndex()).filter(p=>searchMatches(p,text)).slice(0,4);
   if(request!==searchRequest || (document.activeElement!==input&&!suggestions.contains(document.activeElement)))return;
   suggestions.innerHTML=results.map(p=>'<button class="suggestion" type="button" data-search-result="'+esc(p.id)+'"><span>'+esc(p.name)+'</span><small>'+esc(p.brand)+'</small></button>').join('');
   suggestions.hidden=!results.length;input.setAttribute('aria-expanded',String(!!results.length));
  } catch {
   if(request===searchRequest){suggestions.hidden=true;input.setAttribute('aria-expanded','false');}
  }
 };
 input.addEventListener('input',()=>{show();if(input.id==='catalog-search'){catalogLimit=30;renderCatalog()}});
 input.addEventListener('focus',show);
 input.addEventListener('keydown',e=>{if(e.key==='Escape'){suggestions.hidden=true;input.setAttribute('aria-expanded','false')}if(e.key==='ArrowDown'&&!suggestions.hidden){e.preventDefault();$('button',suggestions)?.focus()}});
 suggestions.addEventListener('keydown',e=>{
  const buttons=$$('button',suggestions),i=buttons.indexOf(document.activeElement);
  if(e.key==='ArrowDown'){e.preventDefault();buttons[(i+1)%buttons.length]?.focus()}
  if(e.key==='ArrowUp'){e.preventDefault();i===0?input.focus():buttons[i-1]?.focus()}
  if(e.key==='Escape'){suggestions.hidden=true;input.focus()}
 });
 if(input.id==='catalog-search')input.closest('form').addEventListener('submit',e=>{
  e.preventDefault();renderCatalog();suggestions.hidden=true;
  const url=new URL(location.href); input.value?url.searchParams.set('q',input.value):url.searchParams.delete('q');history.replaceState(null,'',url);
 });
});
document.addEventListener('click',e=>{
 const b=e.target.closest('button,a'); if(!b)return;
 if(b.matches('[data-open-search]')){ $('#search-dialog').showModal(); $('#global-search').focus() }
 if(b.matches('[data-close-search]'))$('#search-dialog').close();
 if(b.matches('.mobile-menu')){ const open=$('.nav').classList.toggle('open'); b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню'); }
 if(b.dataset.searchResult)location.href='perfume.html?id='+encodeURIComponent(b.dataset.searchResult);
 if(b.dataset.save){
  const id=b.dataset.save, exists=favorites.includes(id);
  favorites=exists?favorites.filter(x=>x!==id):[...favorites,id];writeState('aromame-favorites-v2',favorites);
  renderFavorites();syncSaved();toast(exists?'Убрали из избранного':'Сохранили в вашу коллекцию');
 }
 if(b.dataset.compare){
  const id=b.dataset.compare;
  if(compareIds.includes(id))compareIds=compareIds.filter(x=>x!==id);
  else if(compareIds.length>=2){toast('В сравнении уже два аромата. Снимите один или замените его на странице сравнения.');return}
  else compareIds.push(id);
  writeState('aromame-compare-v2',compareIds);syncSaved();
 }
 if(b.matches('[data-slide-next]'))setSlide(activeSlide+1);
 if(b.matches('[data-slide-prev]'))setSlide(activeSlide-1);
 if(b.matches('[data-slide-to]'))setSlide(Number(b.dataset.slideTo));
 if(b.matches('[data-catalog-more]')){catalogLimit+=30;renderCatalog();}
 if(b.matches('[data-note-page]')&&!b.disabled){notePage=Number(b.dataset.notePage);renderNoteDirectory();const list=$('#note-preview-grid');list.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});list.querySelector('a')?.focus({preventScroll:true})}
 if(b.matches('[data-mood]')){ catalogLimit=30;selectedMood=b.dataset.mood;$$('[data-mood]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderCatalog() }
 if(b.matches('[data-reset-catalog]')){selectedMood='';$('#catalog-search').value='';location.href='catalog.html'}
 if(b.matches('[data-quiz-answer]')){quizAnswers[quizStep]=b.dataset.quizAnswer;renderQuiz()}
 if(b.matches('[data-quiz-next]')&&quizAnswers[quizStep]){quizStep++;renderQuiz()}
 if(b.matches('[data-quiz-back]')&&quizStep>0){quizStep--;renderQuiz()}
 if(b.matches('[data-quiz-restart]')){quizStep=0;quizAnswers=[];renderQuiz()}
});
document.addEventListener('click',e=>{
 $$('.search-wrap').forEach(w=>{if(!w.contains(e.target)){const s=$('.search-suggestions',w);s.hidden=true;$('input',w).setAttribute('aria-expanded','false')}});
});
$('#search-dialog').addEventListener('click',e=>{if(e.target===$('#search-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});
$$('#compare-a,#compare-b').forEach(s=>s.addEventListener('change',updateComparison));
if($('#note-search')){$('#note-search').value=query.get('q')||'';$('#note-search').addEventListener('input',()=>{notePage=1;renderNoteDirectory()})}
$('.hero-carousel')?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();setSlide(activeSlide+1)}if(e.key==='ArrowLeft'){e.preventDefault();setSlide(activeSlide-1)}});
renderCatalog();loadNoteDirectory();renderFavorites();renderQuiz();updateComparison();syncSaved();
}
function startSite() {
 renderSite();
 if(page==='perfume') {
  const perfume=getPerfume(query.get('id'));
  const pyramid=$('.note-pyramid')?.closest('.section');
  if(perfume?.imported&&pyramid)pyramid.insertAdjacentHTML('beforebegin',noteVisualComposition(perfume));
 }
 bindSiteEvents();
 if(typeof initializeBrandCatalog==='function')initializeBrandCatalog();
}
if(['catalog','perfume','compare','favorites'].includes(page)) {
 $('#app').innerHTML='<main class="container section" aria-busy="true"><p role="status">Загружаем ароматы...</p></main>';
 loadCatalogForPage().then(startSite).catch(()=>{
  $('#app').innerHTML='<main class="container section"><h1>Каталог пока не загрузился</h1><p>Обновите страницу, чтобы попробовать ещё раз.</p><a class="button" href="'+esc(location.href)+'">Обновить страницу</a></main>';
 });
} else startSite();

