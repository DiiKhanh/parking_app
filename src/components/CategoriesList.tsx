import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image} from 'react-native';
import {TagComponent} from '.';
import {appColors} from '../constants/appColors';
import {Category} from '../models/Category';
import { Car } from 'iconsax-react-native';

interface Props {
  isFill?: boolean;
  onFilter?: (id: string) => void;
}

const CategoriesList = (props: Props) => {
  const {isFill, onFilter} = props;

  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySelected, setCategorySelected] = useState('');

  const navigation: any = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categorySelected && onFilter) {
      onFilter(categorySelected);
    }
  }, [categorySelected]);

  const getCategories = async () => {
    // const api = `/get-categories`;

    try {
      // const res = await eventAPI.HandleEvent(api);
      setCategories([
        {
          title: "Area A",
          _id: "area_a",
          color: "#F0635A",
          iconColor: "white",
          iconWhite: "basketball",
          key: "area_a"
        },
        {
          title: "Area B",
          _id: "area_b",
          color: "#F59762",
          iconColor: "white",
          iconWhite: "basketball",
          key: "area_b"
        },
        {
          title: "Area C",
          _id: "area_c",
          color: "#29D697",
          iconColor: "white",
          iconWhite: "basketball",
          key: "area_c"
        },
        {
          title: "Area D",
          _id: "area_d",
          color: "#46CDFB",
          iconColor: "white",
          iconWhite: "basketball",
          key: "area_d"
        },
        {
          title: "Area E",
          _id: "area_e",
          color: "#FDC400",
          iconColor: "white",
          iconWhite: "basketball",
          key: "area_e"
        }
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCategory = async (item: Category) => {
    if (!onFilter) {
      navigation.navigate('CategoryDetail', {
        id: item._id,
        title: item.title,
      });
    } else {
      setCategorySelected(item._id);
    }
  };

  return categories.length > 0 ? (
    <FlatList
      style={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={item => item._id}
      renderItem={({item, index}) => (
        <TagComponent
          styles={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          bgColor={
            isFill
              ? item.color
              : categorySelected === item._id
              ? item.color
              : 'white'
          }
          // onPress={() => handleSelectCategory(item)}
          label={item.title}
          icon={
            <Car size="16" color="white"/>
          }
          textColor={
            isFill
              ? 'white'
              : categorySelected === item._id
              ? appColors.white
              : appColors.text2
          }
        />
      )}
    />
  ) : (
    <></>
  );
};

export default CategoriesList;