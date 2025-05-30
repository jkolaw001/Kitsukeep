import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Carousel } from 'react-bootstrap';

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
        search: "Search for anime"
      },
      home: {
        title: "Welcome to Kitsukeep",
        subtitle: "Your ultimate anime tracking companion",
        getStarted: "Get Started"
      },
      carousel: {
        watchTrailer: "Watch Trailer",
        moreInfo: "More Info",
        rating: "Rating",
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
