const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const moment = require('moment');
const os = require('os');
const path = require('path');

const sourceAudioPath = process.argv[2];
if (!sourceAudioPath) {
    console.error('Please provide the absolute path of the audio file as a command line argument.');
    process.exit(1);
}
if (!path.isAbsolute(sourceAudioPath)) {
    console.error('Please provide an absolute path for the audio file.');
    process.exit(1);
}

const targetSongNamesPrefix = path.basename(sourceAudioPath, path.extname(sourceAudioPath));
const timeTable = path.join(path.dirname(sourceAudioPath), 'timetable.txt');
const targetDirPath = path.join(path.dirname(sourceAudioPath), 'splitted-songs');
if (!fs.existsSync(targetDirPath)) {
    fs.mkdirSync(targetDirPath, { recursive: true });
}

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
    if (!duration) {
        break;
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
