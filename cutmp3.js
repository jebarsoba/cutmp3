const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment');

const sourceAudioPath = '/home/jorge/Personal/cutmp3/20230502.mp3';
const timeTable = '/home/jorge/Personal/cutmp3/timetable.txt';
const targetDirPath = '/home/jorge/Personal/cutmp3/splitted-songs'
const targetSongNamesPrefix = '20230502_';

function durationToSeconds(start) {
    return moment.duration(start).asSeconds();
}

const songs = fs.readFileSync(timeTable, 'utf-8').split('\n');
for (const song of songs) {
    const [start, end, name] = song.trim().split(',');

    const secondsStart = durationToSeconds(start);
    const secondsEnd = durationToSeconds(end);
    const duration = secondsEnd - secondsStart;
    if (!name) {
        break;
    }

    console.log(`Start processing ${name}...`);
    const outputPath = `${targetDirPath}/${targetSongNamesPrefix}${name}.mp3`;
    ffmpeg(sourceAudioPath)
        .seekInput(secondsStart)
        .duration(duration)
        .output(outputPath)
        .on('end', function () {
            console.log(`Finished processing ${name}.`);
        })
        .run();
}
