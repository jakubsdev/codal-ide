#!/usr/bin/env bash

SECONDS=0
jobId=$1

if [[ "$jobId" == "" ]]; then
  echo "NO JOB ID SPECIFIED, EXITING.."
  exit
fi

echo "BEGIN COMPILING JOB ID: ${jobId}"

cd codal && python3 build.py

if [ -f "./MICROBIT.bin" ]; then
  echo "COMPILATION SUCCESS"

  echo "DELETE SOURCE .cpp & .bin FILES"

  cd source && rm ${jobId}.cpp
  cd .. && rm MICROBIT.bin

  echo "RENAME OUTPUT FILE"

  mv MICROBIT.hex ${jobId}.hex

  t=$SECONDS
  echo "COMPILE COMPLETE IN ${t} SECONDS"
  exit 0
else
  echo "COMPILATION FAIL"
  cd source && rm ${jobId}.cpp
  exit 1
fi


