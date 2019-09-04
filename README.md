# youtube-sbv

An extremely basic bookmarklet-type app for fixing the timings on a YouTube-generated sbv file.

## How to use

Copy the contents of index.js into the console on the page of the YouTube video you want to set timings for.

Upload a sbv file to the prompt and click submit. When you submit, the video will play from the beginning, and you can set the timings for captions based on the video's playhead.

- Use the 'D' key to set both the end timestamp for the current caption _and_ the start timestamp for the next caption to the current playhead.
- Use the 'A' key to set the end timestamp for the current caption to the playhead. The next caption will appear grayed out; press either key to set its start timestamp to the playhead.
- Use the 'K' key to play or pause the video (YouTube's shortcut).

Only tested in Chrome 76.

## Future stuff

This was made quickly and out of necessity. I may add features if I need it again (I find it quicker and easier than YouTube's tools). 

Interested in:

- browser support
- a better UI
- support for other closed captioning formats
- the ability to work from a text transcript or from scratch
- some hesitation-offset feature to set the captions slightly earlier than you press a key (the offset should depend on the video play speed)
