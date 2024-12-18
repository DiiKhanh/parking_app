import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../../apis/authApi';
import {Facebook, Google} from '../../../assets/svgs';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {LoadingModal} from '../../../modals';
import {addAuth} from '../../../redux/reducers/authReducer';
import { Alert } from 'react-native';


GoogleSignin.configure({
  webClientId:
    '1088891845183-k3pb2ebdm68emenrc7dgi2csrkkdr6r5.apps.googleusercontent.com',
});

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const api = `/google-signin`;
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;

      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );
      console.log("l", res.data);
      dispatch(addAuth(res.data));

      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <SectionComponent>
      <TextComponent
        styles={{textAlign: 'center'}}
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
      />
      <SpaceComponent height={16} />

      <ButtonComponent
        type="primary"
        onPress={handleLoginWithGoogle}
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />

      <LoadingModal visible={isLoading} />
    </SectionComponent>
  );
};

export default SocialLogin;