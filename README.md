# cutmp3
A Node.js script that cuts a large MP3 file into smaller tracks using a provided timetable file with start/end times and song names.

## Getting Started
### Prerequisites
* Node.js

### Installing
```bash
npm install
```

### Usage
1. Create a text file with a list of start/end times and song names for each track. The format of each line should be `START_TIME,END_TIME,SONG_NAME`, where `START_TIME` and `END_TIME` are in the format `HH:MM:SS`, and `SONG_NAME` is a string representing the name of the song (see "Sample timetable file" below).
2. Run the script using the following command:
```bash
node cutmp3.js /absolute/path/to/your/audiofile.mp3
```

The script will automatically:
* Use the provided absolute path to the MP3 file you want to cut.
* Look for a timetable file named `timetable.txt` in the same directory as the source audio file.
* Save the output segments in a `splitted-songs` directory within the same directory as the source audio file.
* Use the filename (without the extension) as a prefix for the output segments before the song name.

### Sample timetable file
```
00:00,00:06:27,Green river
00:08:58,00:12:25,Seguir viviendo sin tu amor 1
00:18:20,00:21:55,Seguir viviendo sin tu amor 2
00:33:20,00:37:00,Adios 1
00:44:10,00:47:47,Adios 2
00:51:48,00:56:45,Black velvet
00:59:15,01:03:47,Imágenes paganas
01:06:00,01:10:55,El viejo
01:26:50,01:31:18,To love somebody
01:31:50,01:36:02,Summertime
01:37:36,01:42:30,Stand by me
01:45:46,01:49:59,Juntos a la par
01:50:50,01:55:00,Café Madrid
01:56:00,02:01:17,Route 66
02:02:10,02:07:15,Una casa con diez pinos
02:07:53,02:12:20,La última lágrima
02:15:52,02:20:55,Can't find my way home
```