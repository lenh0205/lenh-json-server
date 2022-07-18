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
                    "https://vnso-zn-24-tf-mp3-s1-zmp3.zmdcdn.me/c4926821dc60353e6c71/6509620943637255086?authen=exp=1658359872~acl=/c4926821dc60353e6c71/*~hmac=b6af37eca72539f5beed3d3f4acfa047&fs=MTY1ODE4NzA3MjkyNHx3ZWJWNnwxMDE4MjMyOTQ1fDQyLjExMi44NC4xMDE",
                    "https://vnso-zn-16-tf-mp3-s1-zmp3.zmdcdn.me/c331801f9d5974072d48/5229695270052593637?authen=exp=1658360014~acl=/c331801f9d5974072d48/*~hmac=b7bef2e6afff8a8dd9c3d61cb5835ce5&fs=MTY1ODE4NzIxNDmUsIC4MXx3ZWJWNnwwfDEyMy4yMy40MS4yMTg",
                    "https://vnso-zn-15-tf-mp3-s1-zmp3.zmdcdn.me/cf9b708bafcf46911fde/4909164588451307692?authen=exp=1658359997~acl=/cf9b708bafcf46911fde/*~hmac=ea444006b35304edf9d8424935ed1505&fs=MTY1ODE4NzE5NzYwMnx3ZWJWNnwwfDEyMy4yMy40MS4yMTg",
                    "https://vnso-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/3f4ace44ee05075b5e14/6246127647288644194?authen=exp=1658359986~acl=/3f4ace44ee05075b5e14/*~hmac=96e0dfc28f29889874af92810ce360c5&fs=MTY1ODE4NzE4NjUxOXx3ZWJWNnwwfDEyMy4yMy40MS4yMTg",
                    "https://vnso-zn-5-tf-mp3-s1-zmp3.zmdcdn.me/48a2f76cd12d3873613c/2775731365543336841?authen=exp=1658359960~acl=/48a2f76cd12d3873613c/*~hmac=2e553a7df1b1770c996979bc369e9ac1&fs=MTY1ODE4NzE2MDU3NHx3ZWJWNnwwfDEyMy4yMy40MS4yMTg"
                   ]),
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            songList.push(song)
        })
    }
    return songList
}

const randomCreatedPlaylistList = (n) => {
        if (n <= 0) return []

        const createdPlaylistList = []
        // loop and push category
        Array.from(new Array(n)).forEach(() => {
            const createdPlaylist = {
                id: faker.datatype.uuid(),
                name: "",
                sub: "",
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
            createdPlaylistList.push(createdPlaylist)
        })
    
        return createdPlaylistList;
}


(() => {
    // random data
    const topicList = randomTopicList(7)
    const playlistList = randomPlaylist(topicList, 5)
    const songList = randomSongList(playlistList, 30)
    const createdPlaylistList = randomCreatedPlaylistList(0)

    // prepare db object
    const db = {
        topic: topicList,
        playlist: playlistList,
        song: songList,
        createdplaylist: createdPlaylistList
    }

    // Write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('generate data successfull')
    })
})()