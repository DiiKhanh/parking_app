import {SmartCar, StopCircle, Location} from 'iconsax-react-native';
import React from 'react';
import {
  CardComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfos';
import {EventModel} from '../models/EventModel';
import {Image, ImageBackground, StyleProp, View, ViewStyle} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {DateTime} from '../utils/DateTime';
import {useSelector} from 'react-redux';
import {numberToString} from '../utils/numberToString';

interface Props {
  item: EventModel;
  type: 'card' | 'list';
  styles?: StyleProp<ViewStyle>;
}

const EventItem = (props: Props) => {
  const {item, type, styles} = props;

  const navigation: any = useNavigation();
  // console.log(item)

  const empty = item.parkinglot_counts.find(i => i.class === "empty");
  const occupied = item.parkinglot_counts.find(i => i.class === "occupied");

  return (
    <CardComponent
      isShadow
      styles={[{width: appInfo.sizes.WIDTH*0.95}, styles, item.fire_detected ? { borderStyle: 'solid', borderWidth: 2, borderColor: 'red' } : null]}
      onPress={() => navigation.navigate('EventDetail', {item: item})}
      >
      {type === 'card' ? (
        <>
          <ImageBackground
            style={{flex: 1, marginBottom: 2, height: 150, padding: 10}}
            source={{uri: item.image_url}}
            imageStyle={{
              resizeMode: 'cover',
              objectFit:"contain",
              borderRadius: 12,
            }}>
              {
                item.fire_detected && <CardComponent
                styles={[globalStyles.noSpaceCard]}
                color="red">
                <TextComponent
                  color={appColors.danger2}
                  font={fontFamilies.bold}
                  size={18}
                  text={"🔥"}
                />
              </CardComponent>
              }
            </ImageBackground>
          <TextComponent numOfLine={1} text={`Area ${item.area}`} title size={18} />
          <RowComponent >
            <SmartCar size={14} color={appColors.text3} variant="Bold" />
            <SpaceComponent width={8} />
            <TextComponent
              numOfLine={1}
              text={"Đã đậu: "}
              size={14}
              color={appColors.text2}
            />
            <TextComponent
              flex={1}
              numOfLine={1}
              text={`${occupied?.count}`}
              size={14}
              color={appColors.primary}
            />
          </RowComponent>
          <RowComponent>
            <StopCircle size={14} color={appColors.text3} variant="Bold" />
            <SpaceComponent width={8} />
            <TextComponent
              numOfLine={1}
              text={"Còn trống: "}
              size={14}
              color={appColors.text2}
            />
            <TextComponent
              flex={1}
              numOfLine={1}
              text={`${empty?.count}`}
              size={14}
              color={appColors.primary}
            />
          </RowComponent>
        </>
      ) : (
        <>
          <RowComponent>
            <Image
              source={{uri: item.image_url}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                resizeMode: 'cover',
              }}
            />
            <SpaceComponent width={12} />
            <View
              style={{
                flex: 1,
                alignItems: 'stretch',
              }}>
              <TextComponent
                color={appColors.primary}
                text={`1`}
              />
              <TextComponent text={item.area} title size={18} numOfLine={2} />
              <RowComponent>
                <Location size={18} color={appColors.text3} variant="Bold" />
                <SpaceComponent width={8} />
                <TextComponent
                  flex={1}
                  numOfLine={1}
                  text={item.area}
                  size={12}
                  color={appColors.text2}
                />
              </RowComponent>
            </View>
          </RowComponent>
        </>
      )}
    </CardComponent>
  );
};

export default EventItem;