import { Snackbar } from "react-native-paper";
import { StyleSheet, View} from "react-native";

interface Props {
  open: boolean;
  setDismiss: (newValue: boolean) => void;
}

export default function SnackbarProduct({ open, setDismiss }: Props) {
  return (
    <View style={style.container}>
      <Snackbar
        visible={open}
        onDismiss={() => setDismiss(false)}
        action={{label: "Agree",textColor:"#fff"}}
        style={{
            backgroundColor:"red",   
        }}
      >
        item is already in the cart.
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
