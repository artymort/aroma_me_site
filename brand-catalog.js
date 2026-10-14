'use strict';
// Brand pages and the full catalog share the same filtering behavior.
// Short, brand-specific editorial introductions checked against brand and
// parent-company histories. Keep the text separate from perfume search data.
const brandDescriptions = {
 'Acqua di Parma':'Итальянский дом Acqua di Parma начался с одеколона Colonia, созданного в 1916 году. Его парфюмерия сохраняет интерес к цитрусовой свежести и итальянскому ремеслу.',
 'Afnan':'Afnan - парфюмерный дом из ОАЭ, основанный Имраном Фазлани в 2007 году. Бренд соединяет ближневосточную традицию с современными композициями для международной аудитории.',
 'Al Haramain Perfumes':'История Al Haramain началась в 1970 году с торговли парфюмерией в Мекке и Медине. Сегодня семейный дом развивает арабскую парфюмерную традицию, включая уд и масляные духи.',
 'Amouage':'Amouage основан в Омане в 1983 году семьей Аль Бу Саид. Дом обращается к парфюмерному наследию региона, где особое место занимают ладан и мирра.',
 'Ariana Grande':'Парфюмерная коллекция Арианы Гранде продолжает ее музыкальный образ: каждый выпуск получает собственное настроение и оформление. В линейке есть Cloud, R.E.M. и серия LOVENOTES.',
 'Armaf':'Armaf - парфюмерная марка компании Sterling Perfumes из ОАЭ. Бренд выпускает мужские и женские композиции, а серия Club de Nuit стала его самой узнаваемой линией.',
 'Azzaro':'Парфюмерия Azzaro выросла из модного дома Лориса Аззаро. В коллекции соседствуют свежая линия Chrome и более насыщенные ароматы Wanted.',
 'Bath & Body Works':'Bath & Body Works специализируется на ароматах для тела и дома. Парфюмерные спреи, лосьоны и свечи позволяют носить любимый запах в разных форматах.',
 'BDK Parfums':'BDK Parfums - независимый парижский дом, созданный Давидом Бенедеком в 2016 году. Отправной точкой каждого аромата здесь становится материал, место или история.',
 'Bond No 9':'Bond No 9 появился в Нью-Йорке в 2003 году по инициативе Лорис Раме. Его ароматы посвящены районам, улицам и культурной жизни города.',
 'BORNTOSTANDOUT®':'Корейский дом BORNTOSTANDOUT основан Джуном Лимом в Сеуле в 2022 году. Бренд строит яркие парфюмерные истории вокруг индивидуальности и свободы самовыражения.',
 'Britney Spears':'Парфюмерная линия Бритни Спирс началась с Curious. Позднее коллекция Fantasy выросла в целое семейство сладких и фантазийных ароматов.',
 'Burberry':'Burberry переносит британскую эстетику модного дома в парфюмерию. В ароматах бренда встречаются как сдержанные повседневные композиции, так и более выразительные линии Her и Goddess.',
 'Bvlgari':'Итальянский ювелирный дом Bvlgari начал парфюмерную историю с Eau Parfumée au Thé Vert в 1992 году. Его ароматы часто обращаются к образам драгоценных камней и редких материалов.',
 'By Kilian':'Kilian Paris создан Килианом Хеннесси как дом современной нишевой парфюмерии. Бренд уделяет внимание насыщенным композициям и флаконам, которые можно пополнять.',
 'Byredo':'Byredo основан Беном Горэмом в Стокгольме в 2006 году. Воспоминания, эмоции и культурные образы становятся отправной точкой для ароматов дома.',
 'Calvin Klein':'Calvin Klein перенес минимализм американской моды в парфюмерию. Выпущенный в 1994 году CK One стал одним из самых известных ароматов, задуманных для всех без деления по полу.',
 'Carolina Herrera':'Каролина Эррера создала модный дом с узнаваемым образом элегантности Нью-Йорка. В парфюмерии бренда этот характер раскрывают классическая линия Herrera и более театральная Good Girl.',
 'Chanel':'Парфюмерная история Chanel началась с N°5 в 1921 году. Этот аромат стал символом дома, а его коллекция продолжила идеи Габриэль Шанель в разных парфюмерных направлениях.',
 'Chloé':'Модный дом Chloé основала Габи Агьон в Париже. Его парфюмерия продолжает мягкую, свободную женственность марки, особенно заметную в ароматах на основе розы.',
 'Clive Christian':'Clive Christian продолжает британскую традицию роскошной парфюмерии, связанную с историей Crown Perfumery. Корона на крышке каждого флакона отсылает к этому наследию.',
 'Comme des Garcons':'Японский модный дом Comme des Garcons выпускает парфюмерию с 1994 года. Его ароматы исследуют непривычные сочетания материалов и сохраняют экспериментальный дух марки.',
 'Creed':'История Creed связана с британским портновским ремеслом и французской высокой парфюмерией. Дом делает акцент на ручной работе и выразительных композициях из отобранных материалов.',
 "d'Annam":'d’Annam - парфюмерный дом из Вьетнама. Ароматы бренда обращаются к местной культуре, природным образам и знакомым ощущениям повседневной жизни.',
 'Demeter Fragrance':'Demeter Fragrance Library строит коллекцию вокруг узнаваемых запахов: дождя, земли, еды и цветов. Каждый аромат задуман как отдельная обонятельная зарисовка.',
 'Dior':'Первый аромат дома, Miss Dior, появился в 1947 году вместе с первой модной коллекцией Кристиана Диора. С тех пор парфюмерия остается частью истории Dior наряду с высокой модой.',
 'Diptyque':'Diptyque создали в Париже Десмонд Нокс-Лит, Кристиана Монтадр-Готро и Ив Куэслан. Дом начинал с предметов для интерьера и ароматических свечей, а затем занялся парфюмерией.',
 'Dolce&Gabbana':'Парфюмерия Dolce&Gabbana развивает сицилийские и средиземноморские образы итальянского модного дома. От свежей Light Blue до насыщенной The One коллекции показывают разные стороны этой эстетики.',
 'Elizabeth Arden':'Элизабет Арден стала одной из первых влиятельных предпринимательниц индустрии красоты в США. В парфюмерии ее имя особенно связано с линией Red Door.',
 'Essential Parfums':'Essential Parfums основала Жеральдин Аршамбо в 2018 году. Дом ставит в центр работы самих парфюмеров и дает каждому свободу раскрыть выбранный ингредиент.',
 "Etat Libre d'Orange":'Etat Libre d’Orange появился в Париже в 2006 году. Дом известен смелыми названиями и композициями, которые используют парфюмерию как способ рассказать неожиданную историю.',
 'Ex Nihilo':'Парижский дом Ex Nihilo основан в 2013 году тремя сооснователями. Он объединяет современную нишевую парфюмерию, художественные коллаборации и возможность персонализировать аромат.',
 'Filippo Sorcinelli':'Филиппо Сорчинелли работает на пересечении парфюмерии, музыки и искусства. До создания ароматов он основал ателье церковных облачений LAVS, и эта тема отражается в его коллекциях.',
 'Fragrance World':'Fragrance World вырос из парфюмерной торговли в районе Дейра в Дубае и ведет историю с 2004 года. Дом стремится сделать сложные парфюмерные идеи доступными широкой аудитории.',
 'French Avenue':'French Avenue - более экспериментальное направление группы Fragrance World. Марка делает ставку на выразительные композиции и самостоятельный визуальный язык нишевой парфюмерии.',
 'Giardini Di Toscana':'Giardini di Toscana вырос из семейной парфюмерной истории Сильвии Мартинелли в Тоскане. Коллекция соединяет местные воспоминания и современный взгляд на художественную парфюмерию.',
 'Giorgio Armani':'Парфюмерия Giorgio Armani продолжает сдержанную элегантность итальянского модного дома. Acqua di Gio, Si и My Way раскрывают эту эстетику в разных настроениях.',
 'Givenchy':'Hubert de Givenchy вывел дом в парфюмерию с ароматом L’Interdit. Сегодня коллекции Givenchy соединяют классическую французскую элегантность и смелые современные образы.',
 'Goldfield & Banks Australia':'Димитри Вебер создал Goldfield & Banks после знакомства с природой Австралии. Дом обращается к местным растениям и ландшафтам, переводя их в язык современной парфюмерии.',
 'Granado':'Granado начался как аптека в Рио-де-Жанейро в 1870 году. Парфюмерная коллекция марки сохраняет связь с бразильской природой, городами и историческими рецептами.',
 'Gucci':'Основанный во Флоренции дом Gucci обращается в парфюмерии к моде, цветам и фантазийным образам. Bloom, Guilty и The Alchemist’s Garden показывают разные стороны его характера.',
 'Guerlain':'Дом Guerlain существует в Париже с 1828 года. От Eau de Cologne Impériale до Shalimar его история связана с развитием самой французской парфюмерии.',
 'Hermès':'Hermès перенес культуру материалов и ремесла из кожевенного дела в парфюмерию. Ароматы дома рассказывают истории о путешествиях, садах и окружающем мире.',
 'Hugo Boss':'Парфюмерия Hugo Boss выросла из эстетики немецкого модного дома. Линии BOSS и HUGO предлагают разные взгляды на деловой стиль, свежесть и повседневную свободу.',
 'Imaginary Authors':'В Imaginary Authors каждый аромат оформлен как вымышленная книга со своим автором и сюжетом. Этот независимый дом из Портленда создал парфюмер Джош Мейер.',
 'Initio Parfums Prives':'Initio Parfums Privés исследует эмоциональное воздействие запаха. В коллекциях дома много внимания уделено мускусу, удовым материалам и насыщенному звучанию композиции.',
 'Issey Miyake':'Парфюмерная история Issey Miyake началась с L’Eau d’Issey в 1992 году. Идея воды, движения и простых природных форм остается важной для ароматов марки.',
 'Jean Paul Gaultier':'Парфюмерия Жан-Поля Готье продолжает дерзкий язык его моды. Флаконы в форме торса и линии Classique и Le Male стали узнаваемой частью этого мира.',
 'Jo Malone London':'Jo Malone London делает акцент на ясных сочетаниях ингредиентов и британской эстетике. Многие одеколоны дома созданы так, чтобы их можно было сочетать друг с другом.',
 'Juliette Has A Gun':'Романо Риччи создал Juliette Has A Gun как современное прочтение образа Джульетты. Дом играет с контрастом романтики и независимого характера, а Not a Perfume стал его знаковой работой.',
 'Kayali Fragrances':'Мона Каттан основала Kayali в 2018 году. Бренд вдохновлен ближневосточной привычкой наслаивать ароматы, поэтому композиции коллекции легко сочетать между собой.',
 'Kenzo':'Kenzo Parfums продолжает любовь модного дома к природе, цветам и поэтичным образам. Flower by Kenzo подарил собственный воображаемый запах маку, у которого нет природного аромата.',
 'Khadlaj Perfumes':'Khadlaj - дом из ОАЭ, работающий с 1997 года. Его коллекция объединяет традиционные арабские мотивы, современные духи и ароматы для дома.',
 "L'Artisan Parfumeur":'L’Artisan Parfumeur - французский дом, основанный парфюмером Жаном Лапортом. Он обращается к необычным материалам и образам природы, сохраняя ремесленный подход к ароматам.',
 'Lalique':'Lalique вырос из мира ювелирного искусства и художественного стекла Рене Лалика. В парфюмерии дом уделяет особое внимание как композиции, так и самому флакону.',
 'Lancôme':'Lancôme основал Арман Петижан в 1935 году, и ароматы были среди первых продуктов дома. Цветок розы остается одним из главных символов марки.',
 'Lattafa Perfumes':'Lattafa - семейный парфюмерный дом из ОАЭ. Он соединяет арабскую традицию с современными форматами и выпускает ароматы для самых разных вкусов.',
 'Le Labo':'Le Labo появился в Нью-Йорке в 2006 году. Дом строит ароматы вокруг ключевого ингредиента, а на этикетке отмечает место и дату подготовки флакона.',
 'Les Liquides Imaginaires':'Liquides Imaginaires превращает легенды и символические сюжеты в ароматы. Для этого дома история появляется раньше самой композиции и задает направление парфюмеру.',
 'Loewe':'Испанский дом Loewe вошел в парфюмерию в 1970-х годах. Его ароматы соединяют наследие кожевенного ремесла с интересом к ботанике и современному дизайну.',
 'Lorenzo Pazzaglia':'Лоренцо Паццалья создает итальянскую художественную парфюмерию как личный язык эмоций. Его дом PAX появился в 2021 году и выпускает яркие композиции высокой концентрации.',
 'Louis Vuitton':'Louis Vuitton создал первый аромат Heures d’Absence в 1927 году. Современная парфюмерная коллекция дома возвращает тему путешествий через материалы и впечатления от разных мест.',
 'Lush':'Lush известен свежей косметикой ручной работы и собственным взглядом на ингредиенты. Его парфюмерия продолжает эту философию в необычных ароматах и твердых форматах.',
 'Maison Alhambra':'Maison Alhambra - парфюмерная марка из ОАЭ, ориентированная на доступные выразительные композиции. В ее коллекции представлены разные направления от свежих до восточных.',
 'Maison Crivelli':'Тибо Кривелли создал Maison Crivelli вокруг неожиданных ощущений от природы и путешествий. Каждый аромат дома начинается с личного опыта, который затем переосмысляет парфюмер.',
 'Maison Francis Kurkdjian':'Франсис Кюркджян и Марк Шайя основали Maison Francis Kurkdjian в 2009 году. Дом соединяет авторскую работу парфюмера с французской традицией высокой парфюмерии.',
 'Maison Martin Margiela':'Парфюмерная линия Maison Margiela развивает идеи одноименного модного дома. Коллекция Replica воспроизводит ощущения от конкретных мест и памятных моментов.',
 'Mancera':'Mancera - парижский парфюмерный дом, черпающий сюжеты в путешествиях и встречах. Его коллекция охватывает как яркие фруктовые, так и густые восточные композиции.',
 'Marc Jacobs':'Marc Jacobs переносит игривость нью-йоркской моды в парфюмерию. Цветочный флакон Daisy стал одним из самых узнаваемых образов бренда.',
 'Marc-Antoine Barrois':'Кутюрье Марк-Антуан Барруа создает ароматы вместе с парфюмером Квентином Бишем. Их сотрудничество переводит личные истории и образы высокой моды в парфюмерные композиции.',
 'Matiere Premiere':'Парфюмер Орельен Гишар создал Matiere Premiere вокруг выразительности одного главного материала. Часть растений для ароматов он выращивает на собственных полях в Грассе.',
 'Memo Paris':'Для Memo Paris аромат - способ мысленно отправиться в путешествие. Дом посвящает композиции местам и маршрутам, соединяя их с яркими парфюмерными материалами.',
 'Mind Games':'Mind Games строит парфюмерный мир вокруг шахмат. Названия коллекций, флаконы и сами ароматы развивают идею стратегии, характера и игры.',
 'Montale':'Пьер Монталь основал свой парфюмерный дом в 2003 году после знакомства с материалами Ближнего Востока. Уд стал одной из главных тем его коллекции.',
 'Montblanc':'Montblanc начинал с письменных принадлежностей и сохранил внимание к ремеслу в других категориях. Парфюмерия марки развивает образ путешествий, достижений и современного стиля.',
 'Moschino':'Модный дом Moschino известен иронией и игрой с привычными формами. Его парфюмерия продолжает этот подход - от названий ароматов до флаконов Fresh Couture.',
 'Mugler':'Аромат Angel изменил представление о сладкой парфюмерии и стал важной частью мира Mugler. Позднее дом продолжил фантазийную эстетику в линиях Alien и других композициях.',
 'Narciso Rodriguez':'Для дизайнера Нарцисо Родригеса мускус стал личной парфюмерной подписью. В ароматах бренда он раскрывается в сочетании с цветами, древесиной и мягкими текстурами.',
 'Nasomatto':'Nasomatto - авторский проект парфюмера Алессандро Гуальтьери. Дом выпускает концентрированные, нарочито необычные композиции, среди которых Black Afgano и Baraonda.',
 'Natura':'Natura - бразильская косметическая марка, для которой природа и отношения с поставщиками стали частью идентичности. В парфюмерии она обращается к местным растениям и материалам.',
 'Nishane':'Nishane - нишевый парфюмерный дом из Стамбула. Его коллекции используют культурные истории города и смелые сочетания материалов.',
 'O Boticário':'O Boticário начался как бразильская аптечная марка и вырос в большой мир косметики и ароматов. Его парфюмерия обращается к природе и повседневной культуре Бразилии.',
 'Orto Parisi':'Алессандро Гуальтьери посвятил Orto Parisi своему деду Винченцо Паризи и его саду. Дом исследует телесные, природные и порой намеренно резкие стороны запаха.',
 'Parfums de Marly':'Parfums de Marly обращается к образу замка Марли и французской парфюмерной культуре XVIII века. Дом соединяет историческое вдохновение с современными насыщенными композициями.',
 'PARIS CORNER':'Paris Corner - парфюмерная марка из ОАЭ с широким набором коллекций. Она предлагает современные композиции разных направлений, от повседневных до насыщенных восточных.',
 "Penhaligon's":'История Penhaligon’s связана с парикмахером и парфюмером Уильямом Пенхалигоном, работавшим в Лондоне в 1870-х годах. Дом сохраняет британский характер и любовь к необычным историям.',
 'Phlur':'Phlur создает современные ароматы вокруг памяти и личных ощущений. В коллекции бренда запах становится способом выразить настроение, а не следовать привычным парфюмерным категориям.',
 'Prada':'Модный дом Prada основан в Милане в 1913 году. Его парфюмерия сочетает строгую форму и неожиданные акценты, от линии Infusion до более выразительных современных ароматов.',
 'Rabanne':'Первый аромат дома Rabanne, Calandre, вышел в 1969 году и соединил розу с металлическим звучанием. Смелость форм и материалов остается важной для парфюмерии марки.',
 'Ralph Lauren':'Парфюмерия Ralph Lauren развивает разные стороны американского стиля дома. Polo, Romance и Ralph’s Club создают собственные образы спорта, романтики и городской жизни.',
 'Rasasi':'Семейная история Rasasi началась с небольшого парфюмерного магазина в Дубае в 1979 году. Дом развивает арабскую традицию и выпускает ароматы для международной аудитории.',
 'Roja Dove':'Roja Dove - британский парфюмер, создавший собственный дом высокой парфюмерии. Его композиции строятся вокруг насыщенных материалов и внимания к деталям.',
 'Serge Lutens':'Серж Лютанс пришел в парфюмерию из мира фотографии, искусства и моды. Его авторские ароматы часто строятся как атмосферные истории, где привычные ноты звучат неожиданно.',
 'Sol de Janeiro':'Sol de Janeiro появился под впечатлением от пляжной жизни Рио-де-Жанейро. Теплые, радостные ароматы для тела продолжают бразильское настроение марки.',
 'Sospiro Perfumes':'Sospiro переводит язык классической музыки и оперы в парфюмерию. Дом строит ароматы как многослойные музыкальные произведения, а бархатные флаконы стали его знаком.',
 'Swiss Arabian':'Swiss Arabian появился в ОАЭ в 1974 году. Дом соединяет традиции арабской парфюмерии с современными композициями и европейским подходом к производству.',
 'Tiziana Terenzi':'Итальянский дом Tiziana Terenzi вырос из семейного ремесла и любви к путешествиям. Ароматы создают Тициана и парфюмер Паоло Теренци, превращая воспоминания в насыщенные композиции.',
 'Tom Ford':'Парфюмерия Tom Ford объединяет линии Signature и Private Blend. Дом известен смелой работой с насыщенными материалами и вниманием к выразительности каждого флакона.',
 'Valentino':'Valentino Beauty переносит эстетику римского модного дома в парфюмерию. Линии Born in Roma и Donna развивают тему индивидуальности через цвет, форму и контрасты.',
 'Van Cleef & Arpels':'Ювелирный дом Van Cleef & Arpels появился на парижской Вандомской площади в 1906 году. Коллекция Extraordinaire переносит внимание к редким материалам из украшений в парфюмерию.',
 'Versace':'Парфюмерия Versace продолжает яркую итальянскую эстетику модного дома. От свежих композиций до насыщенных вечерних ароматов марка сохраняет узнаваемый декоративный характер.',
 "Victoria's Secret":'Victoria’s Secret дополнил мир белья и ухода ароматами для тела и парфюмерией. Линия Bombshell и многочисленные спреи делают запах частью повседневного образа бренда.'
};
const brandLogoSlugs = {
 'Acqua di Parma':'acquadiparma', 'Afnan':'afnan', 'Amouage':'amouage',
 'Al Haramain Perfumes':'alharamain', 'Ariana Grande':'arianagrande',
 'Armaf':'armaf', 'Azzaro':'azzaro', 'Bvlgari':'bvlgari',
 'Bath & Body Works':'bathbodyworks', 'BDK Parfums':'bdkparfums',
 'Bond No 9':'bondno9', 'BORNTOSTANDOUT®':'borntostandout',
 'Britney Spears':'britneyspears', 'Burberry':'burberry',
 'By Kilian':'bykilian', 'Byredo':'byredo',
 'Calvin Klein':'calvinklein', 'Carolina Herrera':'carolinaherrera',
 'Chanel':'chanel', 'Chloé':'chloe', 'Clive Christian':'clivechristian',
 'Comme des Garcons':'commedesgarcons', 'Creed':'creed',
 "d'Annam":'dannam', 'Demeter Fragrance':'demeter', 'Dior':'dior',
 'Diptyque':'diptyque', 'Dolce&Gabbana':'dolcegabbana', 'Elizabeth Arden':'elizabetharden',
 "Etat Libre d'Orange":'etatlibredorange', 'Essential Parfums':'essentialparfums',
 'Ex Nihilo':'exnihilo',
 'Filippo Sorcinelli':'filipposorcinelli', 'French Avenue':'frenchavenue',
 'Fragrance World':'fragranceworld',
 'Giardini Di Toscana':'giardiniditoscana', 'Giorgio Armani':'giorgioarmani',
 'Givenchy':'givenchy', 'Goldfield & Banks Australia':'goldfieldbanks',
 'Gucci':'gucci',
 'Granado':'granado', 'Guerlain':'guerlain', 'Hermès':'hermes',
 'Hugo Boss':'hugoboss', 'Imaginary Authors':'imaginaryauthors',
 'Initio Parfums Prives':'initio',
 'Issey Miyake':'isseymiyake', 'Jean Paul Gaultier':'jeanpaulgaultier',
 'Jo Malone London':'jomalonelondon', 'Juliette Has A Gun':'juliettehasagun',
 'Kayali Fragrances':'kayali', 'Kenzo':'kenzo', 'Khadlaj Perfumes':'khadlaj',
 "L'Artisan Parfumeur":'lartisanparfumeur', 'Lalique':'lalique',
 'Lancôme':'lancome', 'Le Labo':'lelabo',
 'Les Liquides Imaginaires':'liquides',
 'Lattafa Perfumes':'lattafa', 'Matiere Premiere':'matierepremiere',
 'Loewe':'loewe', 'Lorenzo Pazzaglia':'lorenzopazzaglia',
 'Lush':'lush',
 'Mancera':'mancera', 'Marc Jacobs':'marcjacobs',
 'Marc-Antoine Barrois':'marcantoinebarrois',
 'Louis Vuitton':'louisvuitton', 'Maison Alhambra':'maisonalhambra',
 'Maison Crivelli':'maisoncrivelli',
 'Maison Francis Kurkdjian':'maisonfranciskurkdjian',
 'Maison Martin Margiela':'maisonmargiela', 'Moschino':'moschino',
 'Memo Paris':'memoparis', 'Mind Games':'mindgames',
 'Montale':'montale', 'Montblanc':'montblanc',
 'Mugler':'mugler',
 'Narciso Rodriguez':'narcisorodriguez', 'Nasomatto':'nasomatto',
 'Natura':'natura', 'Nishane':'nishane', 'O Boticário':'oboticario',
 'Orto Parisi':'ortoparisi',
 'PARIS CORNER':'pariscorner', 'Parfums de Marly':'parfumsdemarly',
 "Penhaligon's":'penhaligons', 'Phlur':'phlur', 'Prada':'prada', 'Rabanne':'rabanne',
 'Ralph Lauren':'ralphlauren', 'Rasasi':'rasasi', 'Roja Dove':'rojalondon',
 'Serge Lutens':'sergelutens', 'Sol de Janeiro':'soldejaneiro',
 'Sospiro Perfumes':'sospiro', 'Swiss Arabian':'swissarabian',
 'Tiziana Terenzi':'tizianaterenzi', 'Tom Ford':'tomford',
 'Valentino':'valentino', 'Van Cleef & Arpels':'vancleef',
 'Versace':'versace', "Victoria's Secret":'victoriassecret'
};
function brandCatalogDescription(brand) {
 return brandDescriptions[brand] || 'История бренда пока не добавлена.';
}
function brandCatalogTemplate(brand) {
 const hasPerfumes=perfumes.some(p=>p.brand===brand);
 const logo=brandLogoSlugs[brand];
 const mark=logo ? '<img class="brand-about-logo brand-about-logo-'+logo+'" src="assets/brand-logos/'+logo+'.svg" alt="'+esc(brand)+'" width="160" height="64">' : '<span class="brand-about-name">'+esc(brand)+'</span>';
 const sortChoices=[['popular','Популярные'],['name','По названию'],['new','Сначала новые'],['old','Сначала ранние']];
 return '<main id="main" class="container brand-catalog'+(hasPerfumes?'':' brand-catalog-no-filters')+'">'+
  '<div class="page-heading"><nav class="breadcrumb" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span aria-hidden="true">/</span><a href="brands.html">Бренды</a><span aria-hidden="true">/</span><span aria-current="page">'+esc(brand)+'</span></nav></div>'+
  '<div class="brand-catalog-layout"><div class="brand-catalog-sidebar"><h1 class="brand-catalog-title">'+esc(brand).replace(/&amp;/g,'&amp;<wbr>')+'</h1>'+(hasPerfumes?'<details class="brand-filter-panel"'+(matchMedia('(min-width:761px)').matches?' open':'')+'><summary>Фильтры <span id="brand-filter-total"></span>'+icon('plus')+'</summary><div class="brand-filter-content"><div class="brand-filter-heading"><h2>Фильтры</h2><button type="button" data-brand-catalog-reset hidden>Сбросить</button></div>'+[['gender','Пол'],['note','Ноты'],['mood','Характер аромата'],['season','Время года'],['year','Год выпуска']].map(([key,label])=>'<details class="brand-filter-group" data-brand-group="'+key+'" open><summary>'+label+icon('plus')+'</summary>'+(key==='note'?'<label class="brand-facet-search"><span class="sr-only">Найти ноту в фильтре</span><input id="note-facet-search" type="search" placeholder="Найти ноту" autocomplete="off"></label>':'')+'<div data-brand-facet="'+key+'"></div>'+(key==='note'||key==='year'?'<button class="brand-filter-more" type="button" data-brand-more="'+key+'" hidden></button>':'')+'</details>').join('')+'</div></details>':'')+'</div>'+
  '<section class="brand-catalog-content" aria-label="Ароматы '+esc(brand)+'"><div class="brand-about"><div class="brand-about-mark">'+mark+'</div><p id="brand-about-description">'+esc(brandCatalogDescription(brand))+'</p></div>'+
  '<form class="search-form brand-catalog-search" role="search" aria-label="Поиск среди ароматов '+esc(brand)+'">'+icon('search')+'<input id="brand-catalog-search" type="search" autocomplete="off" placeholder="Найти аромат или ноту" aria-label="Найти аромат или ноту" value="'+esc(query.get('q')||'')+'"><button type="button" class="icon-button" data-brand-query-clear aria-label="Очистить поиск" hidden>'+icon('close')+'</button><button class="search-submit" aria-label="Найти">'+icon('arrow')+'</button></form>'+
  '<div class="brand-catalog-toolbar"><p id="brand-catalog-count" role="status" aria-live="polite"></p><div class="brand-catalog-sort"><span>Сортировка</span><input id="brand-catalog-sort" type="hidden"><details class="brand-sort-dropdown"><summary role="button" aria-expanded="false" data-brand-sort-trigger aria-label="Сортировка: Популярные"><span data-brand-sort-label>Популярные</span><svg class="brand-sort-chevron" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="m1 1 5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></summary><div class="brand-sort-options" role="group" aria-label="Порядок сортировки">'+sortChoices.map(([value,label])=>'<button type="button" data-brand-sort-option="'+value+'" aria-pressed="'+(value==='popular')+'">'+label+'<svg class="brand-sort-check" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8 3.25 3.25L13 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>').join('')+'</div></details></div></div><div class="brand-applied-filters" aria-label="Выбранные фильтры"></div><div class="product-grid brand-product-grid" id="brand-catalog-results"></div><nav class="catalog-pagination" aria-label="Страницы ароматов"></nav></section></div></main>';
}
function allCatalogTemplate() {
 const groups=[['brands','Бренды'],['gender','Пол'],['note','Ноты'],['mood','Характер аромата'],['season','Время года'],['year','Год выпуска']];
 const sortChoices=[['popular','Популярные'],['name','По названию'],['new','Сначала новые'],['old','Сначала ранние']];
 return `<main id="main" class="container brand-catalog all-catalog">
  <div class="page-heading"><nav class="breadcrumb" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span aria-hidden="true">/</span><span aria-current="page">Ароматы</span></nav><h1>Ароматы</h1><p>Начните со знакомого названия, любимой ноты или ощущения.</p></div>
  <div class="brand-catalog-layout"><aside class="brand-catalog-sidebar"><details class="brand-filter-panel"${matchMedia('(min-width:761px)').matches?' open':''}><summary>Фильтры <span id="brand-filter-total"></span>${icon('plus')}</summary><div class="brand-filter-content"><div class="brand-filter-heading"><h2>Фильтры</h2><button type="button" data-brand-catalog-reset hidden>Сбросить</button></div>${groups.map(([key,label])=>`<details class="brand-filter-group" data-brand-group="${key}" open><summary>${label}${icon('plus')}</summary>${key==='brands'?'<label class="brand-facet-search"><span class="sr-only">Найти бренд в фильтре</span><input id="brand-facet-search" type="search" placeholder="Найти бренд" autocomplete="off"></label>':key==='note'?'<label class="brand-facet-search"><span class="sr-only">Найти ноту в фильтре</span><input id="note-facet-search" type="search" placeholder="Найти ноту" autocomplete="off"></label>':''}<div data-brand-facet="${key}"></div>${['brands','note','year'].includes(key)?`<button class="brand-filter-more" type="button" data-brand-more="${key}" hidden></button>`:''}</details>`).join('')}</div></details></aside>
  <section class="brand-catalog-content" aria-label="Все ароматы"><form class="search-form brand-catalog-search" role="search" aria-label="Поиск ароматов">${icon('search')}<input id="brand-catalog-search" type="search" autocomplete="off" placeholder="Найти аромат, бренд или ноту" aria-label="Найти аромат, бренд или ноту" value="${esc(query.get('q')||'')}"><button type="button" class="icon-button" data-brand-query-clear aria-label="Очистить поиск" hidden>${icon('close')}</button><button class="search-submit" aria-label="Найти">${icon('arrow')}</button></form>
  <div class="brand-catalog-toolbar"><p id="brand-catalog-count" role="status" aria-live="polite"></p><div class="brand-catalog-sort"><span>Сортировка</span><input id="brand-catalog-sort" type="hidden"><details class="brand-sort-dropdown"><summary role="button" aria-expanded="false" data-brand-sort-trigger aria-label="Сортировка: Популярные"><span data-brand-sort-label>Популярные</span><svg class="brand-sort-chevron" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="m1 1 5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></summary><div class="brand-sort-options" role="group" aria-label="Порядок сортировки">${sortChoices.map(([value,label])=>`<button type="button" data-brand-sort-option="${value}" aria-pressed="${value==='popular'}">${label}<svg class="brand-sort-check" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8 3.25 3.25L13 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`).join('')}</div></details></div></div><div class="brand-applied-filters" aria-label="Выбранные фильтры"></div><div class="product-grid brand-product-grid" id="brand-catalog-results"></div><nav class="catalog-pagination" aria-label="Страницы ароматов"></nav></section></div></main>`;
}
function initializeBrandCatalog() {
 const root=document.querySelector('.brand-catalog');
 if(!root)return;
 const isAllCatalog=root.classList.contains('all-catalog');
 const brand=isAllCatalog?'':query.get('brand');
 const collection=isAllCatalog?perfumes:perfumes.filter(p=>p.brand===brand);
 const mobileFilters=matchMedia('(max-width:760px)');
 const filterPanel=root.querySelector('.brand-filter-panel');
 mobileFilters.addEventListener('change',()=>{if(filterPanel)filterPanel.open=!mobileFilters.matches;});
 const input=root.querySelector('#brand-catalog-search');
 const brandFacetSearch=root.querySelector('#brand-facet-search');
 const noteFacetSearch=root.querySelector('#note-facet-search');
 const sort=root.querySelector('#brand-catalog-sort');
 const sortDropdown=root.querySelector('.brand-sort-dropdown');
 const sortTrigger=sortDropdown.querySelector('summary');
 const moodLabels={fresh:'Свежие',wood:'Древесные',flower:'Цветочные',sweet:'Сладкие',clean:'Чистые'};
 const tagForMood={wood:'Древесный',flower:'Цветочный',sweet:'Сладкий',clean:'Чистый'};
 const hasMood=(p,value)=>p.mood===value||p.tags.includes(tagForMood[value]);
 const values=(key)=>[...new Set(collection.map(p=>p[key]).filter(Boolean))];
 const options={
  ...(isAllCatalog?{brands:values('brand').sort((a,b)=>a.localeCompare(b,'en',{sensitivity:'base'})).map(v=>[v,v])}:{}),
  gender:['Женские','Мужские','Унисекс'].filter(v=>values('gender').includes(v)).map(v=>[v,v]),
  note:[...new Set(collection.flatMap(allNotes))].sort((a,b)=>a.localeCompare(b,'ru')).map(v=>[v,v]),
  mood:values('mood').length>1?Object.entries(moodLabels).filter(([key])=>collection.some(p=>hasMood(p,key))):[],
  season:['Весна','Лето','Осень','Зима'].filter(value=>collection.some(p=>p.seasons?.includes(value))).map(value=>[value,value]),
  year:values('year').length>1?values('year').sort((a,b)=>b-a).map(v=>[String(v),String(v)]):[]
 };
 const state=Object.fromEntries(Object.entries(options).map(([key,entries])=>[key,new Set(query.getAll(key).filter(v=>entries.some(([id])=>id===v)))]));
 const expandedFacets={...(isAllCatalog?{brands:false}:{}),note:false,year:false};
 let currentPage=Math.max(1,Number(query.get('page'))||1);
 const pageSize=30;
 sort.value=['popular','name','new','old'].includes(query.get('sort'))?query.get('sort'):'popular';
 const searchCorpus=new Map(collection.map(p=>[p.id,normalized([p.name,p.brand,p.group,...p.tags,...allNotes(p),p.description,p.feeling].join(' '))]));
 let searchTerms=[];
 const inFacet=(p,key,value)=>key==='brands'?p.brand===value:key==='mood'?hasMood(p,value):key==='note'?allNotes(p).includes(value):key==='season'?p.seasons?.includes(value):key==='year'?String(p.year)===value:p[key]===value;
 const matches=(p,except)=>searchTerms.every(term=>searchCorpus.get(p.id).includes(term))&&Object.keys(state).every(key=>key===except||!state[key].size||[...state[key]].some(value=>inFacet(p,key,value)));
 const selectionCount=()=>Object.values(state).reduce((n,s)=>n+s.size,0)+(input.value.trim()?1:0);
 function render() {
  searchTerms=normalized(input.value).split(/\s+/).filter(Boolean);
  const focused=document.activeElement;
  const focusKey=focused?.dataset.facet, focusValue=focused?.value;
  const chosenSort=root.querySelector('[data-brand-sort-option="'+sort.value+'"]');
  root.querySelector('[data-brand-sort-label]').textContent=chosenSort.textContent;
  root.querySelector('[data-brand-sort-trigger]').setAttribute('aria-label','Сортировка: '+chosenSort.textContent);
  root.querySelectorAll('[data-brand-sort-option]').forEach(option=>option.setAttribute('aria-pressed',String(option===chosenSort)));
  const results=collection.filter(p=>matches(p)).sort((a,b)=>{
   const byName=a.name.localeCompare(b.name,'ru');
   if(sort.value==='popular')return (b.popularity??-1)-(a.popularity??-1)||byName;
   if(sort.value==='new'||sort.value==='old'){if(!a.year)return b.year?1:byName;if(!b.year)return -1;return (sort.value==='new'?b.year-a.year:a.year-b.year)||byName;}
   return byName;
  });
  const pages=Math.ceil(results.length/pageSize);
  currentPage=Math.min(Math.max(1,Math.floor(currentPage)),Math.max(1,pages));
  const start=(currentPage-1)*pageSize, visible=results.slice(start,start+pageSize);
  root.querySelector('#brand-catalog-count').innerHTML='<span>Найдено ароматов: '+results.length.toLocaleString('ru-RU')+'</span>'+(pages>1?'<span>Показаны ароматы: '+(start+1)+'-'+(start+visible.length)+'</span>':'');
  if(collection.length){
   root.querySelector('#brand-filter-total').textContent=selectionCount()?String(selectionCount()):'';
   root.querySelector('.brand-filter-heading [data-brand-catalog-reset]').hidden=!selectionCount();
  }
  root.querySelector('[data-brand-query-clear]').hidden=!input.value;
  for(const [key,values] of Object.entries(options)) {
   const group=root.querySelector('[data-brand-group="'+key+'"]');
   if(!group)continue;
   group.hidden=!values.length;
   if(!values.length)continue;
   const counts=new Map();
   for(const p of collection) {
    if(!matches(p,key))continue;
    const found=key==='brands'?[p.brand]:key==='note'?[...new Set(allNotes(p))]:key==='mood'?values.filter(([value])=>hasMood(p,value)).map(([value])=>value):key==='season'?p.seasons||[]:key==='year'?[String(p.year)]:[p[key]];
    for(const value of found)counts.set(value,(counts.get(value)||0)+1);
   }
   const noteQuery=key==='note'?normalized(noteFacetSearch.value):'';
   const catalogNoteQuery=key==='note'?normalized(input.value):'';
   const matchingCatalogNotes=catalogNoteQuery?values.filter(([,label])=>normalized(label).includes(catalogNoteQuery)):[];
   const narrowedNotes=key==='note'&&!noteQuery&&matchingCatalogNotes.length>0;
   const brandQuery=key==='brands'?normalized(brandFacetSearch.value):'';
   const visibleValues=brandQuery?values.filter(([value,label])=>normalized(label).includes(brandQuery)||state.brands.has(value)):noteQuery||narrowedNotes?values.filter(([value,label])=>normalized(label).includes(noteQuery||catalogNoteQuery)||state.note.has(value)):key in expandedFacets&&!expandedFacets[key]?values.filter(([value],index)=>index<6||state[key].has(value)):values;
   const facetList=group.querySelector('[data-brand-facet]');
   const previousScrollTop=facetList.scrollTop;
   facetList.innerHTML=visibleValues.map(([value,label])=>{
    const count=counts.get(value)||0;
    return '<label class="brand-filter-option'+(!count&&!state[key].has(value)?' unavailable':'')+'"><input type="checkbox" data-facet="'+key+'" value="'+esc(value)+'"'+(state[key].has(value)?' checked':'')+(!count&&!state[key].has(value)?' disabled':'')+'><span>'+esc(label)+'</span><small>'+count+'</small></label>';
   }).join('');
   facetList.scrollTop=previousScrollTop;
   if(key in expandedFacets){
    group.classList.toggle('is-expanded',expandedFacets[key]||!!brandQuery||!!noteQuery||narrowedNotes);
    const more=group.querySelector('[data-brand-more]');
    more.hidden=!!brandQuery||!!noteQuery||narrowedNotes||values.length<=6;
    const hiddenCount=expandedFacets[key]?0:values.length-visibleValues.length;
    const moreLabel=expandedFacets[key]?'Свернуть':key==='brands'?'Показать все бренды':key==='year'?'Показать все года':'Показать все ноты';
    more.innerHTML='<span>'+moreLabel+'</span>'+(hiddenCount?'<span class="brand-filter-remaining"><span>еще</span><span>'+hiddenCount.toLocaleString('ru-RU')+'</span></span>':'');
    more.setAttribute('aria-expanded',String(expandedFacets[key]));
   }
  }
  const chips=Object.entries(state).flatMap(([key,set])=>[...set].map(value=>'<button class="chip" type="button" data-remove-facet="'+key+'" data-value="'+esc(value)+'" aria-label="Убрать фильтр: '+esc(moodLabels[value]||value)+'">'+esc(moodLabels[value]||value)+icon('close')+'</button>'));
  if(input.value.trim())chips.unshift('<button class="chip" type="button" data-brand-query-clear aria-label="Убрать поисковый запрос">'+esc(input.value.trim())+icon('close')+'</button>');
  root.querySelector('.brand-applied-filters').innerHTML=chips.join('');
  root.querySelector('#brand-catalog-results').innerHTML=results.length?visible.map((p,index)=>productCard(p,isAllCatalog&&currentPage===1&&index<3)).join(''):'<div class="empty brand-catalog-empty"><h2>'+(collection.length?'Нет подходящих ароматов':'Коллекция еще готовится')+'</h2><p>'+esc(collection.length?(isAllCatalog?'Попробуйте убрать часть фильтров или изменить запрос.':'Попробуйте убрать часть фильтров или изменить запрос. Вы останетесь на странице '+brand+'.'):'Ароматы '+brand+' пока не добавлены в каталог сайта.')+'</p>'+(selectionCount()?'<button class="button secondary" type="button" data-brand-catalog-reset>Сбросить фильтры '+icon('left')+'</button>':'<a class="text-link" href="brands.html">Вернуться к брендам '+icon('arrow')+'</a>')+'</div>';
  root.querySelector('.catalog-pagination').innerHTML=pages>1?'<button type="button" data-catalog-page="'+(currentPage-1)+'" aria-label="Предыдущая страница"'+(currentPage===1?' disabled':'')+'>'+icon('left')+'</button><span>Страница '+currentPage+' из '+pages+'</span><button type="button" data-catalog-page="'+(currentPage+1)+'" aria-label="Следующая страница"'+(currentPage===pages?' disabled':'')+'>'+icon('arrow')+'</button>':'';
  const next=new URL(location.href);
  ['q','brands','gender','line','mood','note','season','year','sort','page'].forEach(k=>next.searchParams.delete(k));
  if(input.value.trim())next.searchParams.set('q',input.value.trim());
  for(const [key,set] of Object.entries(state))for(const value of set)next.searchParams.append(key,value);
  if(sort.value!=='popular')next.searchParams.set('sort',sort.value);
  if(currentPage>1)next.searchParams.set('page',currentPage);
  history.replaceState(null,'',next);
  if(focusKey)Array.from(root.querySelectorAll('[data-facet]')).find(e=>e.dataset.facet===focusKey&&e.value===focusValue)?.focus({preventScroll:true});
  syncSaved();
 }
 root.querySelector('.brand-catalog-search').addEventListener('submit',e=>{e.preventDefault();currentPage=1;render();});
 input.addEventListener('input',()=>{currentPage=1;render();});
 brandFacetSearch?.addEventListener('input',render);
 noteFacetSearch?.addEventListener('input',()=>{root.querySelector('[data-brand-facet="note"]').scrollTop=0;render();});
 sortDropdown.addEventListener('keydown',e=>{
  const choices=[...sortDropdown.querySelectorAll('[data-brand-sort-option]')];
  if(e.key==='Escape'&&sortDropdown.open){e.preventDefault();sortDropdown.open=false;sortDropdown.querySelector('summary').focus({preventScroll:true});return;}
  if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
  e.preventDefault();sortDropdown.open=true;
  const index=choices.indexOf(document.activeElement);
  const next=e.key==='Home'?0:e.key==='End'?choices.length-1:index<0?(e.key==='ArrowUp'?choices.length-1:choices.findIndex(choice=>choice.dataset.brandSortOption===sort.value)):(index+(e.key==='ArrowDown'?1:-1)+choices.length)%choices.length;
  choices[next].focus({preventScroll:true});
 });
 sortDropdown.addEventListener('toggle',()=>sortTrigger.setAttribute('aria-expanded',String(sortDropdown.open)));
 sortDropdown.addEventListener('focusout',e=>{if(!sortDropdown.contains(e.relatedTarget))sortDropdown.open=false;});
 document.addEventListener('pointerdown',e=>{if(!sortDropdown.contains(e.target))sortDropdown.open=false;});
 root.addEventListener('change',e=>{const key=e.target.dataset.facet;if(!key)return;currentPage=1;e.target.checked?state[key].add(e.target.value):state[key].delete(e.target.value);render();});
 root.addEventListener('click',e=>{
  const button=e.target.closest('button');if(!button)return;
  if(button.dataset.brandSortOption){sort.value=button.dataset.brandSortOption;currentPage=1;sortDropdown.open=false;render();sortDropdown.querySelector('summary').focus({preventScroll:true});return;}
  if(button.dataset.catalogPage){currentPage=Number(button.dataset.catalogPage);render();root.querySelector('.brand-catalog-toolbar').scrollIntoView({block:'start'});return;}
  if(button.dataset.brandMore){expandedFacets[button.dataset.brandMore]=!expandedFacets[button.dataset.brandMore];render();button.focus({preventScroll:true});return;}
  if(button.hasAttribute('data-brand-catalog-reset')){currentPage=1;Object.values(state).forEach(set=>set.clear());input.value='';render();input.focus({preventScroll:true});}
  if(button.hasAttribute('data-brand-query-clear')){currentPage=1;input.value='';render();input.focus({preventScroll:true});}
  if(button.dataset.removeFacet){currentPage=1;state[button.dataset.removeFacet].delete(button.dataset.value);render();}
 });
 document.title=isAllCatalog?'Ароматы · aroma:me':brand+' - ароматы · aroma:me';
 render();
}
