import { Snackbar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { resetSuccess } from "../../redux/slices/userSlice";
import { useAppDispacth } from "../../redux/store";


interface Props {
  open: boolean;
  setDismiss: (newValue: boolean) => void;
}

export default function SnackbarProfile({ open, setDismiss }: Props) {

  const dispatch = useAppDispacth()

  return (
    <View style={style.container}>
      <Snackbar
        visible={open}
        onDismiss={() => setDismiss(false)}
        action={{
          label: "Agree", textColor: "#fff", onPress: async () => {
            await dispatch(resetSuccess())
          }
        }}
        style={{
          backgroundColor: "green",
        }}

      >
        <Text variant="labelLarge" style={{ color: "#fff" }}>Changed successfully.</Text>
      </Snackbar>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
