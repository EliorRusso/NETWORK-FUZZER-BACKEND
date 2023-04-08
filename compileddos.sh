cd /home/elior/Fuzzer/Mutate
gcc dos.c -o dosattack
timeout 10 ./dosattack
killall dosattack
echo finished