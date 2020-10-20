import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPickerComponnent from './drop-down-picker-component';

import { fetchCountries } from './redux/country/country-actions';
import { City, Country } from './types/location';
import { fetchCities } from './redux/city/city-actions';

interface DropDownItemsType {
    id: string;
    label: string;
    value: string;
}

const Location = () => {
    const dispatch = useDispatch();

    const [selectedCountry, setSelectedCounntry] = useState<DropDownItemsType>({
        id: '',
        label: '',
        value: ''
    });

    const [selectedCity, setSelectedCity] = useState(null);
    const [cityDefaultValue, setCityDefaultValue] = useState('');

    console.log({ selectedCountry, selectedCity, cityDefaultValue });

    const countries = useSelector(state => {
        return state.countryReducer.countries.map((item: Country) => {
            return {
                id: item.id,
                label: item.attributes.name,
                value: item.attributes.name
            };
        });
    });

    const cities = useSelector(state => {
        return state.cityReducer.cities.map((item: City) => ({
            id: item.id,
            label: item.attributes.name,
            value: item.attributes.name
        }));
    });

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCities(selectedCountry?.id));
    }, [dispatch, selectedCountry]);

    return (
        <>
            <View style={styles.countryContainer}>
                <DropDownPickerComponnent
                    title="Country"
                    placeholder="Select Country"
                    items={countries}
                    onChangeItem={item => {
                        setSelectedCounntry(item);
                    }}
                />
            </View>

            <View style={styles.cityContainer}>
                <DropDownPickerComponnent
                    title="City"
                    placeholder="Select City"
                    items={cities}
                    onChangeItem={item => {
                        setSelectedCity(item);
                    }}
                />
            </View>

            {selectedCountry.label === 'Egypt' && selectedCity !== null && (
                <View style={styles.areaContainer}>
                    <DropDownPickerComponnent title="Area" items={countries} />
                </View>
            )}
        </>
    );
};

export { Location };

const styles = StyleSheet.create({
    countryContainer: {
        zIndex: 10
    },
    cityContainer: {
        zIndex: 9
    },
    areaContainer: {
        zIndex: 8
    }
});
