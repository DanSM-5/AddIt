import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

class RandomNumber extends Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
        isSelected: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        onPressDisabled: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
    }
    handlePress = () =>{
        console.log(' Boton precionado ' );
        if (this.props.isSelected) {
            this.props.onPressDisabled(this.props.id);
        }else{
            this.props.onPress(this.props.id);
        }
    };

    render() {
        return (
            <>
                <TouchableOpacity 
                    onPress={this.handlePress} 
                    disabled={!this.props.isActive}
                    style={styles['number-container']}
                >
                    <Text style={[styles.random, this.props.isSelected && styles.selected, !this.props.isActive && styles.selected]}>
                        {this.props.number}
                    </Text>
                </TouchableOpacity>
            </>
        );
    }
}

const styles = StyleSheet.create({
    random: {
        textAlign: "center",
        fontSize: 40,
        color: 'white',
    },
    'number-container':{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#659dbd',
        marginHorizontal: 20,
        marginVertical: 20,
        justifyContent: "center",
    },
    selected: {
        opacity: 0.2,
    },
});

export default RandomNumber;