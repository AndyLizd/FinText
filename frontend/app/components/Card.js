import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AppText from "../components/AppText";


const Card = ({ stock, price, percentage, sentiment }) => {
  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <AppText style={{marginBottom:5}}>{stock}</AppText>
      </View>
      <View >
          <View style={styles.rightSide}>
            <AppText style={{marginBottom:5, marginRight:5, fontSize:22}}>${price}</AppText>
            <AppText style={{marginBottom:5, fontSize:14, color:"#b3005a"}}>+{percentage}%</AppText>
          </View>
          <View style={styles.rightSide}>
            <AppText style={{marginBottom:5, marginRight:5, fontSize:16, color:'yellow'}}>Sentiment:{sentiment}</AppText>
          </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#212121",
    // borderRadius: 25,
    marginBottom: 5,
    marginTop:5,
    borderColor:'#660035',
    borderWidth:5,
    // overflow:"hidden",
    flexDirection:"row",
    width:'100%',
    justifyContent:"space-between"
  },
  detailsContainer: {
    padding: 15,
  },
  rightSide:{
      flex:1,
      flexDirection:'row',
    //   padding:3,
    
  },
  image: {
    height: 200,
    width: "100%",
  },
});

export default Card;