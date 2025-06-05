import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Carousel } from 'react-bootstrap';
import AnimeSearch from './anime-search';

const resources = {
  en: {
    translation: {
      header: {
        logo: "Kitsukeep",
        watchlist: "Watchlist",
        playlists: "Playlists",
        someStuff: "Some Stuff",
        logout: "Logout",
        signup: "Signup",
        login: "Login",
        search: "Search anime by name"
      },
      home: {
        title: "Welcome to Kitsukeep",
        subtitle: "Your ultimate anime tracking companion",
        getStarted: "Get Started"
      },
      carousel: {
        watchTrailer: "WATCH TRAILER",
        add: "ADD TO WATCHLIST",
        genre: "Genre"
      },
      contentarea: {
        sectiontitle: "Explore Recent Additions",
        sectionsubtitle: "Relive the Magic"
      },
      AnimeSearch: {
        search: "Search anime by name"
      },
      watchlist: {
        title: "Your Keep"
      },
      detailsfromwatchlist: {
        note: "Add a Note",
        remove: "Remove From Watchlist"
      },
      detailsfromhome: {
        watchtrailer: "Watch Trailer",
        add: "Add To Watchlist",
        genre: "Genre",
        rating: "Rating",
        description: "Description"
      },
      searchresults: {
        title: "Results for "
      },
      detailsfromsearch: {
        genre: "Genre",
        rating: "Rating",
        description: "Description",
        watch: "Watch Trailer",
        add: "Add To Watchlist"
      }
    }
  },
  es: {
    translation: {
      header: {
        logo: "Kitsukeep",
        watchlist: "Lista de Seguimiento",
        playlists: "Listas de Reproducción",
        someStuff: "Algo Más",
        logout: "Cerrar Sesión",
        signup: "Registrarse",
        login: "Iniciar Sesión",
        search: "Buscar: Buscar anime"

      },
      home: {
        title: "Bienvenido a Kitsukeep",
        subtitle: "Tu compañero definitivo para seguir anime",
        getStarted: "Comenzar"
      },
      carousel: {
        watchTrailer: "Ver tráiler",
        moreInfo: "Más información",
        rating: "Clasificación",
        genre: "Género",
        add: "agregar a la lista de seguimiento",
      },
      contentarea: {
        sectiontitle: "Explora Nuevas Adiciones",
        sectionsubtitle: "Revive la Magia"
      },
      AnimeSearch: {
        search: "Buscar anime por nombre"
      },
      watchlist: {
        title: "Tu Torreón"
      },
      detailsfromwatchlist: {
        note: "Agregar una Nota",
        remove: "Eliminar de la Lista"
      },
      detailsfromhome: {
        watchtrailer: "Ver Tráiler",
        add: "Agregar a la Lista",
        genre: "Género",
        rating: "Calificación",
        description: "Descripción"
      },
      searchresults: {
        title: "Resultados para "
      },
      detailsfromsearch: {
        genre: "Género",
        rating: "Calificación",
        description: "Descripción",
        watch: "Ver Tráiler",
        add: "Agregar a la Lista"
      }
    }
  },
  ja: {
    translation: {
      header: {
        logo: "Kitsukeep",
        watchlist: "ウォッチリスト",
        playlists: "プレイリスト",
        someStuff: "その他",
        logout: "ログアウト",
        signup: "サインアップ",
        login: "ログイン",
        search: "検索：「アニメを検索」"
      },
      home: {
        title: "Kitsukeepへようこそ",
        subtitle: "アニメ追跡の究極のパートナー",
        getStarted: "始める"
      },

      carousel: {
        watchTrailer: "トレーラーを見る",
        moreInfo: "もっと詳しく",
        rating: "評価",
        genre: "ジャンル",
        add: "ウォッチリストに追加"
      },
      contentarea: {
        sectiontitle: "最近追加されたアニメを探す",
        sectionsubtitle: "魔法をもう一度体験しよう"
      },
      AnimeSearch: {
        search: "名前でアニメを検索"
      },
      watchlist: {
        title: "あなたのキープ"
      },
      detailsfromwatchlist: {
        note: "メモを追加",
        remove: "ウォッチリストから削除"
      },
      detailsfromhome: {
        watchtrailer: "予告編を見る",
        add: "ウォッチリストに追加",
        genre: "ジャンル",
        rating: "評価",
        description: "説明"
      },
      searchresults: {
        title: "の検索結果"
      },
      detailsfromsearch: {
        genre: "ジャンル",
        rating: "評価",
        description: "説明",
        watch: "予告編を見る",
        add: "ウォッチリストに追加"
      }
    }
  },
  ko: {
    translation: {
      header: {
        logo: "Kitsukeep",
        watchlist: "시청 목록",
        playlists: "재생 목록",
        someStuff: "기타",
        logout: "로그아웃",
        signup: "회원가입",
        login: "로그인",
        search: "검색: 애니메이션 검색"

      },
      home: {
        title: "Kitsukeep에 오신 것을 환영합니다",
        subtitle: "당신의 궁극적인 애니메이션 추적 동반자",
        getStarted: "시작하기"
      },

      carousel: {
        watchTrailer: "예고편 보기",
        moreInfo: "추가 정보",
        rating: "평가",
        genre: "장르",
        add: "시청 목록에 추가",


      },
      contentarea: {
        sectiontitle: "최근 추가된 콘텐츠 탐색",
        sectionsubtitle: "마법을 다시 느껴보세요"
      },
      AnimeSearch: {
        search: "이름으로 애니메이션 검색"
      },
      watchlist: {
        title: "당신의 성"
      },
      detailsfromwatchlist: {
        note: "메모 추가",
        remove: "시청 목록에서 제거"
      },
      detailsfromhome: {
        watchtrailer: "예고편 보기",
        add: "시청 목록에 추가",
        genre: "장르",
        rating: "평점",
        description: "설명"
      },
      searchresults: {
        title: "검색 결과: "
      },
      detailsfromsearch: {
        genre: "장르",
        rating: "평점",
        description: "설명",
        watch: "예고편 보기",
        add: "시청 목록에 추가"
      }
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;
