import {isTypeSystemDefinitionNode} from 'graphql';
import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {gql} from 'urql';
import {useQuery} from 'urql';

const STORIES_QUERY = gql`
  query AllStories {
    stories {
      id
      title
      author
      summary
    }
  }
`;

export const Stories: React.FC = () => {
  const [{data, error, fetching}] = useQuery({query: STORIES_QUERY});
  if (fetching) {
    return (
      <View>
        <ActivityIndicator color="grey" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.sectionContainer}>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatList}
        data={data.stories}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  flatList: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
  summary: {
    fontSize: 18,
    color: 'grey',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 40,
  },
});
