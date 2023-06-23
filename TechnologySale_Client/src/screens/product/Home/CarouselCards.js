import React,{useState,useRef,useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { getBanner } from '../ProductSevice'

export const SLIDER_WIDTH = Dimensions.get('window').width - 20
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH)
export const width = Dimensions.get('window').width;
const CarouselCards = () => {
  const [banner, setBanner] = useState([]);
  const [index, setIndex] = useState(0)
  const isCarousel = useRef(null)

  useEffect(() => {
    onGetBanner()
  }, []);

  const onGetBanner = async () => {
    getBanner()
      .then(res => {
        let data = res;
        setBanner(data);
      })
      .catch(err => {
        console.log('ErorrGetBanner: ', err)
      });
      // console.log('banner',banner)
 }

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={{}} key={index}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
      </View>
    )
  }

  return (
    <View style = {{height: 270}}>
      <Carousel
        layout= 'default'
        ref={isCarousel}
        data={banner}
        mode = 'parallax'
        autoplay = {true}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={banner.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
          bottom: 20
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  )
}

export default CarouselCards

const styles = StyleSheet.create({
    image: {
      borderRadius: 12,
      width: SLIDER_WIDTH ,
      height: width/2,
    },
  
  })