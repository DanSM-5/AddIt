import {
  defaultLanguage,
  DictionaryContent,
  language as languageModule,
  Locale,
  LOCALE,
  SupportedLanguage,
} from "@/language";
import { isPortrait } from "@/utils/screenOrientation";
import { createContext, Dispatch, PropsWithChildren, useCallback, useContext, useReducer } from "react";
import { StyleSheet, View } from "react-native";

const language = languageModule.language;

interface LanguageContextType {
  dictionary: DictionaryContent;
  language: SupportedLanguage;
  locale: Locale;
}

interface SystemContext {
  language: LanguageContextType;
  orientation: boolean;
}

const initalState: SystemContext = {
  language: {
    dictionary: language[defaultLanguage],
    language: defaultLanguage,
    locale: LOCALE[defaultLanguage],
  },
  orientation: false,
}

const LanguageContext = createContext(initalState.language);
const OrientationContext = createContext(false);
const SystemDispatchContext = createContext<Dispatch<Action>>(() => {});

interface ActionOrientation {
  type: 'orientation',
  payload: boolean,
}

interface ActionLanguage {
  type: 'dictionary',
  payload: SupportedLanguage,
}

type Action = ActionLanguage | ActionOrientation;

const unhandledAction = (never: never) => {
  console.error('Unknonw action received:', never);
  throw new Error('Unknonw action received');
};

const reducer = (state: SystemContext, action: Action): SystemContext => {
  const { type } = action;
  switch (type) {
    case 'dictionary': {
      const { payload } = action;

      return {
        ...state,
        language: {
          language: payload,
          locale: LOCALE[payload],
          dictionary: language[payload],
        }
      };
    }
    case 'orientation': {
      return {
        ...state,
        orientation: action.payload,
      }
    }
    default:
      return unhandledAction(type)
  }
}

const internalSystemContext: { current: SystemContext } = { current: initalState };

const SystemConfigProvider = ({ children }: PropsWithChildren ) => {
  const [context, dispatch] = useReducer(reducer, initalState);
  const onOrientationChanged = useCallback(() => {
    dispatch({
      type: 'orientation',
      payload: isPortrait(),
    });
  }, []);

  if (__DEV__ && typeof window !== 'undefined') {
    (window as any)._systemContext = context;
  }
  internalSystemContext.current = context;

  return (
    <>
      <View style={styles.hidden} onLayout={onOrientationChanged}></View>
      <LanguageContext.Provider value={context.language}>
        <OrientationContext.Provider value={context.orientation}>
          <SystemDispatchContext.Provider value={dispatch}>
            {children}
          </SystemDispatchContext.Provider>
        </OrientationContext.Provider>
      </LanguageContext.Provider>
    </>
  );
};

const useLanguage = (): LanguageContextType => {
  const language = useContext(LanguageContext);
  return language;
};

const useIsPortrait = (): boolean => {
  const isPortrait = useContext(OrientationContext);
  return isPortrait;
};

const useSystemDispatch = () => {
  const dispatch = useContext(SystemDispatchContext);
  return dispatch;
}

const systemContext: { readonly current: SystemContext } = internalSystemContext;

const styles = StyleSheet.create({
  hidden: {
    visibility: 'hidden',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  }
});

export {
  SystemConfigProvider,
  systemContext,
  useIsPortrait,
  useLanguage,
  useSystemDispatch
};

