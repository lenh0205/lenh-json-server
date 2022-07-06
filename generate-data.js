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
                    "https://vnso-zn-10-tf-mp3-s1-zmp3.zmdcdn.me/338062602221cb7f9230/8265150326533553135?authen=exp=1657121123~acl=/338062602221cb7f9230/*~hmac=73dcdc200202f9c5d7ed776ccea2d34e&fs=MTY1Njk0ODMyMzg4N3x3ZWJWNnwwfDEyMy4yMy40MS4yMTg",
                    "https://vnso-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/e59a85ab58eab1b4e8fb/5138068280272187474?authen=exp=1657121036~acl=/e59a85ab58eab1b4e8fb/*~hmac=c9756adff411d215c8cc319c49f15d38&fs=MTY1Njk0ODIzNjY2NHx3ZWJWNnwwfDE0LjE3MC4xNTkdUngMTM",
                    "https://vnso-zn-16-tf-mp3-s1-zmp3.zmdcdn.me/205ac2fb5bbab2e4ebab/686030266420867194?authen=exp=1657120950~acl=/205ac2fb5bbab2e4ebab/*~hmac=3b8796d79d7e73824022df1d27219f86&fs=MTY1Njk0ODE1MDgwMnx3ZWJWNnwwfDI3LjMdUngMTIxLjI1Mg",
                    "https://vnso-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/eab0b5bc4efda7a3feec/2139479485954101043?authen=exp=1657120877~acl=/eab0b5bc4efda7a3feec/*~hmac=88f2cbf35b37a1f68db43895d54e3785&fs=MTY1Njk0ODA3NzA5MHx3ZWJWNnwwfDI3LjMdUngMTIxLjI1Mg",
                    "https://vnso-zn-16-tf-mp3-s1-zmp3.zmdcdn.me/397dfae855a9bcf7e5b8/3316510322627274731?authen=exp=1657120962~acl=/397dfae855a9bcf7e5b8/*~hmac=408a7d8d3341e7119024d55b7ffd1dbc&fs=MTY1Njk0ODE2MjkyNHx3ZWJWNnwxMDMzNTM4OTA5fDExNy41LjE0Ni4xNzA"
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
        createdplaylist: []
    }

    // Write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('generate data successfull')
    })
})()