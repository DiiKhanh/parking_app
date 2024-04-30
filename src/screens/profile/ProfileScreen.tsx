import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import userAPI from '../../apis/userApi';
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ProfileModel} from '../../models/ProfileModel';
import {
  AuthState,
  addAuth,
  authSelector,
} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import AboutProfile from './components/AboutProfile';
import EditProfile from './components/EditProfile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../../constants/appColors';

const ProfileScreen = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>();
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const [profileId, setProfileId] = useState('');

  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);

  useEffect(() => {
    if (route.params) {
      const {id} = route.params;
      setProfileId(id);

      if (route.params.isUpdated) {
        getProfile();
      }
    } else {
      setProfileId(auth.id);
    }
  }, [route.params]);

  useEffect(() => {
    if (profileId) {
      getProfile();
    }
  }, [profileId]);

  const getProfile = async () => {
    const api = `/get-profile?id=${profileId}`;

    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(api);
      res && res.data && setProfile(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  return (
    <ContainerComponent
      back
      title={route.params ? '' : 'Profile'}
      right={
        <ButtonComponent
          icon={
            <MaterialIcons
              name="more-vert"
              size={24}
              color={appColors.text}
              onPress={() => {}}
            />
          }
        />
      }>
      {isLoading ? (
        <ActivityIndicator />
      ) : profile ? (
        <>
          <SectionComponent styles={[globalStyles.center]}>
            <RowComponent>
              <AvatarComponent
                photoURL={profile.photoUserUrl}
                name={profile.username}
                size={120}
              />
            </RowComponent>
            <SpaceComponent height={16} />
            <TextComponent
              text={
                profile.fullname
                  ? profile.fullname
                  : profile.username
              }
              title
              size={24}
            />
            <SpaceComponent height={16} />
            <RowComponent>
              <View style={[globalStyles.center, {flex: 1}]}>
                <TextComponent text="Account balance:" />
                <TextComponent
                  title
                  text={`1.000.000đ`}
                  size={16}
                />
              </View>
            </RowComponent>
          </SectionComponent>
          <EditProfile profile={profile} />
          {/* {auth.id !== profileId ? (
            <AboutProfile profile={profile} />
          ) : (
            <EditProfile profile={profile} />
          )} */}
        </>
      ) : (
        <TextComponent text="profile not found!" />
      )}
    </ContainerComponent>
  );
};

export default ProfileScreen;