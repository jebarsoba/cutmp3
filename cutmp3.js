const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment');

const targetSongNamesPrefix = '20240716';
const sourceAudioPath = `/home/jorge/Downloads/${targetSongNamesPrefix}.mp3`;
const timeTable = '/home/jorge/Personal/cutmp3/timetable.txt';
const targetDirPath = '/home/jorge/Personal/cutmp3/splitted-songs'

function durationToSeconds(start) {
    return moment.duration(start).asSeconds();
}

const songs = fs.readFileSync(timeTable, 'utf-8').split('\n');
let songNumber = 0;
for (const song of songs) {
    let [start, end, name] = song.trim().split(',');

    const secondsStart = durationToSeconds(start);
    const secondsEnd = durationToSeconds(end);
    const duration = secondsEnd - secondsStart;
    if (!name) {
        name = 'Untitled';
    }

    console.log(`Start processing ${name}...`);
    const outputPath = `${targetDirPath}/${targetSongNamesPrefix}_${++songNumber}-${name}.mp3`;
    ffmpeg(sourceAudioPath)
        .seekInput(secondsStart)
        .duration(duration)
        .output(outputPath)
        .on('end', function () {
            console.log(`Finished processing ${name}.`);
        })
        .run();
}
