import React from 'react';

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CellariumAccordion, CellariumButton, CellariumInput, CellariumParsedText, CellariumSectionCard, CellariumSwitch } from 'cellarium';
export default function App() {

  const seperator = <View style={{ height: 20, width: '100%' }} />;

  return (
    <ScrollView style={styles.container}>
      {seperator}
      <CellariumSectionCard header='Welcome to Cellarium' description='Where many components can be found for your desires...'>
        <CellariumSwitch title='Notifications' subtitle='Allow Notifications to achieve more personalized application.' />
      </CellariumSectionCard>
      <CellariumAccordion content="asd" title="Open Accordion" />
      <CellariumAccordion content="asd"
        containerStyle={{ backgroundColor: 'tomato' }}
        titleContainerStyle={{ backgroundColor: 'pink' }}
        contentContainerStyle={{ backgroundColor: 'gold' }}
        title="Open Accordion"
        icons={{
          expandedIcon: <Text>expanded</Text>,
          closedIcon: <Text>closed</Text>
        }}
        onToggleAccordion={isExpanded => console.log('TOMATO:' + isExpanded)} />
      <CellariumAccordion
        content={
          <TouchableOpacity>
            <Text>asd</Text>
          </TouchableOpacity>
        }
        title="Open Accordion" />
      {seperator}
      <CellariumInput label='Focus to see magic happen' />
      {seperator}
      <CellariumParsedText
        parsePatterns={[
          { parseText: `Current date: ${new Date().toLocaleDateString()}`, style: { color: 'green' }, },
          { parseText: `Random number: ${Math.floor(Math.random() * 100)}`, style: { color: 'orange' }, rest: { numberOfLines: 1, onPress: () => console.log('orange'), }, },
          { parseText: `Random number: ${Math.floor(Math.random() * 100)}`, style: { color: 'blue', fontStyle: 'italic', fontWeight: 'bold' }, rest: { onPress: undefined, }, },
        ]}>
        {'This is some {0} text for {1}. what about this? {2} is this ok ? '}
      </CellariumParsedText>
      {seperator}
      <CellariumButton
        variant='explanatory'
        title='This is my first component library for react native..'
        subtitle='its written with ts'
        onButtonPress={() => { console.log('Welcome visitor. Open App.tsx under ./example to play with the library....') }}
      />
      {seperator}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
