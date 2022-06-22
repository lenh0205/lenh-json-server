const { faker } = require('@faker-js/faker')
const fs = require('fs');

// set locale để s/d dữ liệu Tiếng Việt
faker.locale = "vi"

const randomTopicList = (n) => {
    // n là số phần tử muốn render
    if (n <= 0) return []

    const topicList = []
    // loop and push category
    Array.from(new Array(n)).forEach(() => {
        const topic = {
            id: faker.datatype.uuid(),
            name: faker.word.adjective(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        topicList.push(topic)
    })

    return topicList;
}

const randomPlaylistList = (topicList, numberOfPlaylists) => {
    if (numberOfPlaylists <= 0) return [];
    const playlistList = []

    // random data 
    for (const topic of topicList) {
        Array.from(new Array(numberOfPlaylists)).forEach(() => {
            const playlist = {
                topicId: topic.id,
                id: faker.datatype.uuid(),
                name: faker.lorem.words(),
                sub: faker.lorem.sentence(),
                image: faker.image.imageUrl(300, 300),
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            playlistList.push(playlist)
        })
    }
    return playlistList
}

const randomSongList = (playlistList, numberOfSongs) => {
    if (numberOfSongs <= 0) return [];
    const songList = []

    // random data 
    for (const playlist of playlistList) {
        Array.from(new Array(numberOfSongs)).forEach(() => {
            const song = {
                playlistId: playlist.id,
                id: faker.datatype.uuid(),
                name: faker.music.songName(),
                singer: faker.name.findName(),
                album: faker.music.songName(),
                liked: faker.datatype.boolean(),
                img: faker.image.imageUrl(64, 64),
                songUrl: 'mp3 link',
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            songList.push(song)
        })
    }
    return songList
}


(() => {
    // random data
    const topicList = randomTopicList(4)
    const playlistList = randomPlaylistList(topicList, 5)
    const songList = randomSongList(playlistList, 5)

    // prepare db object
    const db = {
        topic: topicList,
        playlist: playlistList,
        song: songList,
    }

    // Write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('generate data successfull')
    })
})()