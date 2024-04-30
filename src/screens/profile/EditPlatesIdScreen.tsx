import {View, Text, Image, Platform} from 'react-native';
import React, {useState} from 'react';
import {ProfileModel} from '../../models/ProfileModel';
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  ButtonImagePicker
} from '../../components';

import {LoadingModal} from '../../modals';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import userAPI from '../../apis/userApi';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const EditPlatesIdScreen = ({navigation, route}: any) => {
  const {profile}: {profile: ProfileModel} = route.params;

  const [fileSelected, setFileSelected] = useState<any>();
  const [profileData, setProfileData] = useState<ProfileModel>(profile);
  const [isLoading, setIsLoading] = useState(false);
  const [plates, setPlates] = useState('');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items: any = {...profileData};

    items[`${key}`] = value;

    setProfileData(items);
  };

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photoPlatesUrl', val.path);
  };


  const handleUpdatePlates = async () => {
    const api = `http://192.168.1.6:5000/detect_license_plate`;

    const formData = new FormData();
    formData.append('image', {
      name: fileSelected.path.split('/').pop(),
      type: fileSelected.mime,
      uri: Platform.OS === 'android' ? fileSelected.path : fileSelected.path.replace('file://', ''),
    });

    setIsLoading(true);
    console.log("form", formData);
    try {
      const res: any = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      setIsLoading(false);
      // const newData = res.data.data;
      console.log(res.data);
      // const authData = {...auth, filenameUser: newData.filenameUser, fullname: newData.fullname,
      //   photoUserUrl: newData.photoUserUrl
      // };

      // await AsyncStorage.setItem('auth', JSON.stringify(authData));
      // dispatch(addAuth(authData));

      // navigation.navigate('ProfileScreen', {
      //   isUpdated: true,
      //   id: profile.id,
      // });
    } catch (error) {
      setIsLoading(false);
      Toast.show({ type: "error", text1: 'Error plates id', visibilityTime: 2000 });
    }
  };

  const handleDeleteImage = () => {
    setFileSelected(null);
  }

  return (
    <ContainerComponent isScroll back title={profile.username}>
      <SectionComponent>
        <RowComponent>
        <ButtonImagePicker
            onSelect={(val: any) =>
              val.type === 'url'
                ? handleChangeValue('photoPlatesUrl', val.value as string)
                : handleFileSelected(val.value)
            }
          />
        </RowComponent>
        {
          fileSelected ? 
          <>
            <RowComponent styles={{flexDirection:"column", gap: 5, alignItems:"center"}}>
              <Image source={{uri:fileSelected.path}} style={{height:250, width:250}} />
            </RowComponent>
            <ButtonComponent text='Delete' type='primary' color='#EE544A'
            onPress={() => handleDeleteImage()}
            />
            <ButtonComponent
            text="Comfirm"
            type="primary"
            color='#29D697'
            onPress={() => handleUpdatePlates()}
            />
          </> : ''
        }
        <InputComponent
          placeholder="platesId"
          editable={false}
          value={plates}
          onChange={val => handleChangeValue('platesId', val)}
        />
      </SectionComponent>

      <ButtonComponent
      text="Update"
      type="primary"
      /> 
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default EditPlatesIdScreen;