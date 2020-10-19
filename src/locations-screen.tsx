import React, {useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchCountries} from './redux/country/country-actions';
import {countryState} from './redux/country/country-reducer';

const Location = () => {
  const dispatch = useDispatch();

  const {loading, countries} = useSelector((state: countryState) => {
    const {loading, countries} = state.countryReducer;
    return {loading, countries};
  });

  console.log(countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <ScrollView>
      {countries.map((v, k) => (
        <View key={k}>
          <Text>{v.attributes.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export {Location};

const styles = StyleSheet.create({});
