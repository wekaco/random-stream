#!/bin/bassh
rename 's/ /_/gi' ./*.wav
for file in ./*.wav
do
  mkdir -p ./mp3
  echo $(basename -s .wav "$file").mp3
  sox "$file" -C 320 "./mp3/$(basename -s .wav "$file").mp3" 

  echo $(basename -s .wav "$file")_12db.mp3
  sox "$file" -C 320 "./mp3/$(basename -s .wav "$file")_12db.mp3" vol 12 db 

  echo $(basename -s .wav "$file")_18db.mp3
  sox "$file" -C 320 "./mp3/$(basename -s .wav "$file")_18db.mp3" vol 18 db 
  echo "done"
done;
