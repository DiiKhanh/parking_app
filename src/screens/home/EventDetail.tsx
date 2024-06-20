import {SmartCar, StopCircle, Location, ArrowLeft} from 'iconsax-react-native';
import React from 'react';
import {
  CardComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfo} from '../../constants/appInfos';
import {EventModel} from '../../models/EventModel';
import {Image, ImageBackground, StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {DateTime} from '../../utils/DateTime';
import {useSelector} from 'react-redux';
import {numberToString} from '../../utils/numberToString';

interface Props {
  item: EventModel;
  type: 'card' | 'list';
  styles?: StyleProp<ViewStyle>;
}

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;
  const empty = item.parkinglot_counts.find(i => i.class === "empty");
  const occupied = item.parkinglot_counts.find(i => i.class === "occupied");

  return (
    <>
    <View style={{flex: 1, backgroundColor: '#fff'}}>
        <RowComponent
            styles={{
              padding: 16,
              alignItems: 'flex-start',
              paddingTop: 42,
            }}>
              <RowComponent styles={{flex: 1, justifyContent:"flex-start"}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.canGoBack()
                    ? navigation.goBack()
                    : navigation.navigate('Main')
                }
                style={{
                  width: 48,
                  height: 48,
                  justifyContent: 'center',
                }}>
                <ArrowLeft size={28} color={appColors.gray} />
              </TouchableOpacity>
                <TextComponent numOfLine={1} text={`Area ${item.area}`} title size={18} />
              </RowComponent>
        </RowComponent>
        <RowComponent>
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
        </RowComponent>
        <RowComponent>
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
      {/* </View> */}
    </View>
    </>
  );
};

export default EventDetail;