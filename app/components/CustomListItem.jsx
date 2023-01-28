import { Avatar, Image } from '@rneui/base';
import { ListItem } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function CustomListItem({ id, chatName, enterChat }) {
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
      />
      <ListItem.Content>
        <ListItem.Title>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          hello this is a test subtitle again i repeat this is a test subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({});
export default CustomListItem;
