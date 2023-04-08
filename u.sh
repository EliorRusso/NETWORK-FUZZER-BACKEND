gcc parser.c -lm -o t
./t
gcc parser2.c -lm -o t1
./t1
cd /home/elior/Fuzzer/Mutate/ProtocolParser
mcs AddProtocol.cs
mono AddProtocol.exe
# gcc /home/elior/Fuzzer/Mutate/VmCommunication/client.c
# ./clientcommunication