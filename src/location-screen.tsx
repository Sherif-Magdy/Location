import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPickerComponnent from './drop-down-picker-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchCountries } from './redux/country/country-actions';
import { fetchCities } from './redux/city/city-actions';
import { fetchAreas } from './redux/area/area-actions';
import { State } from './redux/rootReducer';

interface DropDownItemsType {
    id: string;
    label: string;
    value: string;
}
const defaultItem = {
    id: '',
    label: '',
    value: ''
};

const Location = () => {
    const dispatch = useDispatch();

    const [selectedCountry, setSelectedCountry] = useState<DropDownItemsType>(defaultItem);
    const [visibleCountryPicker, setVisibleCountryPicker] = useState(false);

    const [selectedCity, setSelectedCity] = useState<DropDownItemsType>(defaultItem);
    const [visibleCityPicker, setVisibleCityPicker] = useState(false);

    const [selectedArea, setSelectedArea] = useState<DropDownItemsType>(defaultItem);
    const [visibleAreaPicker, setVisibleAreaPicker] = useState(false);
    let cityPickerController: object;
    let areaPickerController: object;

    const getSavedCountry = useCallback(async () => {
        try {
            const valueString: string | null = await AsyncStorage.getItem('savedCountry');
            if (valueString) {
                setSelectedCountry(JSON.parse(valueString));
            }
        } catch {}
    }, []);

    const generatePickerItems = items => {
        return items.map(item => ({
            id: item.id,
            label: item.attributes.name,
            value: item.attributes.name
        }));
    };

    const setPickerVisibility = (countryPicker: boolean, cityPicker: boolean, areaPicker: boolean) => {
        setVisibleCountryPicker(countryPicker);
        setVisibleCityPicker(cityPicker);
        setVisibleAreaPicker(areaPicker);
    };

    const countries = useSelector((state: State) => {
        const newCountries = state.countryReducer.countries;
        return generatePickerItems(Object.values(newCountries));
    });

    const cities = useSelector((state: State) => {
        const newCities = state.cityReducer.cities;
        if (newCities) {
            return generatePickerItems(
                Object.values(newCities).filter(city => {
                    return city.relationships.country.data.id === selectedCountry.id;
                })
            );
        }
        return [];
    });

    const areas = useSelector((state: State) => {
        const newAreas = state.areaReducer.areas;
        if (newAreas) {
            return generatePickerItems(
                Object.values(newAreas).filter(area => {
                    return area.relationships.city.data.id === selectedCity.id;
                })
            );
        }
        return [];
    });

    /* fetch the list of all countries */
    useEffect(() => {
        dispatch(fetchCountries()).then(() => getSavedCountry());
    }, [dispatch, getSavedCountry]);

    /* fetch the list of cities for the provided country */
    useEffect(() => {
        if (selectedCountry !== defaultItem && cities.length === 0) {
            dispatch(fetchCities(selectedCountry?.id));
        }
    }, [cities.length, dispatch, selectedCountry]);

    /* fetch the list of areas for the provided city */
    useEffect(() => {
        if (selectedCountry.label === 'Egypt' && selectedCity !== defaultItem && areas.length === 0) {
            dispatch(fetchAreas(selectedCountry?.id, selectedCity.id));
        }
    }, [dispatch, selectedCountry, selectedCity.id, selectedCity, areas.length]);

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>LOCATION</Text>

            <View style={styles.countryContainer}>
                <DropDownPickerComponnent
                    title="Country"
                    placeholder="Select Country"
                    errorMsg={selectedCountry === defaultItem ? 'Please select country' : null}
                    items={countries}
                    isVisible={visibleCountryPicker}
                    onOpen={() => setPickerVisibility(true, false, false)}
                    onClose={() => setVisibleCountryPicker(false)}
                    defaultValue={selectedCountry?.value}
                    onChangeItem={item => {
                        AsyncStorage.setItem('savedCountry', JSON.stringify(item));
                        setSelectedCountry(item);
                        setSelectedCity(defaultItem);
                        setSelectedArea(defaultItem);
                        cityPickerController.state.choice = { label: null, value: null };
                    }}
                />
            </View>

            <View style={styles.cityContainer}>
                <DropDownPickerComponnent
                    controller={instance => (cityPickerController = instance)}
                    title="City"
                    placeholder="Select City"
                    errorMsg={
                        selectedCountry !== defaultItem && selectedCity === defaultItem ? 'Please select city' : null
                    }
                    items={cities}
                    isVisible={visibleCityPicker}
                    onOpen={() => setPickerVisibility(false, true, false)}
                    onClose={() => setVisibleCityPicker(false)}
                    onChangeItem={item => {
                        setSelectedCity(item);
                        if (selectedArea !== defaultItem) {
                            areaPickerController.state.choice = { label: null, value: null };
                        }
                    }}
                />
            </View>

            {selectedCountry.label === 'Egypt' && selectedCity !== defaultItem && (
                <View style={styles.areaContainer}>
                    <DropDownPickerComponnent
                        controller={instance => (areaPickerController = instance)}
                        title="Area"
                        placeholder="Select Area"
                        items={areas}
                        isVisible={visibleAreaPicker}
                        onOpen={() => setPickerVisibility(false, false, true)}
                        onClose={() => setVisibleAreaPicker(false)}
                        onChangeItem={item => setSelectedArea(item)}
                    />
                </View>
            )}
        </View>
    );
};

export { Location };

const styles = StyleSheet.create({
    container: {
        height: '100%',
        zIndex: 999
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        margin: 15
    },
    countryContainer: {
        zIndex: Platform.select({ ios: 10 })
    },
    cityContainer: {
        zIndex: Platform.select({ ios: 9 })
    },
    areaContainer: {
        zIndex: Platform.select({ ios: 8 })
    }
});
