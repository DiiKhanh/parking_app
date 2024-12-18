import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {appColors} from '../../constants/appColors';
import {appInfo} from '../../constants/appInfos';
import {globalStyles} from '../../styles/globalStyles';
import {TextComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';

const OnboardingScreen = ({navigation}: any) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={[globalStyles.container]}>
      <Swiper
        style={{}}
        loop={false}
        onIndexChanged={num => setIndex(num)}
        index={index}
        activeDotColor={appColors.primary}>
        <Image
          source={require('../../assets/images/ob1.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
            objectFit:"contain"
          }}
        />
        <Image
          source={require('../../assets/images/ob2.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
            objectFit:"contain"
          }}
        />
        <Image
          source={require('../../assets/images/ob3.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
            objectFit:"contain"
          }}
        />
      </Swiper>
      <View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 20,
            position: 'absolute',
            bottom: 20,
            right: 20,
            left: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <TextComponent
            text="Skip"
            color={appColors.primary}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')
          }>
          <TextComponent
            text="Next"
            color={appColors.primary}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
