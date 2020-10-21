import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPickerComponnent from './drop-down-picker-component';

import { fetchCountries } from './redux/country/country-actions';
import { fetchCities } from './redux/city/city-actions';
import { fetchAreas } from './redux/area/area-actions';

interface DropDownItemsType {
    id: string;
    label: string;
}
const defaultItem = {
    id: '',
    label: ''
};

const Location = () => {
    const dispatch = useDispatch();

    const [selectedCountry, setSelectedCountry] = useState<DropDownItemsType>(defaultItem);
    const [visibleCountryPicker, setVisibleCountryPicker] = useState(false);

    const [selectedCity, setSelectedCity] = useState<DropDownItemsType>(defaultItem);
    const [visibleCityPicker, setVisibleCityPicker] = useState(false);

    const [selectedArea, setSelectedArea] = useState<DropDownItemsType>(defaultItem);
    const [visibleAreaPicker, setVisibleAreaPicker] = useState(false);

    let cityPickerController;
    let areaPickerController;

    const generatePickerItems = items => {
        return items.map(item => ({
            id: item.id,
            label: item.attributes.name
        }));
    };

    const setPickerVisibility = (countryPicker: boolean, cityPicker: boolean, areaPicker: boolean) => {
        setVisibleCountryPicker(countryPicker);
        setVisibleCityPicker(cityPicker);
        setVisibleAreaPicker(areaPicker);
    };

    const countries = useSelector(state => generatePickerItems(state.countryReducer.countries));

    const cities = useSelector(state => generatePickerItems(state.cityReducer.cities));

    const areas = useSelector(state => generatePickerItems(state.areaReducer.areas));

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCountry !== defaultItem) {
            dispatch(fetchCities(selectedCountry?.id));
        }
    }, [dispatch, selectedCountry]);

    useEffect(() => {
        if (selectedCity !== defaultItem) {
            dispatch(fetchAreas(selectedCountry?.id, selectedCity.id));
        }
    }, [dispatch, selectedCountry, selectedCity.id, selectedCity]);

    return (
        <View style={styles.container}>
            <View style={styles.countryContainer}>
                <DropDownPickerComponnent
                    title="Country"
                    placeholder="Select Country"
                    errorMsg={selectedCountry === defaultItem ? 'Please select country' : null}
                    items={countries}
                    isVisible={visibleCountryPicker}
                    onOpen={() => setPickerVisibility(true, false, false)}
                    onClose={() => setVisibleCountryPicker(false)}
                    onChangeItem={item => {
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
