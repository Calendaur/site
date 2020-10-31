import compareAsc from 'date-fns/compareAsc'
import { groupBy, releaseAdapter } from 'shared/utils'

const series = [
  {
    cover:
      'https://api.released.at/uploads/release/cover/18229/voin-2-sezon.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18229/voin-2-sezon.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18229/preview_voin-2-sezon.jpg',
    },
    description:
      'Конец XIX века. Молодой китайский эмигрант, неплохо владеющий боевыми искусствами, приезжает в Сан-Франциско и сразу же оказывается в эпицентре бандитских войн в местном Чайнатауне.',
    director: ' Лони Перистер, Дэвид Петрарка, Лин Одинг',
    id: 74,
    imdb_url: 'https://www.imdb.com/title/tt5743796/?ref_=nv_sr_srsg_6',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1219257/',
    release_id: 18229,
    released: '2020-10-02',
    season: 2,
    site: '',
    title: 'Воин',
    type: 'serial',
  },
  {
    cover: 'https://api.released.at/uploads/release/cover/18232/primal.jpg',
    covers: {
      default: 'https://api.released.at/uploads/release/cover/18232/primal.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18232/preview_primal.jpg',
    },
    description:
      'Доисторические времена. Чуть было не став обедом гигантского крокодила, первобытный человек возвращается с рыбалки к родной пещере прямо в тот момент, когда стая хищных динозавров съедает его женщину и детей. Вскоре осиротевший мужчина неожиданно для себя объединяется с тираннозавром, пытающимся безуспешно защитить детёнышей от тех же хищников, что убили и его семью. Это окажется началом необычной дружбы в мире, где всё, что шевелится, или станет твоей добычей, или попытается тебя сожрать.',
    director: ' Генндий Тартаковский',
    id: 75,
    imdb_url: 'https://www.imdb.com/title/tt10332508/?ref_=nv_sr_srsg_6',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1263399/',
    release_id: 18232,
    released: '2020-10-04',
    season: 2,
    site: '',
    title: 'Первобытный',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18233/the_good_lord.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18233/the_good_lord.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18233/preview_the_good_lord.jpg',
    },
    description:
      'Отец Ониона погибает в результате стычки между рабовладельцем и страстным аболиционистом Джоном Брауном. Приняв Ониона за девочку, Браун забирает его в свою армию противников рабства, состоящую в основном из его сыновей. В 1859-м в попытке начать восстание рабов они совершают налёт на армейское хранилище в Харперс-Ферри. Восстание не случается, но их действия в итоге приводят к Гражданской войне в США.',
    director: ' Хайфа Аль-Мансур, Альберт Хьюз, Майкл Нанкин',
    id: 76,
    imdb_url: 'https://www.imdb.com/title/tt3673480/?ref_=nv_sr_srsg_0',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1248354/',
    release_id: 18233,
    released: '2020-10-04',
    season: 1,
    site: '',
    title: 'Птица доброго господа',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18237/walking-dead-world-beyond.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18237/walking-dead-world-beyond.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18237/preview_walking-dead-world-beyond.jpg',
    },
    description:
      'Рассказ о жизни первого поколения, выросшего в захваченном зомби мире. Группа подростков отправится в путешествие, связанное с исчезновением Рика Граймса.',
    director: '',
    id: 80,
    imdb_url: 'https://www.imdb.com/title/tt10148174/?ref_=nv_sr_srsg_0',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1282096/',
    release_id: 18237,
    released: '2020-10-04',
    season: 1,
    site: '',
    title: 'Ходячие мертвецы: Мир за пределами',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18238/The-Haunting-of-Hill-House-768x432-1.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18238/The-Haunting-of-Hill-House-768x432-1.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18238/preview_The-Haunting-of-Hill-House-768x432-1.jpg',
    },
    description:
      'Состоятельный лондонского лорда становится опекуном малолетних племянников Майлса и Флоры. Он поселяет их в своей загородной усадьбе и нанимает для них молодую гувернантку. Девушке рассказывают, что ранее в этом доме погибли бывшая гувернантка мисс Джессел и слуга Питер Квинт, и вскоре молодой няне начинает казаться, что в особняке обитают зловещие силы.',
    director: '',
    id: 81,
    imdb_url: 'https://www.imdb.com/title/tt10970552/?ref_=nv_sr_srsg_0',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1346006/',
    release_id: 18238,
    released: '2020-10-09',
    season: 1,
    site: '',
    title: 'Призраки поместья Блай',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18239/6-things-wed-like-to-see-from-fear-the-walking-dead-in-season-6.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18239/6-things-wed-like-to-see-from-fear-the-walking-dead-in-season-6.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18239/preview_6-things-wed-like-to-see-from-fear-the-walking-dead-in-season-6.jpg',
    },
    description:
      'Действия сериала происходят параллельно с событиями зомби-апокалипсиса, показанными в сериале «Ходячие мертвецы», но в совершенно другом месте — Лос-Анджелесе. В центре сюжета находится семья матери-одиночки и консультанта по профессиям Мэдисон Кларк и разведённого учителя Трэвиса Манавы, которые вместе пытаются выжить в зомби-апокалипсисе.',
    director: '',
    id: 82,
    imdb_url: 'https://www.imdb.com/title/tt3743822/?ref_=nv_sr_srsg_0',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/846892/',
    release_id: 18239,
    released: '2020-10-11',
    season: 6,
    site: '',
    title: 'Бойтесь ходячих мертвецов',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18240/Star-Trek-Discovery.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18240/Star-Trek-Discovery.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18240/preview_Star-Trek-Discovery.jpg',
    },
    description:
      'За 10 лет до начала истории, описанной в оригинальном сериале «Звёздный путь», экипаж корабля USS Discovery NCC-1031 отправляется в путешествие, чтобы изучать глубокий космос и открыть новые миры и цивилизации.',
    director: '',
    id: 83,
    imdb_url: 'https://www.imdb.com/title/tt5171438/?ref_=nv_sr_srsg_7',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/977754/',
    release_id: 18240,
    released: '2020-10-15',
    season: 3,
    site: '',
    title: 'Звёздный путь: Дискавери',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18241/200316-spnwinchesters-news.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18241/200316-spnwinchesters-news.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18241/preview_200316-spnwinchesters-news.jpg',
    },
    description:
      'Сериал рассказывает о приключениях братьев Сэма и Дина Винчестеров, которые путешествуют по Соединённым Штатам на чёрном автомобиле Chevrolet Impala 1967 года, расследуют паранормальные явления, многие из которых основаны на американских городских легендах и фольклоре, и сражаются с порождениями зла, такими как демоны и призраки.\r\n\r\n8 октября начнётся показ финальных эпизодов сериала, отложенных из-за пандемии.',
    director: '',
    id: 84,
    imdb_url: 'https://www.imdb.com/title/tt0460681/?ref_=nv_sr_srsg_0',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/178707/',
    release_id: 18241,
    released: '2020-10-08',
    season: 15,
    site: '',
    title: 'Сверхъестественное',
    type: 'serial',
  },
  {
    cover: 'https://api.released.at/uploads/release/cover/18242/helstrom-1.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18242/helstrom-1.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18242/preview_helstrom-1.jpg',
    },
    description:
      'Дэймон и Ана Хелстром — дети загадочного и могущественного серийного убийцы. В попытке разобраться в собственном происхождении они путешествуют по миру и уничтожают худших представителей человечества.',
    director: '',
    id: 85,
    imdb_url: 'https://www.imdb.com/title/tt10266874/?ref_=nv_sr_srsg_4',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1262921/',
    release_id: 18242,
    released: '2020-10-16',
    season: 1,
    site: '',
    title: 'Хелстром',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18243/9a4aa51fdeaee9c9635abf4056aa6ed367-the-undoing.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18243/9a4aa51fdeaee9c9635abf4056aa6ed367-the-undoing.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18243/preview_9a4aa51fdeaee9c9635abf4056aa6ed367-the-undoing.jpg',
    },
    description:
      'Грейс — успешный терапевт из Нью-Йорка, у неё все хорошо: любящий муж, прекрасный сын, богатая жизнь. Скоро у Грейс выйдет первая книга, в которой она советует женщинам слушать интуицию и верить первому впечатлению о мужчинах. Однако накануне выхода пропадает её муж, и сказочная жизнь оборачивается чередой неприятных откровений и PR-скандалом.',
    director: '',
    id: 86,
    imdb_url: 'https://www.imdb.com/title/tt8134470/?ref_=nv_sr_srsg_0',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1209420/',
    release_id: 18243,
    released: '2020-10-25',
    season: 1,
    site: '',
    title: 'Отыграть назад',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18244/https___cdn.cnn.com_cnnnext_dam_assets_191112075610-the-mandalorian-disney.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18244/https___cdn.cnn.com_cnnnext_dam_assets_191112075610-the-mandalorian-disney.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18244/preview_https___cdn.cnn.com_cnnnext_dam_assets_191112075610-the-mandalorian-disney.jpg',
    },
    description:
      'Одинокий мандалорец-наёмник живёт на краю обитаемой галактики, куда не дотягивается закон Новой Республики. Представитель некогда могучей расы благородных воинов теперь вынужден влачить жалкое существование среди отбросов общества.',
    director: '',
    id: 87,
    imdb_url: 'https://www.imdb.com/title/tt8111088/?ref_=nv_sr_srsg_0',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1118138/',
    release_id: 18244,
    released: '2020-10-30',
    season: 2,
    site: '',
    title: 'Мандалорец',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18300/landscape-desktop.764.430.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18300/landscape-desktop.764.430.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18300/preview_landscape-desktop.764.430.jpg',
    },
    description:
      'Любители всего паранормального путешествуют по Великобритании в поисках свидетельств существования привидений. Они регулярно посещают старые церкви или заброшенные госпитали, где с помощью самодельного оборудования выискивают следы чего-нибудь сверхъестественного и транслируют свои приключения в сети. Однажды они случайно натыкаются на заговор, способный уничтожить всё человечество.\r\n\r\n',
    director: '',
    id: 97,
    imdb_url: 'https://www.imdb.com/title/tt7907922/',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1293369/',
    release_id: 18300,
    released: '2020-10-30',
    season: 1,
    site: '',
    title: 'Искатели правды',
    type: 'serial',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18301/106704b723b1cacd069b8ea76149edcc01-the-queens-gambit.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18301/106704b723b1cacd069b8ea76149edcc01-the-queens-gambit.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18301/preview_106704b723b1cacd069b8ea76149edcc01-the-queens-gambit.jpg',
    },
    description:
      '1950-е. Сиротка из приюта в Кентукки обнаруживает в себе невероятный талант к игре в шахматы, а также пытается бороться с наркозависимостью.\r\n\r\n',
    director: '',
    id: 98,
    imdb_url: 'https://www.imdb.com/title/tt10048342/',
    is_expected: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/series/1253633/',
    release_id: 18301,
    released: '2020-10-23',
    season: 1,
    site: '',
    title: 'Ход королевы',
    type: 'serial',
  },
]

export const seriesJSON = groupBy('released')(
  series
    .sort((a, b) => compareAsc(new Date(a.released), new Date(b.released)))
    .map(release => releaseAdapter(release, 'series')),
)
