import compareAsc from 'date-fns/compareAsc'
import { groupBy, releaseAdapter } from 'shared/utils'

const films = [
  {
    cover:
      'https://api.released.at/uploads/release/cover/18017/%D0%A8%D0%B8%D1%80%D0%BB%D0%B8_-_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18017/%D0%A8%D0%B8%D1%80%D0%BB%D0%B8_-_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18017/preview_%D0%A8%D0%B8%D1%80%D0%BB%D0%B8_-_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg',
    },
    description:
      'Известная писательница романов ужасов находит вдохновение для следующей книги, когда в дом по соседству переезжает молодая пара.',
    director: 'Жозефин Декер',
    foreign_ratings: {
      imdb_rating: 6.2,
      imdb_num_vote: 5561,
      kinopoisk_rating: 6.023,
      kinopoisk_num_vote: 746,
    },
    id: 58,
    imdb_url: 'https://www.imdb.com/title/tt8430598/',
    is_digital: true,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1146759/',
    release_id: 18017,
    released: '2020-10-22',
    site: '',
    title: 'Ширли',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18138/MV5BNWQ5YjI3ZmMtYTRhZS00NjEzLWFkMjYtYmE0Nzc5YmNhY2I1XkEyXkFqcGdeQXVyMjQxNTMwMTU-._V1_SY1000_CR006661000_AL_.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18138/MV5BNWQ5YjI3ZmMtYTRhZS00NjEzLWFkMjYtYmE0Nzc5YmNhY2I1XkEyXkFqcGdeQXVyMjQxNTMwMTU-._V1_SY1000_CR006661000_AL_.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18138/preview_MV5BNWQ5YjI3ZmMtYTRhZS00NjEzLWFkMjYtYmE0Nzc5YmNhY2I1XkEyXkFqcGdeQXVyMjQxNTMwMTU-._V1_SY1000_CR006661000_AL_.jpg',
    },
    description:
      '17-летний Бэн, переживая из-за разлада родителей, приезжает на лето к отцу провести время на природе и подработать на пристани. В соседнем домике проживает молодая пара с двумя детьми, и однажды после лесной прогулки они приводят с собой древнее зло. Бен сразу же замечает, что по соседству начало твориться нечто странное, но отец его даже слушать не хочет, а новая знакомая Меллори считает, что всему можно найти рациональное объяснение.',
    director: 'Бретт Пирс, Дрю Т. Пирс',
    foreign_ratings: {
      imdb_rating: 5.8,
      imdb_num_vote: 8347,
      kinopoisk_rating: 5.403,
      kinopoisk_num_vote: 2711,
    },
    id: 100,
    imdb_url: 'https://www.imdb.com/title/tt8305806/?ref_=nv_sr_srsg_0',
    is_digital: false,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1145122/',
    release_id: 18138,
    released: '2020-10-01',
    site: '',
    title: 'Первая ведьма',
    type: 'movie',
  },
  {
    cover: 'https://api.released.at/uploads/release/cover/18255/Capone.jpg',
    covers: {
      default: 'https://api.released.at/uploads/release/cover/18255/Capone.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18255/preview_Capone.jpg',
    },
    description:
      'Вернувшись из тюрьмы, Аль Капоне продолжает оставаться предметом пристального внимания ФБР. Ведь при аресте так и не была найдена крупная сумма денег – итог всей криминальной деятельности знаменитого мафиози. По всему дому расставлены жучки, под подозрением каждый член большой семьи Капоне. Удастся ли спецслужбам добиться от теряющего память гангстера информации, где и при каких обстоятельствах он спрятал деньги?',
    director: 'Джош Транк',
    foreign_ratings: {
      imdb_rating: 4.7,
      imdb_num_vote: 12805,
      kinopoisk_rating: 5.055,
      kinopoisk_num_vote: 6075,
    },
    id: 133,
    imdb_url: 'https://www.imdb.com/title/tt6199572/?ref_=nv_sr_srsg_0',
    is_digital: false,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1007761/',
    release_id: 18255,
    released: '2020-10-01',
    site: '',
    title: 'Капоне. Лицо со шрамом',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18254/yNlVk0HnxvY5Z1raID9N6SKeFid.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18254/yNlVk0HnxvY5Z1raID9N6SKeFid.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18254/preview_yNlVk0HnxvY5Z1raID9N6SKeFid.jpg',
    },
    description:
      'Отставной детектив Рик Декард вновь восстановлен в полиции Лос-Анджелеса для поиска возглавляемой Роем Батти группы киборгов, совершившей побег из космической колонии на Землю.\r\n\r\nВ полиции считают, что киборги пытаются встретиться с Эндолом Тайреллом, руководителем корпорации, ставящей эксперименты над кибернетическим интеллектом. Рик Декард получает задание выяснить мотивы действий киборгов, а затем уничтожить их.',
    director: 'Ридли Скотт',
    foreign_ratings: {
      imdb_rating: 8.1,
      imdb_num_vote: 682764,
      kinopoisk_rating: 7.684,
      kinopoisk_num_vote: 121676,
    },
    id: 132,
    imdb_url: ' https://www.imdb.com/title/tt0083658/?ref_=nv_sr_srsg_3',
    is_digital: false,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/403/',
    release_id: 18254,
    released: '2020-10-08',
    site: '',
    title: 'Бегущий по лезвию',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18259/71pOwfgGotL._AC_SL1500_.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18259/71pOwfgGotL._AC_SL1500_.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18259/preview_71pOwfgGotL._AC_SL1500_.jpg',
    },
    description:
      'Переехав с папой в деревню, две маленькие сестры, старшая Сацуки и младшая Мэй, знакомятся с лесным духом, которого Мэй называет Тоторо. Подружившись с девочками, Тоторо не только устраивает им воздушную экскурсию по своим владениям, но и помогает повидаться с мамой, которая лежит в больнице.',
    director: 'Хаяо Миядзаки',
    foreign_ratings: {
      imdb_rating: 8.2,
      imdb_num_vote: 282331,
      kinopoisk_rating: 8.189,
      kinopoisk_num_vote: 128854,
    },
    id: 137,
    imdb_url: 'https://www.imdb.com/title/tt0096283/?ref_=nv_sr_srsg_0',
    is_digital: false,
    is_expected: false,
    is_premier: false,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/8221/',
    release_id: 18259,
    released: '2020-10-22',
    site: '',
    title: 'Мой сосед Тоторо',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18260/4207022e81c0c381586859946.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18260/4207022e81c0c381586859946.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18260/preview_4207022e81c0c381586859946.jpg',
    },
    description:
      'В центре сюжета - история одного дня из жизни Елизаветы Петровны Глинки. История начинается с праздничного события: Елизавета и её муж Глеб готовятся отметить 30-ю годовщину их свадьбы. На домашний ужин приглашены близкие друзья, приезжают сыновья. Конечно, Лиза освободила этот день, чтобы провести его с семьёй. По плану у неё только одно дело – заехать на Павелецкий вокзал, ведь там сегодня Фонд доктора Лизы «Справедливая помощь» принимает пациентов. И эта поездка оказывается полна неожиданностей…',
    director: 'Оксана Карас',
    foreign_ratings: {
      imdb_rating: null,
      imdb_num_vote: null,
      kinopoisk_rating: 0.0,
      kinopoisk_num_vote: 127,
    },
    id: 138,
    imdb_url: 'https://www.imdb.com/title/tt12028944/?ref_=nv_sr_srsg_0',
    is_digital: false,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1254059/',
    release_id: 18260,
    released: '2020-10-22',
    site: '',
    title: 'Доктор Лиза',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18261/28fa26f02c2d6cac3b234101c38fbd04.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18261/28fa26f02c2d6cac3b234101c38fbd04.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18261/preview_28fa26f02c2d6cac3b234101c38fbd04.jpg',
    },
    description:
      'Фильм - парафраз виртуозности и поэтичности творческого процесса режиссера: кризис, поиск, каверзы воображения, тупики, интеллектуальный климат, неразрывный поток субъективного и объективного.\r\n\r\nИ, конечно, обилие женщин, окружающих героя, его иллюзорный гарем, в котором все без исключения любят его, хотя идиллия перемежается с бунтом, подавлять который приходится с помощью хлыста.',
    director: 'Федерико Феллини',
    foreign_ratings: {
      imdb_rating: 8.0,
      imdb_num_vote: 107148,
      kinopoisk_rating: 8.025,
      kinopoisk_num_vote: 23036,
    },
    id: 139,
    imdb_url: 'https://www.imdb.com/title/tt0056801/?ref_=nm_knf_i2',
    is_digital: false,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/535/',
    release_id: 18261,
    released: '2020-10-29',
    site: '',
    title: '8 с половиной',
    type: 'movie',
  },
  {
    cover: 'https://api.released.at/uploads/release/cover/18263/image__1_.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18263/image__1_.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18263/preview_image__1_.jpg',
    },
    description:
      'История о своенравном мальчике Питере, вступающем в борьбу за личное пространство с овдовевшим дедушкой, который переселяется в его любимую комнату. Желая вытеснить деда, Питер разворачивает целую кампанию шалостей, но малоподвижный старик оказывается куда изобретательнее, чем можно было предположить.',
    director: 'Тим Хилл',
    foreign_ratings: {
      imdb_rating: 5.5,
      imdb_num_vote: 5820,
      kinopoisk_rating: 5.604,
      kinopoisk_num_vote: 1236,
    },
    id: 141,
    imdb_url: 'https://www.imdb.com/title/tt4532038/?ref_=nv_sr_srsg_0',
    is_digital: false,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/998054/',
    release_id: 18263,
    released: '2020-10-29',
    site: '',
    title: 'Дедушка НЕлёгкого поведения',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18265/Batman-Death-in-the-Family-1280x720__1_.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18265/Batman-Death-in-the-Family-1280x720__1_.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18265/preview_Batman-Death-in-the-Family-1280x720__1_.jpg',
    },
    description:
      'В первом интерактивном мультфильме DC зритель сам выбирает судьбу Джейсона Тодда — второго Робина',
    director: 'Брэндон Виетти',
    foreign_ratings: {
      imdb_rating: null,
      imdb_num_vote: null,
      kinopoisk_rating: 0.0,
      kinopoisk_num_vote: 12,
    },
    id: 143,
    imdb_url: 'https://www.imdb.com/title/tt12794046/?ref_=rlm',
    is_digital: true,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1395475/',
    release_id: 18265,
    released: '2020-10-13',
    site: '',
    title: 'Бэтмен: Смерть в семье',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18268/books-of-blood-Cropped.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18268/books-of-blood-Cropped.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18268/preview_books-of-blood-Cropped.jpg',
    },
    description: 'Три страшные истории, запутанные в пространстве и времени.',
    director: 'Брэннон Брага',
    foreign_ratings: {
      imdb_rating: 5.6,
      imdb_num_vote: 2092,
      kinopoisk_rating: 5.915,
      kinopoisk_num_vote: 643,
    },
    id: 144,
    imdb_url: 'https://www.imdb.com/title/tt11242218/',
    is_digital: true,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1323020/',
    release_id: 18268,
    released: '2020-10-07',
    site: '',
    title: 'Книги крови',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18282/YA-2020-08-21-15h35m27s879-1200.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18282/YA-2020-08-21-15h35m27s879-1200.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18282/preview_YA-2020-08-21-15h35m27s879-1200.jpg',
    },
    description:
      'Это правдивая история троих друзей, снимающих вместе квартиру в Москве. Безработный Деня встречает беременную бывшую из Красноярка, диджей Виталик теряет деньги за хату, а режиссер Леша пытается вместо рекламы кондиционеров снять артхаусный фильм. Разобраться с проблемами друзьям мешают киргизы-заговорщики, врачи-сексисты, омоновцы-ГЛИЦИНисты и прочие небезопасные сограждане. А все это – ради того, чтобы каждый на утро проснулся счастливым.',
    director: ' Алексей Камынин',
    foreign_ratings: null,
    id: 145,
    imdb_url: 'https://www.kinopoisk.ru/film/1199541/',
    is_digital: false,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: '',
    release_id: 18282,
    released: '2020-10-01',
    site: '',
    title: 'Хандра',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18286/k3WrKMzIIdU.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18286/k3WrKMzIIdU.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18286/preview_k3WrKMzIIdU.jpg',
    },
    description:
      'Продолжение сатиры с Сашей Бароном Коэном выйдет за день до президентских выборов США, так что ожидаем обилие политических шуток.',
    director: 'Джейсон Уолинер',
    foreign_ratings: {
      imdb_rating: null,
      imdb_num_vote: null,
      kinopoisk_rating: 0.0,
      kinopoisk_num_vote: 3,
    },
    id: 149,
    imdb_url: 'https://www.imdb.com/title/tt13168426/',
    is_digital: true,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1421546/',
    release_id: 18286,
    released: '2020-10-23',
    site: '',
    title: 'Борат 2',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18294/2020_09_15_104255_1600141567._large.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18294/2020_09_15_104255_1600141567._large.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18294/preview_2020_09_15_104255_1600141567._large.jpg',
    },
    description:
      'Чикаго, 1968 год. Демонстрация против войны во Вьетнаме вылилась в стычки с полицией. Семь участников беспорядков предстают пред судом по обвинениям в заговоре против американского правительства\r\n\r\n',
    director: 'Аарон Соркин',
    foreign_ratings: {
      imdb_rating: 8.0,
      imdb_num_vote: 25068,
      kinopoisk_rating: 7.84,
      kinopoisk_num_vote: 1174,
    },
    id: 154,
    imdb_url: 'https://www.imdb.com/title/tt1070874/',
    is_digital: true,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/402981/',
    release_id: 18294,
    released: '2020-10-16',
    site: '',
    title: 'Суд над чикагской семёркой',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18295/AmericanUtopia2___Credit_David_Lee.0.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18295/AmericanUtopia2___Credit_David_Lee.0.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18295/preview_AmericanUtopia2___Credit_David_Lee.0.jpg',
    },
    description: 'Фильм-концерт Дэвида Бирна по его же сценарию.',
    director: 'Спайк Ли',
    foreign_ratings: {
      imdb_rating: null,
      imdb_num_vote: null,
      kinopoisk_rating: 0.0,
      kinopoisk_num_vote: 4,
    },
    id: 155,
    imdb_url: 'https://www.imdb.com/title/tt11874226/',
    is_digital: false,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1355113/',
    release_id: 18295,
    released: '2020-10-17',
    site: '',
    title: 'Американская утопия',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18296/013017_1001x563_637353544273264122.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18296/013017_1001x563_637353544273264122.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18296/preview_013017_1001x563_637353544273264122.jpg',
    },
    description:
      'Житель городка Салем Хьюби Дюбуа - добродушный парень и большой фанат Хэллоуина, а так же объект насмешек для взрослых и детей. Но когда на город обрушивается неизвестная угроза, которая может положить конец Дню всех святых, Хьюби становится единственным, кто может всех спасти.\r\n\r\n',
    director: 'Хэллоуин Хьюби',
    foreign_ratings: {
      imdb_rating: 5.2,
      imdb_num_vote: 23728,
      kinopoisk_rating: 5.351,
      kinopoisk_num_vote: 2142,
    },
    id: 156,
    imdb_url: 'https://www.imdb.com/title/tt10682266/',
    is_digital: true,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1290806/',
    release_id: 18296,
    released: '2020-10-07',
    site: '',
    title: 'Хэллоуин Хьюби',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18297/Sofia-Coppola.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18297/Sofia-Coppola.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18297/preview_Sofia-Coppola.jpg',
    },
    description:
      'Лаура думает, что она счастлива замужем, но, когда её муж Дин начинает проводить вечера в офисе с новой коллегой, в её голову закрадываются сомнения. Лаура обращается за помощью к своему харизматичному и импульсивному отцу Феликсу, который предлагает начать слежку за Дином. Когда отец и дочь отправляются в приключение по ночному Нью-Йорку, неожиданно для себя они обнаруживают, что в основе этого путешествия лежат их собственные отношения.\r\n\r\n',
    director: 'София Коппола',
    foreign_ratings: {
      imdb_rating: 6.8,
      imdb_num_vote: 1322,
      kinopoisk_rating: 0.0,
      kinopoisk_num_vote: 30,
    },
    id: 157,
    imdb_url: 'https://www.imdb.com/title/tt9606374/',
    is_digital: true,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1228685/',
    release_id: 18297,
    released: '2020-10-23',
    site: '',
    title: 'Последняя капля',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18298/685aceeb5140c69a79d17d4c89aae071cd-rebecca-2.2x.rsocial.w600.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18298/685aceeb5140c69a79d17d4c89aae071cd-rebecca-2.2x.rsocial.w600.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18298/preview_685aceeb5140c69a79d17d4c89aae071cd-rebecca-2.2x.rsocial.w600.jpg',
    },
    description:
      'Максимиллиан де Уинтер недавно потерял жену Ребекку. Он приезжает в Монте-Карло, где встречает миссис Ван Хоппер и её юную компаньонку. Постепенно Максимиллиан так увлекается молодой особой, что в конце концов женится на ней. Он и новоиспеченная миссис де Уинтер возвращаются в Мэндэрли, владение семьи де Уинтер в Корнуэлле. Там девушку начинает преследовать и подавлять присутствие Ребекки, которое она находит абсолютно во всем.\r\n\r\n',
    director: 'Бен Уитли',
    foreign_ratings: {
      imdb_rating: 5.9,
      imdb_num_vote: 2775,
      kinopoisk_rating: 6.402,
      kinopoisk_num_vote: 286,
    },
    id: 158,
    imdb_url: 'https://www.imdb.com/title/tt2235695/',
    is_digital: true,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/667045/',
    release_id: 18298,
    released: '2020-10-21',
    site: '',
    title: 'Ребекка',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18299/King-of-Staten-Island-Pete-Davidson-Review.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18299/King-of-Staten-Island-Pete-Davidson-Review.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18299/preview_King-of-Staten-Island-Pete-Davidson-Review.jpg',
    },
    description:
      '24-летний инфантил по имени Скотт живёт с мамой и младшей сестрой в нью-йоркском районе Стейтен-Айленд. С самого детства парень не может смириться со смертью отца-пожарного и теперь всё время проводит за курением травки и набиванием друзьям кривых татуировок. Когда сестра уезжает в колледж, а его мама впервые после смерти мужа начинает встречаться с мужчиной, тоже пожарным, Скотт решает, что такие перемены в жизни ему не нужны, и теперь он будет пытаться расстроить мамины отношения.\r\n\r\n',
    director: 'Джадд Апатоу',
    foreign_ratings: {
      imdb_rating: 7.1,
      imdb_num_vote: 25821,
      kinopoisk_rating: 6.898,
      kinopoisk_num_vote: 3051,
    },
    id: 159,
    imdb_url: 'https://www.imdb.com/title/tt9686708/',
    is_digital: false,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/1236644/',
    release_id: 18299,
    released: '2020-10-22',
    site: '',
    title: 'Король Стейтен-Айленда',
    type: 'movie',
  },
  {
    cover:
      'https://api.released.at/uploads/release/cover/18318/0b28a04547f2-%D0%92%D0%B5%D0%B4%D1%8C%D0%BC%D1%8B.jpg',
    covers: {
      default:
        'https://api.released.at/uploads/release/cover/18318/0b28a04547f2-%D0%92%D0%B5%D0%B4%D1%8C%D0%BC%D1%8B.jpg',
      preview:
        'https://api.released.at/uploads/release/cover/18318/preview_0b28a04547f2-%D0%92%D0%B5%D0%B4%D1%8C%D0%BC%D1%8B.jpg',
    },
    description:
      'Новая адаптация романа Роальда Даля от Роберта Земекиса. В производстве фильма также задействованы Альфонсо Куарон и Гильермо дель Торо.',
    director: 'Роберт Земекис',
    foreign_ratings: {
      imdb_rating: 5.1,
      imdb_num_vote: 459,
      kinopoisk_rating: 0.0,
      kinopoisk_num_vote: 25,
    },
    id: 160,
    imdb_url: 'https://www.imdb.com/title/tt0805647/',
    is_digital: true,
    is_expected: false,
    is_premier: true,
    kinopoisk_url: 'https://www.kinopoisk.ru/film/279091/',
    release_id: 18318,
    released: '2020-10-29',
    site: '',
    title: 'Ведьмы',
    type: 'movie',
  },
]

export const filmsJSON = groupBy('released')(
  films
    .sort((a, b) => compareAsc(new Date(a.released), new Date(b.released)))
    .map(release => releaseAdapter(release, 'films')),
)
