import compareAsc from 'date-fns/compareAsc'
import { groupBy, releaseAdapter } from 'shared/utils'

const games = [
  {
    cover:
      'https://api.released.at/uploads/release/cover/18227/baldurs_gate.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18227/baldurs_gate.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18227/preview_baldurs_gate.jpg',
    },
    description:
      'Древнее зло вернулось ко Вратам Балдура, стремясь пожрать все и вся изнутри, разрушая все, что еще осталось в Забытых Королевствах. В одиночку вы можете сопротивляться... но вместе вы можете победить.',
    id: 10330,
    is_expected: false,
    metacritic_url: '',
    platforms: ['pc'],
    release_id: 18227,
    released: '2020-10-06',
    site: '',
    title: "Baldur's Gate III",
    trailer: '',
    type: 'game',
  },
  {
    cover: 'https://api.released.at/uploads/release/cover/18271/original.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18271/original.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18271/preview_original.jpg',
    },
    description:
      'Побеждайте вместе в EA SPORTS™ FIFA 21 на базе Frostbite™. На улицах и на стадионах — FIFA 21 предоставляет еще больше возможностей для игры, включая такие турниры, как UEFA Champions League и CONMEBOL Libertadores.',
    id: 10339,
    is_expected: false,
    metacritic_url: 'https://www.metacritic.com/game/playstation-4/fifa-21',
    platforms: ['pc', 'xbox_one', 'ps_4', 'nintendo_switch'],
    release_id: 18271,
    released: '2020-10-09',
    site: '',
    title: 'FIFA 21',
    trailer: '',
    type: 'game',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18273/cfa4811eb37f4f2696d1cb864a429b8d.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18273/cfa4811eb37f4f2696d1cb864a429b8d.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18273/preview_cfa4811eb37f4f2696d1cb864a429b8d.jpg',
    },
    description:
      'Действие Watch Dogs: Legion происходит в недалеком будущем. Лондон переживает тяжелые времена. Организуйте сопротивление, чтобы спасти город.',
    id: 10341,
    is_expected: false,
    metacritic_url:
      'https://www.metacritic.com/game/playstation-4/watch-dogs-legion',
    platforms: ['pc', 'xbox_one', 'ps_4'],
    release_id: 18273,
    released: '2020-10-29',
    site: '',
    title: 'Watch Dogs: Legion',
    trailer: '',
    type: 'game',
  },
  {
    cover: 'https://api.released.at/uploads/release/cover/18230/star_wars.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18230/star_wars.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18230/preview_star_wars.jpg',
    },
    description:
      'Игра представляет собой аркадный экшен с видом от первого лица. Star Wars: Squadrons содержит как однопользовательскую кампанию (продолжительность не уточняется), так и мультиплеер с боями в формате «5 на 5».',
    id: 10332,
    is_expected: false,
    metacritic_url: '',
    platforms: ['pc', 'xbox_one', 'ps_4'],
    release_id: 18230,
    released: '2020-10-02',
    site: '',
    title: 'Star Wars: Squadrons',
    trailer: '',
    type: 'game',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18272/sm.1560123416_screenshot__150_.750.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18272/sm.1560123416_screenshot__150_.750.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18272/preview_sm.1560123416_screenshot__150_.750.jpg',
    },
    description:
      'Age of Empires III: Definitive Edition — новая веха для культовой серии стратегий в реальном времени. В этом издании вас ждут полностью обновленные графика и музыка, все ранее выпущенные дополнения и совершенно новые материалы.',
    id: 10340,
    is_expected: false,
    metacritic_url:
      'https://www.metacritic.com/game/pc/age-of-empires-iii-definitive-edition',
    platforms: ['pc'],
    release_id: 18272,
    released: '2020-10-15',
    site: '',
    title: 'Age of Empires III: Definitive Edition',
    trailer: '',
    type: 'game',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18174/E3413D2E-01D0-4174-9F93-602CCAF143D7.jpeg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18174/E3413D2E-01D0-4174-9F93-602CCAF143D7.jpeg',
      preview:
        'https://api.released.at/uploads/release/cover/18174/preview_E3413D2E-01D0-4174-9F93-602CCAF143D7.jpeg',
    },
    description:
      'Ghostrunner — стремительный хардкорный слэшер с видом от первого лица, действие которого происходит в мрачном киберпанковом мире. Поднимитесь на вершину башни Дхармы, последнего пристанища человечества после страшного катаклизма.',
    id: 10296,
    is_expected: false,
    metacritic_url: '',
    platforms: ['pc', 'xbox_one', 'ps_4', 'nintendo_switch'],
    release_id: 18174,
    released: '2020-10-27',
    site: '',
    title: 'Ghostrunner',
    trailer: '',
    type: 'game',
  },
  {
    cover: 'https://api.released.at/uploads/release/cover/18275/ride4_6.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18275/ride4_6.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18275/preview_ride4_6.jpg',
    },
    description:
      'Вы готовы сыграть в лучшую игру, о которой может мечтать любитель мотоциклов? RIDE 4 разожжет в вас дух соревнования благодаря сотням мотоциклов, десяткам треков и абсолютно новому уровню реализма.\r\n',
    id: 10343,
    is_expected: false,
    metacritic_url: 'https://www.metacritic.com/game/playstation-4/ride-4',
    platforms: ['pc', 'xbox_one', 'ps_4'],
    release_id: 18275,
    released: '2020-10-08',
    site: '',
    title: 'Ride 4',
    trailer: '',
    type: 'game',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18280/ss_a00a8717014f41bcf8ce772af4c759c94fc6a507.1920x1080.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18280/ss_a00a8717014f41bcf8ce772af4c759c94fc6a507.1920x1080.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18280/preview_ss_a00a8717014f41bcf8ce772af4c759c94fc6a507.1920x1080.jpg',
    },
    description:
      'Дополнение Broken Porcelain внесёт в серию много долгожданных изменений, добавит новую механику игры и сюжетные элементы, которые вдохнут новую жизнь в персонажей и позволят ещё глубже погрузиться в жуткое приключение.',
    id: 10351,
    is_expected: false,
    metacritic_url:
      'https://www.metacritic.com/game/pc/remothered-broken-porcelain',
    platforms: ['pc', 'xbox_one', 'ps_4', 'nintendo_switch'],
    release_id: 18280,
    released: '2020-10-13',
    site: '',
    title: 'Remothered: Broken Porcelain',
    trailer: 'https://www.youtube.com/watch?v=QGiAZf67AUo',
    type: 'game',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18279/4a9cd4ea1cd8db41_1920xH.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18279/4a9cd4ea1cd8db41_1920xH.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18279/preview_4a9cd4ea1cd8db41_1920xH.jpg',
    },
    description:
      'У БАМБЛБИ и автоботов появился новый командир – и это ты! Собери команду и выходи на бой с десептиконами... призвав на помощь верных друзей в локальном многопользовательском режиме!\r\n\r\n',
    id: 10350,
    is_expected: false,
    metacritic_url:
      'https://www.metacritic.com/game/playstation-4/transformers-battlegrounds',
    platforms: ['pc', 'xbox_one', 'ps_4', 'nintendo_switch'],
    release_id: 18279,
    released: '2020-10-23',
    site: 'https://outrightgames.com/games/transformers/',
    title: 'Transformers: Battlegrounds',
    trailer:
      'https://www.youtube.com/watch?v=ezdDoOrDk3g&ab_channel=BANDAINAMCOEntertainmentEurope',
    type: 'game',
  },
  {
    cover: 'https://api.released.at/uploads/release/cover/18317/01.jpg',
    covers: {
      default: 'https://api.released.at/uploads/release/cover/18317/01.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18317/preview_01.jpg',
    },
    description:
      'В игре Amnesia: Rebirth от создателей культовой серии вас ждёт новое погружение во тьму. Преодолевая отчаяние и безысходность, вам предстоит проверить на прочность человеческую способность выносить страдания.',
    id: 10371,
    is_expected: false,
    metacritic_url: 'https://www.metacritic.com/game/pc/amnesia-rebirth',
    platforms: ['pc', 'ps_4'],
    release_id: 18317,
    released: '2020-10-20',
    site: '',
    title: 'Amnesia: Rebirth',
    trailer: 'https://youtu.be/NST1KLFwNnI',
    type: 'game',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18278/Crash-4-MP_09-23-20.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18278/Crash-4-MP_09-23-20.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18278/preview_Crash-4-MP_09-23-20.jpg',
    },
    description:
      'Коварным злодеям Нео Кортексу и доктору Энтропику удалось наконец сбежать из своей тюрьмы, проделав во вселенной дыру размером со злого учёного. И теперь они планируют покорить не просто наше измерение, но все измерения, и спасти мироздание могут только Крэш и Коко. Пляж энтузиазма – это место где некогда началось приключение Крэша, и где оно стартует в четвертой части. Однако с тех далеких пор, когда мы с вами его в последний раз видели, явно многое изменилось. И, сыграв в четвертого «Крэша», вы будете замечать изменения во всем – от игрового процесса и до стиля оформления.',
    id: 10349,
    is_expected: false,
    metacritic_url:
      'https://www.metacritic.com/game/playstation-4/crash-bandicoot-4-its-about-time',
    platforms: ['xbox_one', 'ps_4'],
    release_id: 18278,
    released: '2020-10-02',
    site: 'https://www.crashbandicoot.com/ru/crash4/home',
    title: 'Crash Bandicoot 4: It’s About Time',
    trailer: '',
    type: 'game',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18223/g.i.-joe-operation-blackout.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18223/g.i.-joe-operation-blackout.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18223/preview_g.i.-joe-operation-blackout.jpg',
    },
    description:
      'Игроков ждёт 12 персонажей, 18 сюжетный миссий, поддержка прохождения в локальном кооперативе в режиме разделённого экрана, а также различные мультиплеерные PvP-режимы, включая Capture the Flag, Assault и King of the Hill.',
    id: 10328,
    is_expected: false,
    metacritic_url: '',
    platforms: ['pc', 'xbox_one', 'ps_4', 'nintendo_switch'],
    release_id: 18223,
    released: '2020-10-13',
    site: '',
    title: 'G.I. Joe: Operation Blackout',
    trailer: '',
    type: 'game',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18276/NHL-21-Official-Reveal-Trailer-0-53-screenshot.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18276/NHL-21-Official-Reveal-Trailer-0-53-screenshot.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18276/preview_NHL-21-Official-Reveal-Trailer-0-53-screenshot.jpg',
    },
    description:
      'В EA SPORTS NHL 21 мы особо отмечаем самых креативных, изобретательных и бесстрашных игроков. Проложите путь к суперславе в расширенном режиме «Профи» и станьте одним из лучших в лиге. Блистайте на льду, обогатите атаки новыми приемами, финтами, проводками и уходами, вдохновленными одними из самых блистательных и изобретательных игроков. Мы чествуем творчество, инновации, будущее. NHL 21. Мы чествуем величие.\r\n',
    id: 10344,
    is_expected: false,
    metacritic_url: 'https://www.metacritic.com/game/playstation-4/nhl-21',
    platforms: ['xbox_one', 'ps_4'],
    release_id: 18276,
    released: '2020-10-13',
    site: '',
    title: 'NHL 21',
    trailer: '',
    type: 'game',
  },
]

export const gamesJSON = groupBy('released')(
  games
    .sort((a, b) => compareAsc(new Date(a.released), new Date(b.released)))
    .map(release => releaseAdapter(release, 'games')),
)
