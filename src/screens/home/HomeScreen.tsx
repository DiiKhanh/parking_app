import axios from 'axios';
import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import {useIsFocused} from '@react-navigation/native';
import { appInfo } from '../../constants/appInfos';
import Toast from 'react-native-toast-message';

// const events = [{area: "A", fire_detected: true, image_url: "https://res.cloudinary.com/dupkiibar/image/upload/v1716571951/a741ktunrab1kcvloqvs.jpg", parkinglot_counts: [{class: "empty", count: 34}, {class: "occupied", count: 47}], timestamp: "Sat, 25 May 2024 00:32:32 GMT"}, {area: "B", fire_detected: false, image_url: "https://res.cloudinary.com/dupkiibar/image/upload/v1716575997/dgvicxpakijwiqppjwjf.jpg", parkinglot_counts: [{class: "occupied", count: 79}, {class: "empty", count: 13}], timestamp: "Sat, 25 May 2024 01:39:58 GMT"}, {area: "C", fire_detected: false, image_url: "https://res.cloudinary.com/dupkiibar/image/upload/v1716575510/pggevs1t9kuez5mrkejh.jpg", parkinglot_counts: [{class: "occupied", count: 92}, {class: "empty", count: 13}], timestamp: "Sat, 25 May 2024 01:31:51 GMT"}]


const HomeScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const [events, setEvents] = useState<any[]>();

  const getParkinglot = async () => {
    setIsLoading(true)
    const api = `http://neuralparking.online/parkinglot_live_json`;
    try {
        const response = await axios.get(api);
        const data = await response.data;
        const array = Object.entries(data).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
              return { area: key, ...value };
          } else {
              throw new Error(`Expected an object but got ${typeof value}`);
          }
      });
      setIsLoading(false)
      setEvents(array);

    } catch (error) {
      setIsLoading(false)
      Toast.show({ type: "error", text1: `err load parking lot`, visibilityTime: 2000 });
      console.log(`err load parking lot:: ${error}`);
    }
}

  useEffect(() => {
    getParkinglot();
  }, [])

  useEffect(() => {
    if (isFocused) {
      getParkinglot();
    }
  }, [isFocused]);

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          // height: Platform.OS === 'android' ? 166 : 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>
        <View style={{paddingHorizontal: 16}}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{flex: 1, alignItems: 'center'}]}>
              <RowComponent>
                <TextComponent
                  text="Neural Parking"
                  color={appColors.gray2}
                  size={14}
                  styles={{ fontWeight: "bold"}}
                />
                {/* <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                /> */}
              </RowComponent>
            </View>

            {/* <CircleComponent color="#524CE0" size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent> */}
          </RowComponent>
          <SpaceComponent height={20} />
          {/* <RowComponent> */}
            {/* <RowComponent
              styles={{flex: 1}}
              // onPress={() =>
              //   navigation.navigate('SearchArena', {
              //     isFilter: false,
              //   })
              // }
              >
              <SearchNormal1
                variant="TwoTone"
                color={appColors.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.gray2,
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gray2}
                size={16}
              />
            </RowComponent> */}
            {/* <TagComponent
              bgColor={'#5D56F3'}
              // onPress={() =>
              //   navigation.navigate('SearchEvents', {isFilter: true})
              // }
              label="Filters"
              icon={
                <CircleComponent size={20} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CircleComponent>
              }
            /> */}
          {/* </RowComponent> */}
          <SpaceComponent height={20} />
        </View>
        {/* <View style={{marginBottom: -16}}>
          <CategoriesList isFill />
        </View> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 22 : 18,
          },
        ]}>
        <TabBarComponent
            title="Watch ParkingLot"
            // onPress={() =>
            //   navigation.navigate('ExploreEvents', {
            //     key: 'ParkingLot',
            //     title: 'Watch ParkingLot',
            //   })
            // }
          /> 
          {events && events?.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              horizontal={false}
              data={events}
              renderItem={({item, index}) => (
                <EventItem key={`event${index}`} item={item} type="card" />
              )}
            />
          ) : (
            <LoadingComponent isLoading={isLoading} values={events?.length || 0} />
          )}
        {/* <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
            <LoadingComponent isLoading={isLoading} values={3} />
        </SectionComponent> */}
        {/* <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{flex: 1, padding: 16, minHeight: 127}}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <TextComponent text="Pay for parking online" title />
            <TextComponent text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                // onPress={() => console.log('payment')}
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}>
                <TextComponent
                  text="Payment"
                  font={fontFamilies.bold}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent> */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;