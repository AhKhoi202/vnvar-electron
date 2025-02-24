ffmpeg -re -i "rtsp://admin:VNDC121212@192.168.1.8:554/Streaming/Channels/1" -vf "
/_ Khối bên trái: 'KHẢI TÓC DÀI' (trên nền đen, box lớn) _/
drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':\
text='KHẢI TÓC DÀI':fontcolor=white:fontsize=40:\
x=(w/2-500):y=h-150:box=1:boxcolor=black@1:boxborderw=20,

/_ Khối trung tâm: Ô cam bên trái hiển thị số '7' _/
drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':\
text='7':fontcolor=white:fontsize=40:\
x=(w/2-200):y=h-150:box=1:boxcolor=orange@1:boxborderw=10,

/_ Khối trung tâm: Dải đen giữa chứa 'RACE TO 5' _/
drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':\
text='RACE TO 5':fontcolor=white:fontsize=40:\
x=(w/2-50):y=h-150:box=1:boxcolor=black@1:boxborderw=10,

/_ Khối trung tâm: Ô cam bên phải hiển thị số '0' _/
drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':\
text='0':fontcolor=white:fontsize=40:\
x=(w/2+100):y=h-150:box=1:boxcolor=orange@1:boxborderw=10,

/_ Khối bên phải: 'A J MINHAS' (trên nền đen, box lớn) _/
drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':\
text='A J MINHAS':fontcolor=white:fontsize=40:\
x=(w/2+200):y=h-150:box=1:boxcolor=black@1:boxborderw=20
" -c:v libx264 -preset fast -b:v 3000k -maxrate 3500k -bufsize 6000k -c:a aac -b:a 160k -f flv "rtmp://a.rtmp.youtube.com/live2/fs01-kcwt-rfsy-t576-7xy3"

ffmpeg -re -i "rtsp://admin:VNDC121212@192.168.1.8:554/Streaming/Channels/1" -vf "
drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':textfile='D\:/rtsp/center_text.txt':fontcolor=white:fontsize=40:x=(w/2-50):y=h-150:box=1:boxcolor=black@1:boxborderw=10," -c:v libx264 -preset fast -b:v 3000k -maxrate 3500k -bufsize 6000k -c:a aac -b:a 160k -f flv "rtmp://a.rtmp.youtube.com/live2/fs01-kcwt-rfsy-t576-7xy3"

ffmpeg -re -i "rtsp://admin:VNDC121212@192.168.1.8:554/Streaming/Channels/1" -vf "
drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':textfile='D\:/rtsp/ffmpeg_text.txt':reload=1:fontsize=40:fontcolor=black:x=(w/2-600):y=h-text_h-120:box=1:boxcolor=#30a4dd@1:boxborderw=10" -c:v libx264 -preset fast -b:v 3000k -maxrate 3500k -bufsize 6000k -c:a aac -b:a 160k -f flv "rtmp://a.rtmp.youtube.com/live2/fs01-kcwt-rfsy-t576-7xy3"

```sh
ffmpeg -re -i "rtsp://admin:VNDC121212@192.168.1.8:554/Streaming/Channels/1" -vf "drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':textfile='D\:/rtsp/score_left.txt':reload=1:fontsize=40:x=(w/2-200):y=h-150:box=1:boxcolor=orange@1:boxborderw=20,drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':textfile='D\:/rtsp/center_text.txt':reload=1:fontsize=40:x=(w-text_w)/2:y=h-text_h-120:box=1:boxcolor=white@1:boxborderw=20,drawtext=fontfile='C\:/Windows/Fonts/arialbd.ttf':textfile='D\:/rtsp/score_right.txt':reload=1:fontsize=40:x=(w/2+100):y=h-150:box=1:boxcolor=orange@1:boxborderw=20" -c:v libx264 -preset fast -b:v 3000k -maxrate 3500k -bufsize 6000k -c:a aac -b:a 160k -f flv "rtmp://a.rtmp.youtube.com/live2/fs01-kcwt-rfsy-t576-7xy3"
```

```sh
ffmpeg -re -rtsp_transport tcp -i "rtsp://admin:VNDC121212@192.168.1.8:554/Streaming/Channels/1" -filter_complex "movie='D\\:/CTY/vnvar-electron/src/ui/assets/screenshot.png':loop=1:reload=1[img];[img]scale=-1:100[overlay];[0:v][overlay]overlay=x=(main_w-overlay_w)/2:y=main_h-overlay_h-120" -c:v libx264 -preset fast -b:v 3000k -maxrate 3500k -bufsize 6000k -c:a aac -b:a 160k -f flv "rtmp://a.rtmp.youtube.com/live2/fs01-kcwt-rfsy-t576-7xy3"
```

<!-- đã cập nhật hình ảnh liên tục trên live -->
```sh
ffmpeg -re -rtsp_transport tcp -i "rtsp://admin:VNDC121212@192.168.1.8:554/Streaming/Channels/1" -stream_loop -1 -f image2 -re -i "D:/CTY/vnvar-electron/src/ui/assets/screenshot.png" -filter_complex "[1:v]scale=-1:100[overlay];[0:v][overlay]overlay=x=(main_w-overlay_w)/2:y=main_h-overlay_h-120" -c:v libx264 -preset fast -b:v 3000k -maxrate 3500k -bufsize 6000k -c:a aac -b:a 160k -f flv "rtmp://a.rtmp.youtube.com/live2/fs01-kcwt-rfsy-t576-7xy3"
```


<!-- đã cập nhật hình ảnh liên tục trên live w0.8-->
```sh
ffmpeg -re -rtsp_transport tcp -i "rtsp://admin:VNDC121212@192.168.1.8:554/Streaming/Channels/1" -stream_loop -1 -f image2 -re -i "D:/CTY/vnvar-electron/src/ui/assets/screenshot.png" -filter_complex "[1:v]scale=iw*0.8:-1[overlay];[0:v][overlay]overlay=x=(main_w-overlay_w)/2:y=main_h-overlay_h-120" -c:v libx264 -preset fast -b:v 3000k -maxrate 3500k -bufsize 6000k -c:a aac -b:a 160k -f flv "rtmp://a.rtmp.youtube.com/live2/fs01-kcwt-rfsy-t576-7xy3"
```