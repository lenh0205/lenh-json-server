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

const randomPlaylist = (topicList, numberOfPlaylists) => {
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
                img: faker.image.imageUrl(300, 300),
                liked: faker.datatype.boolean(),
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
                songUrl: faker.helpers.arrayElement([
                    'https://vnso-zn-16-tf-mp3-s1-zmp3.zmdcdn.me/397dfae855a9bcf7e5b8/3316510322627274731?authen=exp=1656396063~acl=/397dfae855a9bcf7e5b8/*~hmac=802ff53522f3b10ae9790b2b53e6286a&fs=MTY1NjIyMzI2Mzg4NXx3ZWJWNnwxMDUwNjU5MjQ0fDExOC43MC4xNC4yNDA',
                    'https://vnso-zn-23-tf-mp3-s1-zmp3.zmdcdn.me/1c5fc9a67ae793b9caf6/8696983054732805962?authen=exp=1656396393~acl=/1c5fc9a67ae793b9caf6/*~hmac=7acd454ea557bb6b16d4ab00d17bcebe&fs=MTY1NjIyMzU5MzI1OXx3ZWJWNnwwfDE0LjE2NS4yMjmUsICdUngMjM1',
                    'https://vnso-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/a0f02cfa7dbb94e5cdaa/5159577349354650802?authen=exp=1656396623~acl=/a0f02cfa7dbb94e5cdaa/*~hmac=aca46392c7ee97c9400be78e39cfddeb&fs=MTY1NjIyMzgyMzY0N3x3ZWJWNnwwfDE0LjE2NC4yMjUdUngNzI',
                    'https://vnso-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/3f23f3549e15774b2e04/3291725272894183767?authen=exp=1656476470~acl=/3f23f3549e15774b2e04/*~hmac=093b1c95a85fd886e9b432f04c17049b&fs=MTY1NjMwMzY3MDg0N3x3ZWJWNnwwfDE0LjE2NC4yMjUdUngNzI',
                    'https://vnso-zn-23-tf-mp3-s1-zmp3.zmdcdn.me/fb400d3760768928d067/5668674868526934830?authen=exp=1656476455~acl=/fb400d3760768928d067/*~hmac=aebafed649c395e81e1c449d85981826&fs=MTY1NjMwMzY1NTgwNnx3ZWJWNnwwfDE0LjE2NC4yMjUdUngNzI',
                    'https://vnso-zn-16-tf-mp3-s1-zmp3.zmdcdn.me/6660bd17d05639086047/6500702918192854609?authen=exp=1656475957~acl=/6660bd17d05639086047/*~hmac=3e72ae977ab9d965240d7805f3af0841&fs=MTY1NjMwMzE1NzM1Nnx3ZWJWNnwwfDU4LjE4Ny4xNjMdUngMjI'
                ]),
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
    const topicList = randomTopicList(7)
    const playlistList = randomPlaylist(topicList, 5)
    const songList = randomSongList(playlistList, 30)

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