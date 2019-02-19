/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, SectionList } from 'react-native';

import { createAnimatableComponent, View, Text } from 'react-native-animatable';

const AnimatableSectionList = createAnimatableComponent(SectionList);
import AnimationCell from './AnimationCell';
import GROUPED_ANIMATION_TYPES from './grouped-animation-types.json';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const COLORS = [
    '#65b237', // green
    '#346ca5', // blue
    '#a0a0a0', // light grey
    '#ffc508', // yellow
    '#217983', // cobolt
    '#435056', // grey
    '#b23751', // red
    '#333333', // dark
    '#ff6821', // orange
    '#e3a09e', // pink
    '#1abc9c', // turquoise
    '#302614', // brown
];

const NATIVE_INCOMPATIBLE_ANIMATIONS = ['jello', 'lightSpeedIn', 'lightSpeedOut'];


type Props = {};
export default class App extends Component<Props> {
    state = {
        duration: 1000,
        toggledOn: false,
    };

    textRef = null;
    handleTextRef = ref => {
        this.textRef = ref;
    };

    handleDurationChange = duration => {
        this.setState({ duration: Math.round(duration) });
    };

    handleRowPressed = (componentRef, animationType) => {
        componentRef.setNativeProps({
            style: {
                zIndex: 1,
            },
        });
        componentRef.animate(animationType, this.state.duration).then(() => {
            componentRef.setNativeProps({
                style: {
                    zIndex: 0,
                },
            });
        });
        if (this.textRef) {
            this.textRef[animationType](this.state.duration);
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <View animation="fadeIn" delay={2000} style={{ backgroundColor: "#039BE5", textColor: '#fff', borderColor: 2 }}>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
                </View>
                <View animation="tada" delay={3000} style={{ backgroundColor: "#2b8339", textColor: '#E4202D', borderColor: 2 }}>
                    <Text> 3 Seconds later</Text>
                </View>
                <View animation="zoomInDown" delay={5000} style={{ backgroundColor: "#bfc6ea", textColor: '#E4202D', borderColor: 2 }}>
                    <Text> Zoom In Down 7 Seconds</Text>
                </View>
                <View animation="fadeOut" delay={7000} style={{ backgroundColor: "#6563A4", textColor: '#E4202D', borderColor: 2 }}>
                    <Text> Fade Out</Text>
                </View>
                <View animation="fadeOutDown" delay={9000} style={{ backgroundColor: "#62B1F6", textColor: '#E4202D', borderColor: 2 }}>
                    <Text>Face Out Down</Text>
                </View>
                <View animation="fadeOutDownBig" delay={11000} style={{ backgroundColor: "#FCAB53", textColor: '#E4202D', borderColor: 2 }}>
                    <Text> fadeOutDownBig</Text>
                </View>
                <View animation="fadeOutLeft" delay={13000} style={{ backgroundColor: "#50D2C2", textColor: '#E4202D', borderColor: 2 }}>
                    <Text> fadeOutLeft</Text>
                </View>
                <View animation="flipInX" delay={15000} style={{ backgroundColor: "#fff", textColor: '#2b8339', borderColor: 2 }}>
                    <Text> flipInX</Text>
                </View>
                <View animation="lightSpeedIn" delay={17000} style={{ backgroundColor: "#fff", textColor: '#FCAB53', borderColor: 2 }}>
                    <Text> lightSpeedIn</Text>
                </View>
                <View animation="slideOutDown" delay={19000} style={{ backgroundColor: "#FF3366", textColor: '#62B1F6', borderColor: 2 }}>
                    <Text> slideOutDown</Text>
                </View>
                <View animation="zoomIn" delay={21000} style={{ backgroundColor: "#3F51B5", textColor: '#E4202D', borderColor: 2 }}>
                    <Text> zoomIn</Text>
                </View>
                <AnimatableSectionList
                    animation="bounceInUp"
                    contentInsetAdjustmentBehavior="automatic"
                    duration={1100}
                    delay={1400}
                    keyExtractor={item => item}
                    sections={GROUPED_ANIMATION_TYPES}
                    removeClippedSubviews={false}
                    renderSectionHeader={({ section }) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{section.title}</Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (
                        <AnimationCell
                            animationType={item}
                            color={COLORS[index % COLORS.length]}
                            onPress={this.handleRowPressed}
                            useNativeDriver={NATIVE_INCOMPATIBLE_ANIMATIONS.indexOf(item) === -1}
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    sectionHeader: {
        backgroundColor: '#F5FCFF',
        padding: 15,
    },
    sectionHeaderText: {
        textAlign: 'center',
        fontSize: 18,
    },
});
