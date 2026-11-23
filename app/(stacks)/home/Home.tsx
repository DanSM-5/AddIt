import InputMenuOption from "@/components/game/InputMenuOption";
import { useThemeColors } from "@/hooks/useThemeColors";
import { DIFFICULTIES } from "@/language";
import { useIsPortrait, useLanguage } from "@/providers/SystemConfig";
import { GameSettings } from "@/types/GameSettings";
import { setGameSettings } from "@/utils/prevCustomConfig";
import { useRouter } from "expo-router";
import isEqual from "lodash.isequal";
import { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";

const { CUSTOM } = DIFFICULTIES;
// Space kept free above and below the custom game popup
const POPUP_MARGIN = 40;

const Home = () => {
  const isPortrait = useIsPortrait();
  const [open, setOpen] = useState(false);
  const { difficulties } = useLanguage().dictionary;
  const router = useRouter();
  const colors = useThemeColors();
  const { width, height } = useWindowDimensions();

  const onDificulty = useCallback(
    (difficulty: Exclude<GetValues<typeof DIFFICULTIES>, typeof CUSTOM>) => {
      router.navigate({
        pathname: "/game",
        params: {
          difficulty,
        },
      });
    },
    [router],
  );

  const onContinue = useCallback(
    async (settings: GameSettings, prev: GameSettings) => {
      setOpen(false);

      if (!isEqual(settings, prev)) {
        // no need to await the promise
        setGameSettings(settings);
      }

      router.navigate({
        pathname: "/game",
        params: {
          ...settings,
          difficulty: CUSTOM,
        },
      });
    },
    [router],
  );

  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const difficultyButtons = useMemo(() => {
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

    const buttonColors = {
      backgroundColor: colors.primary,
      borderColor: colors.outline,
    };
    const textColor = { color: colors.onPrimary };
    // Keep the custom game popup inside short (landscape) windows; its
    // content scrolls when there is not enough room.
    const popupSize = isPortrait ? styles.popupMenuPortrait : styles.popupMenuLandscape;
    const popupHeight = { height: Math.min(popupSize.height, height - POPUP_MARGIN) };

    return (Object.keys(difficulties) as (keyof typeof difficulties)[]).map(
      (dif: keyof typeof difficulties, index) =>
        dif !== CUSTOM ? (
          <TouchableOpacity
            key={index}
            onPress={() => onDificulty(dif)}
            style={[
              styles.button,
              buttonColors,
              isPortrait
                ? dynamicStyles.btnPortrait
                : dynamicStyles.btnLandscape,
            ]}
          >
            <Text style={[styles.text, textColor]}>{difficulties[dif]}</Text>
          </TouchableOpacity>
        ) : (
          <Menu
            key={index}
            opened={open}
            onBackdropPress={() => setOpen(false)}
            renderer={renderers.Popover}
            rendererProps={{ anchorStyle: { backgroundColor: colors.surface } }}
          >
            {isPortrait ? <MenuTrigger /> : null}
            <TouchableOpacity
              style={[
                styles.button,
                buttonColors,
                isPortrait
                  ? dynamicStyles.btnPortrait
                  : dynamicStyles.btnLandscape,
              ]}
              onPress={() => setOpen(true)}
            >
              <Text style={[styles.text, textColor]}>{difficulties[dif]}</Text>
            </TouchableOpacity>
            {isPortrait ? null : <MenuTrigger />}
            <MenuOptions
              customStyles={{
                optionsContainer: [
                  popupSize,
                  popupHeight,
                  { backgroundColor: colors.surface },
                ],
                optionsWrapper: styles.menuOptionsWrapper,
              }}
            >
              <InputMenuOption onCancel={onCancel} onContinue={onContinue} />
            </MenuOptions>
          </Menu>
        ),
    );
  }, [difficulties, isPortrait, open, onContinue, onDificulty, onCancel, colors, width, height]);

  return (
    <ScrollView contentContainerStyle={styles.scrollScreen}>
      <View style={[styles.container, { backgroundColor: colors.screen }]}>{difficultyButtons}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    borderStyle: "solid",
    borderWidth: 6,
    marginVertical: 20,
  },
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    alignContent: "center",
  },
  scrollScreen: {
    flexGrow: 1,
  },
  scrollView: {
    flexGrow: 1,
    marginTop: 15,
  },
  menuOptionsWrapper: {
    height: "100%",
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
