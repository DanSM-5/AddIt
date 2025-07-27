import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { GameSettings } from "@/types/GameSettings";
import { setGameSettings } from "@/utils/prevCustomConfig";
import isEqual from "lodash.isequal";
import { useCallback, useMemo, useState } from "react";
import { DIFFICULTIES } from '@/language';
import { Menu, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';
import InputMenuOption from '@/components/game/InputMenuOption';
import { useIsPortrait, useLanguage } from '@/providers/SystemConfig';

const { CUSTOM } = DIFFICULTIES;

const Home = () => {
  const isPortrait = useIsPortrait();
  const [open, setOpen] = useState(false);
  const { difficulties } = useLanguage().dictionary;
  const router = useRouter();
  
  const onDificulty = useCallback((difficulty: Exclude<GetValues<typeof DIFFICULTIES>, typeof CUSTOM>) => {
    router.navigate({
      pathname: '/game',
      params: {
        difficulty,
      },
    })
  }, [router]);

  const onContinue = useCallback(
    async (settings: GameSettings, prev: GameSettings) => {
      setOpen(false);

      if (!isEqual(settings, prev)) {
        // no need to await the promise
        setGameSettings(settings);
      }

      router.navigate({
        pathname: '/game',
        params: {
          ...settings,
          difficulty: CUSTOM,
        },
      })
    },
    [router]
  );

  const onCancel = () => {
    setOpen(false);
  };

  const difficultyButtons = useMemo(() => {
    const { width, height } = Dimensions.get("window");

    const dynamicStyles = StyleSheet.create({
      btnPortrait: {
        height: Math.round(height) * 0.15,
        width: Math.round(width) * 0.8,
      },
      btnLandscape: {
        height: Math.round(height) * 0.3,
        width: Math.round(width) * 0.6,
      },
    });

    return (Object.keys(difficulties) as (keyof typeof difficulties)[]).map(
      (dif: keyof typeof difficulties, index) =>
        dif !== CUSTOM ? (
          <TouchableOpacity
            key={index}
            onPress={() => onDificulty(dif)}
            style={[
              styles.button,
              isPortrait
                ? dynamicStyles.btnPortrait
                : dynamicStyles.btnLandscape,
            ]}
          >
            <Text style={styles.text}>{difficulties[dif]}</Text>
          </TouchableOpacity>
        ) : (
          <Menu
            key={index}
            opened={open}
            onBackdropPress={() => setOpen(false)}
            renderer={renderers.Popover}
          >
            {isPortrait ? <MenuTrigger /> : null}
            <TouchableOpacity
              style={[
                styles.button,
                isPortrait
                  ? dynamicStyles.btnPortrait
                  : dynamicStyles.btnLandscape,
              ]}
              onPress={() => setOpen(true)}
            >
              <Text style={styles.text}>{difficulties[dif]}</Text>
            </TouchableOpacity>
            {isPortrait ? null : <MenuTrigger />}
            <MenuOptions
              customStyles={{
                optionsContainer: isPortrait
                  ? styles.popupMenuPortrait
                  : styles.popupMenuLandscape,
                optionsWrapper: styles.menuOptionsWrapper
              }}
            >
              <InputMenuOption
                onCancel={onCancel}
                onContinue={onContinue}
              />
            </MenuOptions>
          </Menu>
        )
    );
  }, [difficulties, isPortrait, open, onContinue, onDificulty]);

  return (
    <ScrollView contentContainerStyle={styles.scrollScreen}>
      <View style={styles.container}>
        {difficultyButtons}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 50,
  },
  button: {
    backgroundColor: '#2089dc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    color: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 6,
    marginVertical: 20,
  },
  container: {
    backgroundColor: '#fbeec1',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  scrollScreen: {
    flexGrow: 1,
  },
  scrollView: {
    flexGrow: 1,
    marginTop: 15,
  },
  menuOptionsWrapper: {
    height: '100%',
  },
  popupMenuPortrait: {
    borderRadius: 30,
    height: 500,
    width: 250,
    padding: 15,
  },
  popupMenuLandscape: {
    borderRadius: 30,
    height: 400,
    width: 350,
    padding: 15,
  },
});

export { Home };
export default Home;