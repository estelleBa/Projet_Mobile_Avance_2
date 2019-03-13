import React from 'react'
import { StyleSheet, View, Text, Image, ToucheableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FilmDetail from './FilmDetail'

class FilmItem extends React.Component {
  render() {
    console.log(this.props)
    const film = this.props.film
    const displayDetailForFilm = this.props.displayDetailForFilm
    return (
      <ToucheableOpacity style={styles.main_container} onPress={() => displayDetailForFilm(film.id)}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </ToucheableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  }
})

export default Categories
