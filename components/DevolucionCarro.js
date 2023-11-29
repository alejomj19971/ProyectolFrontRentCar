import { View, Picker } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "../assets/styles/allstyles";
import { TextInput, Button, Text, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function DevolucionCarro() {
  // Funciones navegación
  const navigation = useNavigation();

  const irListaDisponibles = () => {
    navigation.navigate("ListaDisponibles");
  };

  //UseState
  const [errormessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [numeroRenta, setNumeroRenta] = useState([]);
  const [numeroRentaSeleccionado, setNumeroRentaSeleccionado] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [consulto, setConsulto] = useState(false);

  //Controlador
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      returndate: "",
    },
  });

  useEffect(() => {
    traerNumeroRenta();
  }, []);

  //Funciones

  const traerNumeroRenta = async () => {
    try {
      const response = await axios.get(
        `https://vercel-backend-rent-car.vercel.app/api/rents/listarentnumber`
      );

      if (response != undefined) {
        const numeroRenta = response.data;
        setNumeroRenta(numeroRenta);
        setConsulto(true);
;
      } else {
        errormessage = true;
        setErrorMessage(
          "Este Vehiculo no se encuentra rentado verifique la placa"
        );
        setTimeout(() => {
          setConsulto(false);
          setErrorMessage("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
    }
  };

  const renderizarIdsEnPicker = () => {
    if(numeroRenta.length>0){
      return numeroRenta.map((renta) => (
        <Picker.Item
          key={renta._id}
          label={renta.platenumber}
          value={renta.rentnumber}
        />
      ));

    }else {

      return(  
      <Picker.Item
      label="No hay autos disponibles"
      value=""

    />)
    }
    
  };

  function generarCadenaUnica() {
    const timestamp = Date.now().toString(); // Obtiene el timestamp actual como cadena
    const numeroAleatorio = Math.floor(Math.random() * 1000).toString(); // Genera un número aleatorio como cadena
    return timestamp + numeroAleatorio;
  }


  // Registrar devolucion

  const registrarDevolucion = async (data) => {
    const {returndate } = data;

    let fechaLista = new Date(returndate);
    let fechaLimite1 = new Date(fechaLimite);

    let fechaDevolucionCompara = new Date(
      fechaLista.getFullYear(),
      fechaLista.getMonth(),
      fechaLista.getDate()
    );

    let fechaLimiteCompara = new Date(
      fechaLimite1.getFullYear(),
      fechaLimite1.getMonth(),
      fechaLimite1.getDate()
    );
    const numberRenta = numeroRenta.find((renta)=>(renta.rentnumber === numeroRentaSeleccionado))
    console.log({numberRenta})
    const datos = {
      returndate: fechaLista,
      rentnumber: numeroRentaSeleccionado,
      platenumber: numberRenta.platenumber,
      returnnumber: generarCadenaUnica(),
    };
    console.log("axios", datos);

    if (consulto == true) {
      console.log("pase por aqui verifque consultar");
      //if (fechaDevolucionCompara >= fechaLimiteCompara) {
        console.log("Llego aqui");
        try {
          console.log("pase por aqui antes del axios");
          const response = await axios.post(
            `https://vercel-backend-rent-car.vercel.app/api/returns/returncar`,
            datos
          );
          console.log(response.data.error);
          if (response.data.error == false) {
            setErrorMessage(false);
            setMessage("Devolución Exitosa");
            reset();
            setTimeout(() => {
              setMessage("");
            }, 2000);
          } else {
            setErrorMessage(true);
            setMessage("Hubo un error verifique la placa");
            setTimeout(() => {
              setMessage("");
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      } /*else {
        setErrorMessage(true);
        setMessage(
          "El vehiculo ha sido devuelto debe pagar intereses equivalente al tiempo adicional"
        );
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } */else {
      setErrorMessage(true);
      setMessage("Por favor busque el vehiculo antes de devolverlo");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 40,
          backgroundColor: "#FFFFFF",
          borderCurve: "continuous",
          borderRadius: 20,
          border: "none",
          shadowRadius: 2,
          shadowColor: "#6366f1",
        }}
      >
        <Text
          variant="titleLarge"
          style={{
            marginBottom: 10,
            marginTop: 10,
            fontSize: 25,
            color: "#f16366",
            textAlign: "center",
          }}
        >
          Devolver Vehiculo
        </Text>

        <Text
          style={{
            marginBottom: 5,
            margintTop: 5,
            textAlign: "center",
            color: errormessage ? "#f16366" : "#6366f1",
          }}
        >
          {message}
        </Text>

        {/*rentnumber */}
        <Picker
          style={{
            marginTop: 10,
            fontSize: 15,
            borderWidth: 1,
            width: "100%",
            borderColor: "#79747E",
            borderRadius: 8,
            padding: 12,
            color: "#333333",
          }}
          selectedValue={numeroRentaSeleccionado}
          onValueChange={(valorSeleccionado) =>
            setNumeroRentaSeleccionado(valorSeleccionado)
          }
        >
          <Picker.Item
            label="Seleccione placa vehiculo"
            value="none"
          />
          {renderizarIdsEnPicker()}
        </Picker>

        <TextInput
          value={numeroRentaSeleccionado}
          label="Número de Renta"
          mode="outlined"
          textColor="#333333"
          activeOutlineColor="#6366f1"
          right={<TextInput.Icon icon="numeric-1-box" />}
          disabled="true"
        />

        {/*returndate*/}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginTop: 10 }}>
              <SafeAreaProvider>
                <DatePickerInput
                  mode="outlined"
                  locale="es"
                  label="Fecha"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  inputMode="start"
                  
                />
              </SafeAreaProvider>
            </View>
          )}
          name="returndate"
        />
        {errors.returndate?.type === "required" && (
          <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>Este Campo es Obligatorio</Text>
        )}

        <Button
          style={[
            { marginTop: 20, backgroundColor: "#6366f1", border: "none" },
          ]}
          icon="send"
          mode="outlined"
          onPress={handleSubmit(registrarDevolucion)}
          labelStyle={{ color: "white" }}
        >
          GUARDAR DEVOLUCIÓN
        </Button>
      </View>
    </View>
  );
}
